import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView, Dimensions
} from 'react-native';
import styles from '../style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigateTo } from '../Redux/actions';
import Icon from "react-native-vector-icons/Ionicons";
import IconEditDelete from "react-native-vector-icons/MaterialIcons";
import { Card, Fab, CardItem, List, ListItem, Body, Right } from 'native-base';
import SozidUrl from '../SozidUrl';
// import NetConnection from './NetConnection';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.SPCNOnPress = this.SPCNOnPress.bind(this);
    }
    SPCNOnPress(SubType) {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
                Userid: this.props.loginctx.Userid, Type: 'SPCN',
                tableName: '',
                obj: { SubType: SubType }
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
        // const { navigation } = this.props;
        //for refreshing grid by clicking goback
        // this.focusListener = navigation.addListener('didFocus', () => {
        //     this.Loaddata();
        // });
    }

    componentWillUnmount() {
        // this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.activitystyle}>
                {/* <NetConnection /> */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.startbtn} onPress={() => this.SPCNOnPress("S")}>
                        <Text style={styles.loginText}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.preclosebtn} onPress={() => this.SPCNOnPress("PC")}>
                        <Text style={styles.loginText}>Pre-Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.closebtn} onPress={() => this.SPCNOnPress("C")}>
                        <Text style={styles.loginText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextbtn} onPress={() => this.SPCNOnPress("N")}>
                        <Text style={styles.loginText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
Activity.propTypes = {
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
)(Activity);
