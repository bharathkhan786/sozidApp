//This is an example code to Add Search Bar Filter on Listview//
import React, { Component } from 'react';
//import react in our code.

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    Alert, ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
//import all the components we are going to use.
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigateTo } from '../Redux/actions';
import { List, ListItem, Radio, Right, Body, Left, Content } from 'native-base';
import styless from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import SozidUrl from '../SozidUrl';

class CustomerActive extends Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, text: '' };

        this.Loaddata = this.Loaddata.bind(this);
        this.UpdateOnPress = this.UpdateOnPress.bind(this);
        this.arrayholder = [];
    }
    componentDidUpdate(prevProps) {
        if (prevProps.NetConnectionVal !== this.props.NetConnectionVal) {
            this.Loaddata();
        }
    }
    Loaddata() {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'V',
                tableName: 'Customer_Location_MasterCustomer_Contact_Matser'
            }
            return fetch(SozidUrl.SozidUrl + '/api/Values/sozidtran', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ basectx })
            })
                .then(response => response.json())
                .then(json => {
                    if (isJson(json) == true) {
                        const res_val = JSON.parse(json);
                        if (res_val.Message == "Loaded Successfully") {
                            if (Platform.OS === 'android') {
                                ToastAndroid.showWithGravity(
                                    res_val.Message,
                                    ToastAndroid.SHORT, //can be SHORT, LONG
                                    ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                );
                            } else {
                                AlertIOS.alert(res_val.Message);
                            }
                            this.setState(
                                {
                                    isLoading: false,
                                    dataSource: res_val.return_data
                                },
                                function () {
                                    this.arrayholder = res_val.return_data;
                                }
                            );
                            // this.setState({ LoadCustomer_Location_Master: res_val.return_data })
                        } else {
                            if (Platform.OS === 'android') {
                                ToastAndroid.showWithGravity(
                                    res_val.Message,
                                    ToastAndroid.SHORT, //can be SHORT, LONG
                                    ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                );
                            } else {
                                AlertIOS.alert(res_val.Message);
                            }
                        }
                    } else {
                        const emp_arr = [];
                    }
                }).catch(error => {
                    throw (error);
                });
        }
    }
    UpdateOnPress(Customer_no, val) {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'U', tableName: 'Customer_Master',
                obj: { Customer_no: Customer_no, Active: val }
            }
            return fetch(SozidUrl.SozidUrl + '/api/Values/sozidtran', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ basectx })
            })
                .then(response => response.json())
                .then(json => {
                    if (isJson(json) == true) {
                        const res_val = JSON.parse(json);
                        if (res_val.Message == "Updated Successfully") {
                            if (Platform.OS === 'android') {
                                ToastAndroid.showWithGravity(
                                    res_val.Message,
                                    ToastAndroid.SHORT, //can be SHORT, LONG
                                    ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                );
                            } else {
                                AlertIOS.alert(res_val.Message);
                            }
                            this.setState(
                                {
                                    isLoading: true,
                                    text: ''
                                },
                            );
                            this.Loaddata();

                        } else {
                            if (Platform.OS === 'android') {
                                ToastAndroid.showWithGravity(
                                    res_val.Message,
                                    ToastAndroid.SHORT, //can be SHORT, LONG
                                    ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                );
                            } else {
                                AlertIOS.alert(res_val.Message);
                            }
                        }
                    } else {
                        const emp_arr = [];
                    }
                }).catch(error => {
                    throw (error);
                });
        }
    }
    componentDidMount() {
        this.Loaddata();
    }
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.Customer_name ? item.Customer_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            text: text,
        });
    }
    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };
    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            //ListView to show with textinput used as search bar
            <View style={styles.viewStyle}>
                <View style={styles.inputView} >
                    <Icon name="search" size={30} />
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Search Custemer Name"
                        placeholderTextColor="white"
                    />
                </View>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem thumbnail>
                            <Body>
                                <Text style={styles.textStyle}>{item.Customer_name}</Text>
                                <Text note style={{ color: 'white', padding: 2 }}>{item.Firstname + ' ' + item.Lastname}</Text>
                                <Text note style={{ color: 'white', padding: 2 }}>{item.Mobile + ',' + item.EmailId}</Text>
                                {/* <Text note style={{ color: 'white', padding: 2 }}>{}</Text> */}
                                <Text note style={{ color: 'white', padding: 2 }}>{item.Address_line + ',' + item.Area + ',' + item.City + ',' + item.State + ',' + item.Pincode}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.textStyle}>Active </Text>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Radio selected={item.Active == 'Y' ? true : false} onPress={() => this.UpdateOnPress(item.Customer_no, 'Y')} /><Text style={{ color: 'white', padding: 2 }}> Yes</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Radio selected={item.Active == 'N' ? true : false} onPress={() => this.UpdateOnPress(item.Customer_no, 'N')} /><Text style={{ color: 'white', padding: 2 }}> No</Text>
                                    </View>
                                </View>
                            </Right>
                        </ListItem>
                    )}
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
CustomerActive.propTypes = {
    navigateTo: PropTypes.func.isRequired,
    loginctx: PropTypes.object,
};
export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal

});
const mapDispatchToProps = dispatch => ({
    navigateTo: routeName => { dispatch(navigateTo(routeName)); },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerActive);
const styles = StyleSheet.create({
    viewStyle: {
        // justifyContent: 'center',
        flex: 1,
        // marginTop: 10,
        padding: 10,
        backgroundColor: '#003f5c',
        // alignItems: 'center',

    },
    textStyle: {
        padding: 10,
        color: '#FFFFFF',
        fontWeight: "bold"
    },
    textInputStyle: {
        height: 40,
        // borderWidth: 1,
        // paddingLeft: 10,
        // borderColor: '#009688',
        // backgroundColor: '#FFFFFF',
        color: "white"
    },
    inputView: {
        width: "90%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 10,
        // justifyContent: "center",
        padding: 20,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    }
});