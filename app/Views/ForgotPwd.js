import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from '../style';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SozidUrl from '../SozidUrl';
import NetConnection from './NetConnection';

class ForgotPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: null,
            New_Password: null,
            Confirm_Password: null
        }
        this.ForgotPwdpress = this.ForgotPwdpress.bind(this);
    }
    ForgotPwdpress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Username != null && this.state.New_Password != null && this.state.Confirm_Password != null) {
                let basectx = { Username: this.state.Username, NewPassword: this.state.New_Password }
                if (this.state.New_Password == this.state.Confirm_Password) {
                    return fetch(SozidUrl.SozidUrl + '/api/Values/forgetPassword', {
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
                                if (res_val.Message == "Success! Your Password has been changed!") {
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
                } else {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'The password and confirmation password do not match.',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('The password and confirmation password do not match.');
                    }
                }
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
                } else if (this.state.New_Password == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr New Password',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr New Password');
                    }
                }
                else if (this.state.Confirm_Password == null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enetr Confirm Password',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enetr Confirm Password');
                    }
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <NetConnection />
                <Text style={styles.forgotpwdlogo}>Forgot Password</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username..."
                        placeholderTextColor='white'
                        onChangeText={text => this.setState({ Username: text == '' ? null : text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="New Password..."
                        placeholderTextColor='white'
                        onChangeText={text => this.setState({ New_Password: text == '' ? null : text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Confirm Password..."
                        placeholderTextColor='white'
                        onChangeText={text => this.setState({ Confirm_Password: text == '' ? null : text })} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.signBtn} onPress={() => this.ForgotPwdpress()}>
                        <Text style={styles.loginText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.navigate('Login')}>
                        <Icon name="arrow-left" style={styles.loginText} size={25} />
                    </TouchableOpacity>
                </View>
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
export default connect(
    mapStateToProps
)(ForgotPwd);
