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

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadCustomer_Location_Master: []
        }

        this.LocationEditOnPress = this.LocationEditOnPress.bind(this);
        this.LocationDeleteOnPress = this.LocationDeleteOnPress.bind(this);
        this.Loaddata = this.Loaddata.bind(this);
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
                tableName: 'Customer_Location_Master'
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
                                this.setState({ LoadCustomer_Location_Master: [] });
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
                                this.setState({ LoadCustomer_Location_Master: res_val.return_data });
                            }
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
                            this.setState({ LoadCustomer_Location_Master: [] });
                        }
                    } else {
                        const emp_arr = [];
                        this.setState({ LoadCustomer_Location_Master: emp_arr });
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
                    this.setState({ LoadCustomer_Location_Master: [] });
                    // throw (error);
                });
        }
    }
    LocationEditOnPress(Customer_Location_no) {
        let PreLoadData = this.state.LoadCustomer_Location_Master;
        for (var property in PreLoadData) {
            if (PreLoadData.hasOwnProperty(property)) {
                if (Customer_Location_no == PreLoadData[property].Customer_Location_no) {
                    this.props.navigation.navigate('Add Location', {
                        Customer_Location_no: PreLoadData[property].Customer_Location_no,
                        Customer_no: PreLoadData[property].Customer_no,
                        Location_id: PreLoadData[property].Location_id,
                        Floor: PreLoadData[property].Floor,
                        Location_spacing: PreLoadData[property].Location_spacing,
                        Queue_batch: PreLoadData[property].Queue_batch,
                        Separation_within_batch: PreLoadData[property].Separation_within_batch,
                        Separation_across_batch: PreLoadData[property].Separation_across_batch,
                        Queue_length: PreLoadData[property].Queue_length,
                        Active: PreLoadData[property].Active,
                        Type: 'U'
                    });
                }
            }
        }
    }
    LocationDeleteOnPress(Customer_Location_no) {
        //delete code write here
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'D', tableName: 'Customer_Location_Master',
                obj: { Customer_Location_no: Customer_Location_no }
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
                        {this.state.LoadCustomer_Location_Master.length > 0 ?
                            this.state.LoadCustomer_Location_Master
                                .map(Customer_Location_Master =>
                                    <List>
                                        <ListItem>
                                            <Body>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Location_id}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Floor : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Floor}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Spacing : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Location_spacing}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue Batch : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Queue_batch}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Separation Within Batch : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Separation_within_batch} (Meters)</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Separation Across Batch : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Separation_across_batch} (Meters)</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue Length : </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Queue_length}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Active Flag: </Text> <Text style={styles.listtextfont}>{Customer_Location_Master.Active}</Text>{'\n'}</Text>
                                            </Body>
                                            <Right>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.LocationEditOnPress(Customer_Location_Master.Customer_Location_no)}>
                                                    <IconEditDelete name="edit" size={25} color="blue" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.LocationDeleteOnPress(Customer_Location_Master.Customer_Location_no)}>
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
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Floor : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Spacing : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue Batch : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Separation within Batch : (Meters)</Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Separation Across Batch : (Meters)</Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue Length : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Active Flag : </Text></Text>
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
                    onPress={() => this.props.navigation.navigate('Add Location', {
                        Customer_Location_no: null,
                    })}>
                    <Icon name="ios-add" style={{ fontSize: 30 }} />
                </Fab>
            </View>
        );
    }
}
Location.propTypes = {
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
)(Location);
