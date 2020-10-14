import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView
} from 'react-native';
import styles from '../style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigateTo } from '../Redux/actions';
import Icon from "react-native-vector-icons/Ionicons";
import IconEditDelete from "react-native-vector-icons/MaterialIcons";
import { Card, Fab, CardItem, List, ListItem, Body, Right } from 'native-base';
import SozidUrl from '../SozidUrl';

class Vendor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadCustomer_Vendor_Register_Master: []
        }

        this.VendorEditOnPress = this.VendorEditOnPress.bind(this);
        this.VendorDeleteOnPress = this.VendorDeleteOnPress.bind(this);
        this.Loaddata = this.Loaddata.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.NetConnectionVal !== this.props.NetConnectionVal) {
            this.Loaddata();
        }
    }
    Loaddata() {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = { Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid, Type: 'V', tableName: 'Customer_Vendor_Register_Master' }
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

                            if (res_val.return_data == null) {
                                if (Platform.OS === 'android') {
                                    ToastAndroid.showWithGravity(
                                        'No Records Found...',
                                        ToastAndroid.SHORT, //can be SHORT, LONG
                                        ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                    );
                                } else {
                                    AlertIOS.alert('No Records Found...');
                                }
                                this.setState({ LoadCustomer_Vendor_Register_Master: [] });
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
                                this.setState({ LoadCustomer_Vendor_Register_Master: res_val.return_data });
                            }
                            // this.setState({ LoadCustomer_Vendor_Register_Master: res_val.return_data })
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
                            this.setState({ LoadCustomer_Vendor_Register_Master: [] });

                        }
                    } else {
                        const emp_arr = [];
                        this.setState({ LoadCustomer_Vendor_Register_Master: emp_arr });
                    }
                }).catch(error => {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            error,
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert(error);
                    }
                    this.setState({ LoadCustomer_Vendor_Register_Master: [] });
                    // throw (error);
                });
        }
    }
    VendorEditOnPress(Customer_Vendor_no) {
        let PreLoadData = this.state.LoadCustomer_Vendor_Register_Master;
        for (var property in PreLoadData) {
            if (PreLoadData.hasOwnProperty(property)) {
                if (Customer_Vendor_no == PreLoadData[property].Customer_Vendor_no) {
                    this.props.navigation.navigate('Add Vendor', {
                        Customer_Vendor_no: PreLoadData[property].Customer_Vendor_no,
                        Customer_no: PreLoadData[property].Customer_no,
                        Vendor_name: PreLoadData[property].Vendor_name,
                        Selling_items: PreLoadData[property].Selling_items,
                        Active: PreLoadData[property].Active,
                        Type: 'U'
                    });
                }
            }
        }
    }
    VendorDeleteOnPress(Customer_Vendor_no) {
        //delete code write here
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'D', tableName: 'Customer_Vendor_Register_Master', obj: { Customer_Vendor_no: Customer_Vendor_no }
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
                        if (res_val.Message == "Deleted Successfully") {
                            if (Platform.OS === 'android') {
                                ToastAndroid.showWithGravity(
                                    res_val.Message,
                                    ToastAndroid.SHORT, //can be SHORT, LONG
                                    ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                );
                            } else {
                                AlertIOS.alert(res_val.Message);
                            }
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
        const { navigation } = this.props;
        //for refreshing grid by clicking goback
        this.focusListener = navigation.addListener('didFocus', () => {
            this.Loaddata();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.container2}>
                <ScrollView>
                    <Card style={styles.Cardstyle}>
                        {this.state.LoadCustomer_Vendor_Register_Master.length > 0 ?
                            this.state.LoadCustomer_Vendor_Register_Master
                                .map(Customer_Vendor_Register_Master =>
                                    <List key={Customer_Vendor_Register_Master.Customer_Vendor_no}>
                                        <ListItem>
                                            <Body>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Name : </Text> <Text style={styles.listtextfont}>{Customer_Vendor_Register_Master.Vendor_name}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Selling Items : </Text><Text style={styles.listtextfont}> {Customer_Vendor_Register_Master.Selling_items}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Active Flag: </Text> <Text style={styles.listtextfont}>{Customer_Vendor_Register_Master.Active}</Text>{'\n'}</Text>
                                            </Body>
                                            <Right>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.VendorEditOnPress(Customer_Vendor_Register_Master.Customer_Vendor_no)}>
                                                    <IconEditDelete name="edit" size={25} color="blue" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.VendorDeleteOnPress(Customer_Vendor_Register_Master.Customer_Vendor_no)}>
                                                    <IconEditDelete name="delete" size={25} color="red" />
                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                    </List>
                                )
                            :
                            <List>
                                <ListItem>
                                    <Body>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor_name : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Selling_items : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Active : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>No Records Found</Text></Text>
                                    </Body>
                                </ListItem>
                            </List>

                        }
                    </Card>
                </ScrollView>
                <Fab
                    active
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('Add Vendor', {
                        Customer_Vendor_no: null,
                    })}>
                    <Icon name="ios-add" style={{ fontSize: 30 }} />
                </Fab>
            </View>
        );
    }
}
Vendor.propTypes = {
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
)(Vendor);
