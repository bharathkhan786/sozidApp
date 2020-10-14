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
import moment from 'moment';
import SozidUrl from '../SozidUrl';

class VendorSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadVendor_sales_Txn: []
        }

        this.VendorSalesEditOnPress = this.VendorSalesEditOnPress.bind(this);
        this.VendorSalesDeleteOnPress = this.VendorSalesDeleteOnPress.bind(this);
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
                tableName: 'Vendor_sales_Txn'
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
                                this.setState({ LoadVendor_sales_Txn: [] });
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
                                this.setState({ LoadVendor_sales_Txn: res_val.return_data });
                            }
                            // this.setState({ LoadVendor_sales_Txn: res_val.return_data })
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
                            this.setState({ LoadVendor_sales_Txn: [] });
                        }
                    } else {
                        const emp_arr = [];
                        this.setState({ LoadVendor_sales_Txn: emp_arr });
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
                    this.setState({ LoadVendor_sales_Txn: [] });
                    // throw (error);
                });
        }
    }
    VendorSalesEditOnPress(Vendor_sales_no) {
        let PreLoadData = this.state.LoadVendor_sales_Txn;
        for (var property in PreLoadData) {
            if (PreLoadData.hasOwnProperty(property)) {
                if (Vendor_sales_no == PreLoadData[property].Vendor_sales_no) {
                    this.props.navigation.navigate('Add VendorSales', {
                        Vendor_sales_no: PreLoadData[property].Vendor_sales_no,
                        Customer_no: PreLoadData[property].Customer_no,
                        Customer_Location_no: PreLoadData[property].Customer_Location_no,
                        Customer_Vendor_no: PreLoadData[property].Customer_Vendor_no,
                        Sales_date: PreLoadData[property].Sales_date,
                        Max_no_public_allowed: PreLoadData[property].Max_no_public_allowed,
                        Vendor_pin: PreLoadData[property].Vendor_pin,
                        opens_at: PreLoadData[property].opens_at,
                        closes_at: PreLoadData[property].closes_at,
                        token_start: PreLoadData[property].token_start,
                        token_ends: PreLoadData[property].token_ends,
                        Type: 'U'
                    });
                }
            }
        }
    }
    VendorSalesDeleteOnPress(Vendor_sales_no) {
        //delete code write here
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'D', tableName: 'Vendor_sales_Txn',
                obj: { Vendor_sales_no: Vendor_sales_no }
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
                        {this.state.LoadVendor_sales_Txn.length > 0 ?
                            this.state.LoadVendor_sales_Txn
                                .map(Vendor_sales_Txn =>
                                    <List>
                                        <ListItem>
                                            <Body>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id : </Text> <Text style={styles.listtextfont}>{Vendor_sales_Txn.Location_id}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Name : </Text> <Text style={styles.listtextfont}>{Vendor_sales_Txn.Vendor_name}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Sales Date : </Text> <Text style={styles.listtextfont}>{moment(Vendor_sales_Txn.Sales_date).format('YYYY-MM-DD')}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Public Allowed : </Text> <Text style={styles.listtextfont}>{Vendor_sales_Txn.Max_no_public_allowed}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Pin : </Text> <Text style={styles.listtextfont}>{Vendor_sales_Txn.Vendor_pin}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Status : </Text> <Text style={styles.listtextfont}>{Vendor_sales_Txn.status}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Opens At : </Text> <Text style={styles.listtextfont}>{moment(Vendor_sales_Txn.opens_at).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Closes At: </Text> <Text style={styles.listtextfont}>{moment(Vendor_sales_Txn.closes_at).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Token Start: </Text> <Text style={styles.listtextfont}>{moment(Vendor_sales_Txn.token_start).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Token Ends: </Text> <Text style={styles.listtextfont}>{moment(Vendor_sales_Txn.token_ends).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                            </Body>
                                            <Right>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.VendorSalesEditOnPress(Vendor_sales_Txn.Vendor_sales_no)}>
                                                    <IconEditDelete name="edit" size={25} color="blue" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.VendorSalesDeleteOnPress(Vendor_sales_Txn.Vendor_sales_no)}>
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
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Name : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Sales Date : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Public Allowed : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Pin : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Status : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Opens At : </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Closes At: </Text> {'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Token Start: </Text>{'\n'}</Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Token Ends: </Text>{'\n'}</Text>
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
                    onPress={() => this.props.navigation.navigate('Add VendorSales', {
                        Vendor_sales_no: null,
                    })}>
                    <Icon name="ios-add" style={{ fontSize: 30 }} />
                </Fab>
            </View>
        );
    }
}
VendorSales.propTypes = {
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
)(VendorSales);
