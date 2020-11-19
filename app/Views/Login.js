import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, Image, AppState, Dimensions
} from 'react-native';
import styles from '../style';
import { LoadLoginctxSuccess } from "../../app/Redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Radio } from 'native-base';
import DatePicker from 'react-native-datepicker';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import SozidUrl from '../SozidUrl';
// import * as NetInfo from '@react-native-community/netinfo';
import NetConnection from './NetConnection';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: null,
            password: null,
            LoginType: 'PC',
            Sales_date: null,
            connection_Status: null
        }
        this.loginonpress = this.loginonpress.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        // NetInfo.isConnected.fetch().then((isConnected) => {
        //     if (isConnected == true) {
        //         this.setState({ connection_Status: "Online" })
        //     }
        //     else {
        //         this.setState({ connection_Status: "Offline" })
        //     }
        // });
    }

    componentWillUnmount() {
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    // handleConnectivityChange = (isConnected) => {
    //     if (isConnected == true) {
    //         this.setState({ connection_Status: "Online" })
    //     }
    //     else {
    //         this.setState({ connection_Status: "Offline" })
    //     }
    // }
    handleAppStateChange(appState) {
        console.log(appState);
      
        if (appState === 'active') {
            // PushNotification.localNotification({
            //     autoCancel: true,
            //     bigText:
            //       'This is local notification demo in React Native app. Only shown, when expanded.',
            //     subText: 'Local Notification Demo',
            //     title: 'Local Notification Title',
            //     message: 'Expand me to see more',
            //     vibrate: true,
            //     vibration: 300,
            //     playSound: true,
            //     soundName: 'default',
            //     actions: '["Yes", "No"]'
            //   });
            // let basectx = { appState: appState }
            // return fetch(SozidUrl.SozidUrl + '/api/Values/changePassword', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ basectx })
            // })
            //     .then(response => response.json())
            //     .then(json => {
            //         if (isJson(json) == true) {
            //             const res_val = JSON.parse(json);
            //             if (res_val.Message == "active") {
            //                 if (Platform.OS === 'android') {
            //                     ToastAndroid.showWithGravity(
            //                         res_val.Message,
            //                         ToastAndroid.SHORT, //can be SHORT, LONG
            //                         ToastAndroid.TOP //can be TOP, BOTTON, CENTER
            //                     );
            //                 } else {
            //                     AlertIOS.alert(res_val.Message);
            //                 }

            //                 // this.props.navigation.navigate('Root');
            //             } else {
            //                 // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
            //                 if (Platform.OS === 'android') {
            //                     ToastAndroid.showWithGravity(
            //                         res_val.Message,
            //                         ToastAndroid.SHORT, //can be SHORT, LONG
            //                         ToastAndroid.TOP //can be TOP, BOTTON, CENTER
            //                     );
            //                 } else {
            //                     AlertIOS.alert(res_val.Message);
            //                 }
            //             }
            //         } else {
            //             const emp_arr = [];
            //         }
            //     }).catch(error => {
            //         throw (error);
            //     });
        }
        else if (appState === 'background') {
            console.log('background');
            // setTimeout(() => {
            // let basectx = { appState: appState }
            // return fetch(SozidUrl.SozidUrl + '/api/Values/changePassword', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ basectx })
            // })
            //     .then(response => response.json())
            //     .then(json => {
            //         if (isJson(json) == true) {
            //             const res_val = JSON.parse(json);
            //             if (res_val.Message == "background") {
            //                 if (Platform.OS === 'android') {
            //                     ToastAndroid.showWithGravity(
            //                         res_val.Message,
            //                         ToastAndroid.SHORT, //can be SHORT, LONG
            //                         ToastAndroid.TOP //can be TOP, BOTTON, CENTER
            //                     );
            //                 } else {
            //                     AlertIOS.alert(res_val.Message);
            //                 }
            //                 this.handleAppStateChange(appState);
            //             } else {
            //                 if (Platform.OS === 'android') {
            //                     ToastAndroid.showWithGravity(
            //                         res_val.Message,
            //                         ToastAndroid.SHORT, //can be SHORT, LONG
            //                         ToastAndroid.TOP //can be TOP, BOTTON, CENTER
            //                     );
            //                 } else {
            //                     AlertIOS.alert(res_val.Message);
            //                 }
            //             }
            //         } else {
            //             const emp_arr = [];
            //         }
            //     }).catch(error => {
            //         throw (error);
            //     });
            // }, 3000)

            let date = new Date(Date.now() + (1 * 1000));

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }
            PushNotification.localNotificationSchedule({
                message: "My Message",
                date,
                allowWhileIdle: true,
            });
        }
        else if (appState === 'inactive') {
            console.log(appState);
            let basectx = { appState: appState }
            return fetch(SozidUrl.SozidUrl + '/api/Values/changePassword', {
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
                        if (res_val.Message == "inactive") {
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
    }

    loginonpress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.LoginType == 'PC') {
                if (this.state.Username != null && this.state.password != null) {
                    let basectx = { Username: this.state.Username, password: this.state.password, Sales_date: this.state.Sales_date, LoginType: this.state.LoginType }
                    return fetch(SozidUrl.SozidUrl + '/api/Values/Login', {
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
                                if (res_val.Message == "Login Successfully") {
                                    // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
                                    this.props.dispatch(LoadLoginctxSuccess(res_val.return_data));
                                    if (Platform.OS === 'android') {
                                        ToastAndroid.showWithGravity(
                                            res_val.Message,
                                            ToastAndroid.SHORT, //can be SHORT, LONG
                                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                        );
                                    } else {
                                        AlertIOS.alert(res_val.Message);
                                    }

                                    this.props.navigation.navigate('Root');
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
                    if (this.state.Username == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter UserName',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter UserName');
                        }
                    } else if (this.state.password == null) {
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
                }
            } else if (this.state.LoginType == 'V') {
                if (this.state.Username != null && this.state.password != null && this.state.Sales_date != null) {
                    let basectx = { Username: this.state.Username, password: this.state.password, Sales_date: this.state.Sales_date, LoginType: this.state.LoginType }
                    return fetch(SozidUrl.SozidUrl + '/api/Values/Login', {
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
                                if (res_val.Message == "Login Successfully") {
                                    // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
                                    this.props.dispatch(LoadLoginctxSuccess(res_val.return_data));
                                    if (Platform.OS === 'android') {
                                        ToastAndroid.showWithGravity(
                                            res_val.Message,
                                            ToastAndroid.SHORT, //can be SHORT, LONG
                                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                                        );
                                    } else {
                                        AlertIOS.alert(res_val.Message);
                                    }

                                    this.props.navigation.navigate('Root');
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
                    if (this.state.Username == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Customer Name',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Customer Name');
                        }
                    } else if (this.state.password == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enetr Vendor Pin',
                                ToastAndroid.SHORT, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enetr Vendor Pin');
                        }
                    }
                    else if (this.state.Sales_date == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enetr Sales Date',
                                ToastAndroid.SHORT, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enetr Sales Date');
                        }
                    }
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <View style={{ position: 'absolute', top: 0 }}>{this.state.connection_Status == "Offline" ? <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Connection Failed,Internet connection required</Text></View> : null}</View> */}
                <NetConnection />
                <Text style={styles.logo}>Sozid</Text>
                <Text style={styles.logo}><Image source={require('../img/200px-logo.png')} /></Text>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    // justifyContent: 'space-evenly',
                }}>
                    <Radio selected={this.state.LoginType == 'PC' ? true : false} onPress={() => this.setState({ LoginType: 'PC' })} /><Text style={{ color: 'white' }}>Public/Customer </Text>
                    <Radio selected={this.state.LoginType == 'V' ? true : false} onPress={() => this.setState({ LoginType: 'V' })} /><Text style={{ color: 'white' }}>Vendor </Text>
                </View>
                {this.state.LoginType == 'PC' ?
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="User Name"
                            placeholderTextColor='white'
                            onChangeText={text => this.setState({ Username: text == '' ? null : text })} />
                    </View>
                    :
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="User Name(Customer)"
                            placeholderTextColor='white'
                            onChangeText={text => this.setState({ Username: text == '' ? null : text })} />
                    </View>
                }
                {this.state.LoginType == 'PC' ?
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor='white'
                            onChangeText={text => this.setState({ password: text == '' ? null : text })} />
                    </View>
                    :
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Vendor Pin"
                            placeholderTextColor='white'
                            onChangeText={text => this.setState({ password: text == '' ? null : text })} />
                    </View>
                }
                {this.state.LoginType == 'PC' ?
                    null
                    :
                    <View style={styles.inputView} >
                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.Sales_date}
                            mode="date"
                            placeholder="select Sales Date"
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
                }
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginonpress()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => this.props.navigation.navigate('ForgotPwd')}>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                </View>
                {/* <PushController /> */}
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
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal
});

// const mapDispatchToProps = dispatch => ({
//     LoadLoginctxSuccess: loginctx => {
//         dispatch(LoadLoginctxSuccess(loginctx));
//     }
// });

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Login);

// export default Login;