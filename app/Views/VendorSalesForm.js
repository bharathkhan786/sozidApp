import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView,
} from 'react-native';
import styles from '../style';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Radio } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import SozidUrl from '../SozidUrl';

class VendorSalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Sales_date: null,
            Max_no_public_allowed: null,
            Vendor_pin: null,
            status: 0,
            opens_at: null,
            closes_at: null,
            token_start: null,
            token_ends: null,
            Customer_Vendor_no: null,
            Customer_Location_no: null,
            Type: 'A',
            Vendor_sales_no: null,
            Customer_no: null,
            BtnName: 'Save',
            edit_Customer_Vendor_no: null,
            edit_Customer_Location_no: null,
            edit_token_ends: null,
            edit_token_start: null,
            edit_closes_at: null,
            edit_opens_at: null,
            edit_Vendor_pin: null,
            edit_Max_no_public_allowed: null,
            edit_Sales_date: null,
            LoadCustomer_Location_Master: [],
            LoadCustomer_Vendor_Register_Master: []

        }
        this.VendorSalesSaveOnPress = this.VendorSalesSaveOnPress.bind(this);
        this.LoaddataLocation = this.LoaddataLocation.bind(this);
        this.LoaddataVendor = this.LoaddataVendor.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.NetConnectionVal !== this.props.NetConnectionVal) {
            this.LoaddataLocation();
            this.LoaddataVendor();
        }
    }
    LoaddataLocation() {
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
                                const Customer_Location_Master = res_val.return_data.map(Customer_Location_Maste => {
                                    return {
                                        label: Customer_Location_Maste.Location_id,
                                        value: Customer_Location_Maste.Customer_Location_no
                                    };
                                });
                                this.setState({ LoadCustomer_Location_Master: Customer_Location_Master })
                            }

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
    LoaddataVendor() {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'V',
                tableName: 'Customer_Vendor_Register_Master'
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
                                const Customer_Vendor_Register_Master = res_val.return_data.map(Customer_Vendor_Register_Maste => {
                                    return {
                                        label: Customer_Vendor_Register_Maste.Vendor_name,
                                        value: Customer_Vendor_Register_Maste.Customer_Vendor_no
                                    };
                                });
                                this.setState({ LoadCustomer_Vendor_Register_Master: Customer_Vendor_Register_Master })
                            }
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
    componentDidMount() {
        if (this.props.navigation.state.params.Vendor_sales_no != null && this.props.navigation.state.params.Vendor_sales_no != "" && this.props.navigation.state.params.Vendor_sales_no != undefined) {
            this.setState({
                Vendor_sales_no: this.props.navigation.state.params.Vendor_sales_no,
                Sales_date: this.props.navigation.state.params.Sales_date,
                Max_no_public_allowed: this.props.navigation.state.params.Max_no_public_allowed,
                Vendor_pin: this.props.navigation.state.params.Vendor_pin,
                opens_at: this.props.navigation.state.params.opens_at,
                closes_at: this.props.navigation.state.params.closes_at,
                token_start: this.props.navigation.state.params.token_start,
                token_ends: this.props.navigation.state.params.token_ends,
                Customer_Vendor_no: this.props.navigation.state.params.Customer_Vendor_no,
                Customer_Location_no: this.props.navigation.state.params.Customer_Location_no,
                Type: this.props.navigation.state.params.Type,
                Customer_no: this.props.navigation.state.params.Customer_no,
                BtnName: 'Update',
                edit_Customer_Vendor_no: this.props.navigation.state.params.Customer_Vendor_no,
                edit_Customer_Location_no: this.props.navigation.state.params.Customer_Location_no,
                edit_token_ends: this.props.navigation.state.params.token_ends,
                edit_token_start: this.props.navigation.state.params.token_start,
                edit_closes_at: this.props.navigation.state.params.closes_at,
                edit_opens_at: this.props.navigation.state.params.opens_at,
                edit_Vendor_pin: this.props.navigation.state.params.Vendor_pin,
                edit_Max_no_public_allowed: this.props.navigation.state.params.Max_no_public_allowed,
                edit_Sales_date: this.props.navigation.state.params.Sales_date,
            });
        }
        this.LoaddataLocation();
        this.LoaddataVendor();
    }
    VendorSalesSaveOnPress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Type == 'A') {
                if (this.state.Customer_Location_no != null && this.state.Customer_Vendor_no != null
                    && this.state.Max_no_public_allowed != null
                    && this.state.Sales_date != null && this.state.Vendor_pin != null
                    && this.state.closes_at != null && this.state.opens_at != null
                    && this.state.token_ends != null && this.state.token_start != null
                ) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type,
                        tableName: 'Vendor_sales_Txn',
                        obj: {
                            Customer_Location_no: this.state.Customer_Location_no,
                            Customer_Vendor_no: this.state.Customer_Vendor_no,
                            Max_no_public_allowed: this.state.Max_no_public_allowed,
                            Sales_date: this.state.Sales_date,
                            Vendor_pin: this.state.Vendor_pin,
                            closes_at: this.state.closes_at,
                            opens_at: this.state.opens_at,
                            token_ends: this.state.token_ends,
                            token_start: this.state.token_start,
                            status: this.state.status
                        }
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
                                if (res_val.Message == "Inserted Successfully") {
                                    if (Platform.OS === 'android') {
                                        ToastAndroid.showWithGravity(
                                            res_val.Message,
                                            ToastAndroid.SHORT, //can be SHORT, LONG
                                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                        );
                                    } else {
                                        AlertIOS.alert(res_val.Message);
                                    }
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
                else {
                    if (this.state.Customer_Location_no == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Select Location Id',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Select Location Id');
                        }
                    } else if (this.state.Customer_Vendor_no == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Select Vendor Name',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Select Vendor Name');
                        }
                    } else if (this.state.Max_no_public_allowed == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Public Allowed',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Public Allowed');
                        }
                    } else if (this.state.Sales_date == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Sales Date',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Sales Date');
                        }
                    } else if (this.state.Vendor_pin == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Vendor Pin',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Vendor Pin');
                        }
                    } else if (this.state.closes_at == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Closes At',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Closes At');
                        }
                    } else if (this.state.opens_at == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Opens At',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Opens At');
                        }
                    } else if (this.state.token_ends == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Token Ends',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Token Ends');
                        }
                    } else if (this.state.token_start == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Token Start',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Token Start');
                        }
                    }
                }
            } else if (this.state.Type == 'U') {
                if (this.state.Customer_Location_no != this.state.edit_Customer_Location_no
                    || this.state.Customer_Vendor_no != this.state.edit_Customer_Vendor_no
                    || this.state.Max_no_public_allowed != this.state.edit_Max_no_public_allowed
                    || this.state.Sales_date != this.state.edit_Sales_date
                    || this.state.Vendor_pin != this.state.edit_Vendor_pin
                    || this.state.opens_at != this.state.edit_opens_at
                    || this.state.closes_at != this.state.edit_closes_at
                    || this.state.token_start != this.state.edit_token_start
                    || this.state.token_ends != this.state.edit_token_ends) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type, tableName: 'Vendor_sales_Txn',
                        obj: {
                            Vendor_sales_no: this.state.Vendor_sales_no,
                            Customer_Location_no: this.state.Customer_Location_no == this.state.edit_Customer_Location_no ? null : this.state.Customer_Location_no,
                            Customer_Vendor_no: this.state.Customer_Vendor_no == this.state.edit_Customer_Vendor_no ? null : this.state.Customer_Vendor_no,
                            Max_no_public_allowed: this.state.Max_no_public_allowed == this.state.edit_Max_no_public_allowed ? null : this.state.Max_no_public_allowed,
                            Sales_date: this.state.Sales_date == this.state.edit_Sales_date ? null : this.state.Sales_date,
                            Vendor_pin: this.state.Vendor_pin == this.state.edit_Vendor_pin ? null : this.state.Vendor_pin,
                            opens_at: this.state.opens_at == this.state.edit_opens_at ? null : this.state.opens_at,
                            closes_at: this.state.closes_at == this.state.edit_closes_at ? null : this.state.closes_at,
                            token_start: this.state.token_start == this.state.edit_token_start ? null : this.state.token_start,
                            token_ends: this.state.token_ends == this.state.edit_token_ends ? null : this.state.token_ends
                        }
                    };
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
                else {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Update Atleast one Value',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Update Atleast one Value');
                    }
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.containersignup}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.inputView}>
                        <RNPickerSelect
                            onValueChange={(value) => this.setState({ Customer_Location_no: value == '' ? null : value })}
                            placeholder={{ label: 'Select Location ID', value: '' }}
                            value={this.state.Customer_Location_no}
                            items={this.state.LoadCustomer_Location_Master}
                            style={styles.pickerSelectStyles}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <RNPickerSelect
                            onValueChange={(value) => this.setState({ Customer_Vendor_no: value == '' ? null : value })}
                            placeholder={{ label: 'Select Vendor Name', value: '' }}
                            value={this.state.Customer_Vendor_no}
                            items={this.state.LoadCustomer_Vendor_Register_Master}
                            style={styles.pickerSelectStyles}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Max No Public Allowed."
                            placeholderTextColor='white'
                            keyboardType="numeric"
                            value={this.state.Max_no_public_allowed == null ? this.state.Max_no_public_allowed : (this.state.Max_no_public_allowed).toString()}
                            onChangeText={text => this.setState({ Max_no_public_allowed: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.Sales_date}
                            mode="date"
                            placeholder="Select Sales Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -10,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    // backgroundColor: "#465881",
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    borderColor: "#465881"
                                },
                                placeholderText: {
                                    color: '#003f5c'
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ Sales_date: date }) }}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Vendor Pin"
                            placeholderTextColor='white'
                            value={this.state.Vendor_pin}
                            onChangeText={text => this.setState({ Vendor_pin: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.opens_at}
                            mode="datetime"
                            placeholder="Select Opens At"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -10,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    // backgroundColor: "#465881",
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    borderColor: "#465881"
                                },
                                placeholderText: {
                                    color: '#003f5c'
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ opens_at: date }) }}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.closes_at}
                            mode="datetime"
                            placeholder="Select Closes At"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -10,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    // backgroundColor: "#465881",
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    borderColor: "#465881"
                                },
                                placeholderText: {
                                    color: '#003f5c'
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ closes_at: date }) }}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.token_start}
                            mode="datetime"
                            placeholder="Select Token Start"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -10,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    // backgroundColor: "#465881",
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    borderColor: "#465881"
                                },
                                placeholderText: {
                                    color: '#003f5c'
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ token_start: date }) }}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.token_ends}
                            mode="datetime"
                            placeholder="Select Token Ends"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -10,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    // backgroundColor: "#465881",
                                    borderRadius: 25,
                                    justifyContent: "center",
                                    borderColor: "#465881"
                                },
                                placeholderText: {
                                    color: '#003f5c'
                                },
                                dateText: {
                                    color: 'white'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ token_ends: date }) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.VendorSalesSaveOnPress()}>
                            <Text style={styles.loginText}>{this.state.BtnName}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
VendorSalesForm.propTypes = {
    loginctx: PropTypes.object

};
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal

});
export default connect(
    mapStateToProps
)(VendorSalesForm);
