import React from 'react';
import {
    View,
    Button, Text,
    TextInput,
    StyleSheet, TouchableOpacity, ScrollView, ToastAndroid, Platform,
    AlertIOS, Modal, TouchableHighlight
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from '../style';
import SozidUrl from '../SozidUrl';
import { CheckBox } from 'native-base';
import NetConnection from './NetConnection';
import { connect } from "react-redux";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null, password: null, email: null, phone_number: null, FirstName: null, LastName: null,
            Public_Customer_Vendor: null, email_validation: null, phoneno_validation: null,
            Customer_type: 0, Country: null, Address: null, Area: null, City: null, State: null,
            Pincode: null,
            checked_value: false, modalVisible: false,
            terms_policy: null,
            LoadSubscriptionDefinitionTxns: [],
            Subscription_definition_SlNo: null,
            Subscription_definition_Type_Value: null,
            Subscription_definition_price: null,
            Subscription_price: null
        }
        this.demoval()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.NetConnectionVal !== this.props.NetConnectionVal) {
            this.demoval();
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    demoval = () => {
        // console.log('this.props.NetConnectionVal', this.props.NetConnectionVal);
        // alert(this.props.NetConnectionVal);
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {}
            return fetch(SozidUrl.SozidUrl + '/api/Values/SubscriptionDefinition', {
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
                            const LoadSubscriptionDefinitionTxn = res_val.return_data.map(LoadSubscriptionDefinitionTx => {
                                return {
                                    label: LoadSubscriptionDefinitionTx.Subscription_definition_Type_Value,
                                    value: LoadSubscriptionDefinitionTx.Subscription_definition_SlNo + ',' + LoadSubscriptionDefinitionTx.Subscription_definition_Type_Value + ',' + LoadSubscriptionDefinitionTx.Subscription_definition_price
                                };
                            });
                            this.setState({ LoadSubscriptionDefinitionTxns: LoadSubscriptionDefinitionTxn })
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
    SubscriptiononChangeText = (key, val) => {
        if (val == null) {
            this.setState({ Subscription_definition_SlNo: val })
            this.setState({ Subscription_definition_Type_Value: val })
            this.setState({ Subscription_definition_price: val })
        } else {
            let value = val.split(',');
            this.setState({ Subscription_definition_SlNo: value[0] });
            this.setState({ Subscription_definition_Type_Value: value[1] });
            this.setState({ Subscription_definition_price: value[2] });
        }
    }
    openModel = (name, modalVisible) => {
        if (name == 'terms') {
            this.setState({ terms_policy: name });
        }
        else if (name == 'policy') {
            this.setState({ terms_policy: name });
        }
        this.setState({ modalVisible: modalVisible })
    }
    toggleModal = (modalVisible) => {
        this.setState({ modalVisible: modalVisible })
    }
    onEndEditing = (key, val) => {
        if (key == 'email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                        'Email is Not Correct',
                        ToastAndroid.SHORT, //can be SHORT, LONG
                        ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                    );
                } else {
                    AlertIOS.alert('Email is Not Correct');
                }
                this.setState({ email_validation: null })
                // return false;
            }
            else {
                this.setState({ email_validation: val })
                // if (Platform.OS === 'android') {
                //     ToastAndroid.showWithGravity(
                //         'Email is Correct',
                //         ToastAndroid.SHORT, //can be SHORT, LONG
                //         ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                //     );
                // } else {
                //     AlertIOS.alert('Email is Correct');
                // }
            }
        } else if (key == 'phone_number') {
            const reg = /^[0]?[6789]\d{9}$/;
            if (reg.test(val) === false) {
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                        'Phone Number is Not Correct',
                        ToastAndroid.SHORT, //can be SHORT, LONG
                        ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                    );
                } else {
                    AlertIOS.alert('Phone Number is Not Correct');
                }
                this.setState({
                    phoneno_validation: null,
                });
                // return false;
            } else {
                this.setState({
                    phoneno_validation: val,
                });
                return true;
            }
        }

    }
    signUp = async () => {
        const { username, password, email, phone_number, FirstName, LastName, Public_Customer_Vendor, email_validation, phoneno_validation,
            Customer_type, Country, Address, Area, City, State,
            Pincode,
            Subscription_definition_SlNo,
            Subscription_definition_Type_Value,
            Subscription_definition_price,
            Subscription_price
        } = this.state
        if (this.props.NetConnectionVal == "Online") {
            if (Public_Customer_Vendor == "Customer") {
                if (Customer_type == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Select Customer Type',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Select Customer Type');
                    }
                    return;
                }
                else if (Country == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Country',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Country');
                    }
                    return;
                }
                else if (Address == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Address',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Address');
                    }
                    return;
                }
                else if (Area == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Area',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Area');
                    }
                    return;
                }
                else if (City == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter City',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter City');
                    }
                    return;
                }
                else if (State == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter State',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter State');
                    }
                    return;
                }
                else if (Pincode == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Pincode',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Pincode');
                    }
                    return;
                }
                else if (Subscription_definition_SlNo == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Select Subscription Type',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Select Subscription Type');
                    }
                    return;
                }
                else if (Subscription_price == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Price',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Price');
                    }
                    return;
                }
                else if (Subscription_definition_price != Subscription_price) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Valid  Amount',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Valid  Amount');
                    }
                    return;
                }
            }
            if (this.state.checked_value == false) {
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                        'Please select terms conditions and privacy policy',
                        ToastAndroid.LONG, //can be SHORT, LONG
                        ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                    );
                } else {
                    AlertIOS.alert('Please select terms conditions and privacy policy');
                }
                return;
            }
            if (username != null && password != null && email != null && phone_number != null && FirstName != null && LastName != null && Public_Customer_Vendor != null) {
                if (email_validation == email && phoneno_validation == phone_number) {
                    let basectx = {
                        Username: username, Password: password,
                        FirstName: FirstName, LastName: LastName, Mobile: phone_number, EmailId: email,
                        Public_Customer_Vendor: Public_Customer_Vendor,
                        Customer_type: Customer_type, Country: Country, Address: Address,
                        Area: Area, City: City, State: State, Pincode: Pincode,
                        Subscription_definition_SlNo: Subscription_definition_SlNo,
                        Subscription_definition_Type_Value: Subscription_definition_Type_Value,
                        Subscription_definition_price: Subscription_definition_price,
                        Subscription_price: Subscription_price
                    }
                    return fetch(SozidUrl.SozidUrl + '/api/Values/Register', {
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
                                if (res_val.Message == "Registration Completed Successfully") {
                                    // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
                                    if (Platform.OS === 'android') {
                                        ToastAndroid.showWithGravity(
                                            res_val.Message,
                                            ToastAndroid.SHORT, //can be SHORT, LONG
                                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                        );
                                    } else {
                                        AlertIOS.alert(res_val.Message);
                                    }
                                    this.props.navigation.navigate('Login');
                                } else {
                                    // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
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
                    if (email_validation != email) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Currect EmailId',
                                ToastAndroid.SHORT, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Currect EmailId');
                        }
                    }
                    else if (phoneno_validation != phone_number) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Currect Phone Number',
                                ToastAndroid.SHORT, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Currect Phone Number');
                        }
                    }
                }
            }
            else {
                if (Public_Customer_Vendor == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Select Public/Customer Type',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Select Public/Customer Type');
                    }
                }
                else if (username == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter UserName',
                            ToastAndroid.LONG, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter UserName');
                    }
                } else if (password == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr Password',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr Password');
                    }
                }
                else if (FirstName == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr FirstName',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr FirstName');
                    }
                }
                else if (LastName == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr LastName',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr LastName');
                    }
                }
                else if (email == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr Email',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr Email');
                    }
                }
                else if (phone_number == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr Phone Number',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr Phone Number');
                    }
                }
            }
        }
    }
    componentDidMount() {
        // alert(this.props.navigation.state.params.NetConnectionVal);
        // console.log('this.props.NetConnectionVal', this.props.NetConnectionVal);
        // if (this.props.NetConnectionVal == "Online") {
        //     let basectx = {}
        //     return fetch(SozidUrl.SozidUrl + '/api/Values/SubscriptionDefinition', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ basectx })
        //     })
        //         .then(response => response.json())
        //         .then(json => {
        //             if (isJson(json) == true) {
        //                 const res_val = JSON.parse(json);
        //                 if (res_val.Message == "Loaded Successfully") {
        //                     if (Platform.OS === 'android') {
        //                         ToastAndroid.showWithGravity(
        //                             res_val.Message,
        //                             ToastAndroid.SHORT, //can be SHORT, LONG
        //                             ToastAndroid.TOP //can be TOP, BOTTON, CENTER
        //                         );
        //                     } else {
        //                         AlertIOS.alert(res_val.Message);
        //                     }
        //                     const LoadSubscriptionDefinitionTxn = res_val.return_data.map(LoadSubscriptionDefinitionTx => {
        //                         return {
        //                             label: LoadSubscriptionDefinitionTx.Subscription_definition_Type_Value,
        //                             value: LoadSubscriptionDefinitionTx.Subscription_definition_SlNo + ',' + LoadSubscriptionDefinitionTx.Subscription_definition_Type_Value + ',' + LoadSubscriptionDefinitionTx.Subscription_definition_price
        //                         };
        //                     });
        //                     this.setState({ LoadSubscriptionDefinitionTxns: LoadSubscriptionDefinitionTxn })
        //                 } else {
        //                     if (Platform.OS === 'android') {
        //                         ToastAndroid.showWithGravity(
        //                             res_val.Message,
        //                             ToastAndroid.SHORT, //can be SHORT, LONG
        //                             ToastAndroid.TOP //can be TOP, BOTTON, CENTER
        //                         );
        //                     } else {
        //                         AlertIOS.alert(res_val.Message);
        //                     }
        //                 }
        //             } else {
        //                 const emp_arr = [];
        //             }
        //         }).catch(error => {
        //             throw (error);
        //         });
        // }
    }
    render() {
        return (
            <View style={styles.containersignup}>
                <NetConnection />
                <Text style={styles.signuplogo}>{this.state.Public_Customer_Vendor}  Registration</Text>
                <ScrollView style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.inputView} >
                        <RNPickerSelect
                            onValueChange={(value) => this.onChangeText('Public_Customer_Vendor', value)}
                            placeholder={{ label: 'Select Public/Customer', value: null }}
                            items={[
                                { label: 'Public', value: 'Public' },
                                { label: 'Customer', value: 'Customer' }
                            ]}
                            style={styles.pickerSelectStyles}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder='Username'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('username', val)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.inputViewSplit} >
                            <TextInput
                                style={styles.inputText}
                                placeholder='FirstName'
                                autoCapitalize="none"
                                placeholderTextColor='white'
                                onChangeText={val => this.onChangeText('FirstName', val)}
                            />
                        </View>
                        <View style={styles.inputViewSplit} >
                            <TextInput
                                style={styles.inputText}
                                placeholder='LastName'
                                autoCapitalize="none"
                                placeholderTextColor='white'
                                onChangeText={val => this.onChangeText('LastName', val)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('password', val)}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            onChangeText={val => this.onChangeText('email', val)}
                            onEndEditing={(event) => this.onEndEditing('email', event.nativeEvent.text)}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder='Phone Number'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            keyboardType='phone-pad'
                            onChangeText={val => this.onChangeText('phone_number', val)}
                            onEndEditing={(event) => this.onEndEditing('phone_number', event.nativeEvent.text)}
                        />
                    </View>
                    {this.state.Public_Customer_Vendor == 'Customer' ?
                        <View style={styles.inputView2}>
                            <View style={styles.inputViewby2} >
                                <RNPickerSelect
                                    onValueChange={(value) => this.onChangeText('Customer_type', value)}
                                    placeholder={{ label: 'Select Customer Type', value: null }}
                                    items={[
                                        { label: 'School', value: '1' },
                                        { label: 'Office', value: '2' },
                                        { label: 'Apartment', value: '3' },
                                        { label: 'Public Place', value: '4' },
                                        { label: 'Others', value: '5' }
                                    ]}
                                    style={styles.pickerSelectStyles}
                                />
                            </View>
                            <View style={styles.inputViewby2} >
                                <RNPickerSelect
                                    onValueChange={(value) => this.SubscriptiononChangeText('Subscription_definition_SlNo', value)}
                                    placeholder={{ label: 'Select Subscription Type', value: null }}
                                    items={this.state.LoadSubscriptionDefinitionTxns}
                                    style={styles.pickerSelectStyles}
                                />
                            </View>
                            {this.state.Subscription_definition_price != null ?
                                <View style={styles.inputViewby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='Amount'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        editable={false}
                                        value={this.state.Subscription_definition_price}
                                    // onChangeText={val => this.onChangeText('Country', val)}
                                    />
                                </View>
                                : null}
                            {this.state.Subscription_definition_price != null ?
                                <View style={styles.inputViewby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='Price'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        keyboardType='numeric'
                                        onChangeText={val => this.onChangeText('Subscription_price', val)}
                                    />
                                </View>
                                : null}
                            <View style={styles.inputViewby2} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder='Country'
                                    autoCapitalize="none"
                                    placeholderTextColor='white'
                                    onChangeText={val => this.onChangeText('Country', val)}
                                />
                            </View>
                            <View style={styles.inputViewby2} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder='Address'
                                    autoCapitalize="none"
                                    placeholderTextColor='white'
                                    onChangeText={val => this.onChangeText('Address', val)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.inputViewSplitby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='Area'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        onChangeText={val => this.onChangeText('Area', val)}
                                    />
                                </View>
                                <View style={styles.inputViewSplitby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='City'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        onChangeText={val => this.onChangeText('City', val)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.inputViewSplitby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='State'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        onChangeText={val => this.onChangeText('State', val)}
                                    />
                                </View>
                                <View style={styles.inputViewSplitby2} >
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='Pincode'
                                        autoCapitalize="none"
                                        placeholderTextColor='white'
                                        keyboardType='number-pad'
                                        onChangeText={val => this.onChangeText('Pincode', val)}
                                    />
                                </View>
                            </View>
                        </View>
                        : null
                    }

                    {/* i agree with terms conditions and privacy policy */}
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox checked={this.state.checked_value} onPress={() => this.setState({ checked_value: !this.state.checked_value })} />
                        <Text style={{ color: 'white', paddingLeft: 15 }}>I agree with <Text onPress={() => this.openModel('terms', !this.state.modalVisible)} style={{ color: 'yellow', textDecorationLine: 'underline', textDecorationColor: 'blue' }}>terms conditions</Text> and <Text onPress={() => this.openModel('policy', !this.state.modalVisible)} style={{ color: 'yellow', textDecorationLine: 'underline', textDecorationColor: 'blue' }}>privacy policy</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.signBtn} onPress={() => this.signUp()}>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="arrow-left" style={styles.loginText} size={25} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal
                    animationType={"fade"}//{"none"}//{"slide"}//{"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <Text>{this.state.terms_policy == 'terms' ? <Text>Terms</Text> : <Text>Policy</Text>}</Text>
                    <View paddingVertical={2} />
                    <ScrollView
                        style={{
                            flex: 1,
                            paddingHorizontal: 15,
                        }}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                        <View paddingVertical={3} />
                        {this.state.terms_policy == 'terms' ? <Text>terms!</Text> : null}
                        {this.state.terms_policy == 'policy' ? <Text>policy!</Text> : null}
                        <View paddingVertical={3} />
                    </ScrollView>
                    <Button title="Close Modal" onPress={() => this.toggleModal(!this.state.modalVisible)} />
                    <View paddingVertical={3} />
                </Modal>
            </View>
        )
    }
}
// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'white',
//         paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'purple',
//         borderRadius: 8,
//         color: 'white',
//         paddingRight: 30, // to ensure the text is never behind the icon
//         fontWeight: 'bold'
//     },
// });
export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// export default SignUp;
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal
});
export default connect(
    mapStateToProps
    // mapDispatchToProps
)(SignUp);

