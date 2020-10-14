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

class ActivityView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Booked_People: null,
            In_Queue: null,
            Inside_Location: null,
            Left_People: null
        }

        this.MemberEditOnPress = this.MemberEditOnPress.bind(this);
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
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
                Userid: this.props.loginctx.Userid, Type: 'V', tableName: 'BQLP'
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
                            this.setState({
                                Booked_People: res_val.return_data.Booked_People,
                                In_Queue: res_val.return_data.In_Queue,
                                Inside_Location: res_val.return_data.Inside_Location,
                                Left_People: res_val.return_data.Left_People
                            });
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
    MemberEditOnPress(Customer_Public_Associate_no) {
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
            <View style={styles.activitystyle}>
                {/* <NetConnection /> */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.startbtn} >
                        <Text style={styles.loginText}>No. of People Booked</Text>
                        <Text style={styles.loginText}>{this.state.Booked_People}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.preclosebtn} >
                        <Text style={styles.loginText}>In Queue</Text>
                        <Text style={styles.loginText}>{this.state.In_Queue}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.closebtn} >
                        <Text style={styles.loginText}>Inside Location</Text>
                        <Text style={styles.loginText}>{this.state.Inside_Location}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextbtn} >
                        <Text style={styles.loginText}>No. of People Left</Text>
                        <Text style={styles.loginText}>{this.state.Left_People}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
ActivityView.propTypes = {
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
)(ActivityView);
