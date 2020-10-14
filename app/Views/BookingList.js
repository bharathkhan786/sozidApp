import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView, Alert
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

class BookingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadPublic_Purchase_booking_Txn: []
        }
        this.Loaddata = this.Loaddata.bind(this);
        this.AlertDeleteOnPress = this.AlertDeleteOnPress.bind(this);
        this.DeleteOnPress = this.DeleteOnPress.bind(this);

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
                Userid: this.props.loginctx.Userid, Type: 'V', tableName: 'Public_Purchase_booking_Txn'
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
                                this.setState({ LoadPublic_Purchase_booking_Txn: [] });
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
                                this.setState({ LoadPublic_Purchase_booking_Txn: res_val.return_data });
                            }
                            // this.setState({ LoadPublic_Purchase_booking_Txn: res_val.return_data })
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
                            this.setState({ LoadPublic_Purchase_booking_Txn: [] });
                        }
                    } else {
                        const emp_arr = [];
                        this.setState({ LoadPublic_Purchase_booking_Txn: [] });
                    }
                }).catch(error => {
                    this.setState({ LoadPublic_Purchase_booking_Txn: [] });
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            error,
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert(error);
                    }
                    // throw (error);
                });
        }
    }
    DeleteOnPress(Public_Purchase_booking_no) {
        if (this.props.NetConnectionVal == "Online") {
            let basectx = {
                Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                Type: 'D', tableName: 'Public_Purchase_booking_Txn',
                obj: { Public_Purchase_booking_no: Public_Purchase_booking_no }
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
                        if (res_val.Message == "Booking Cancled Successfully") {
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
    AlertDeleteOnPress(Public_Purchase_booking_no) {
        if (this.props.NetConnectionVal == "Online") {
            Alert.alert(
                'Are you sure?',
                'Do you really want to cancel this booking?',
                [
                    { text: 'Yes', onPress: () => this.DeleteOnPress(Public_Purchase_booking_no) },
                    { text: 'No', style: 'cancel' },
                ],
                {
                    cancelable: true
                }
            );
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
                        {this.state.LoadPublic_Purchase_booking_Txn.length > 0 ?
                            this.state.LoadPublic_Purchase_booking_Txn
                                .map(LoadPublic_Purchase_booking_Tx =>
                                    <List>
                                        {/* {LoadPublic_Purchase_booking_Tx.Cancel == "N" ? */}
                                        <ListItem>
                                            <Body>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Sales No. : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Vendor_sales_no}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Customer Name : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Firstname} {LoadPublic_Purchase_booking_Tx.Lastname}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Batch No At Start : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Batchno_at_start}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue No At Start : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Queue_no_at_start}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Left Location : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Left_location}</Text>{'\n'}</Text>
                                                <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Booking At : </Text> <Text style={styles.listtextfont}>{moment(LoadPublic_Purchase_booking_Tx.Booking_at).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                            </Body>
                                            <Right>
                                                <TouchableOpacity style={LoadPublic_Purchase_booking_Tx.Cancel == "N" ? styles.EditDeleteBtn : null} onPress={() => LoadPublic_Purchase_booking_Tx.Cancel == "N" ? this.AlertDeleteOnPress(LoadPublic_Purchase_booking_Tx.Public_Purchase_booking_no) : console.log('')}>
                                                    {LoadPublic_Purchase_booking_Tx.Cancel == "N" ? <IconEditDelete name="delete" size={25} color="red" /> : <Text style={{ color: 'red' }}>Booking Cancled</Text>}
                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                        {/* // :
                                            // <ListItem>
                                            //     <Body>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Sales No. : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Vendor_sales_no}</Text>{'\n'}</Text>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Customer Name : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Firstname} {LoadPublic_Purchase_booking_Tx.Lastname}</Text>{'\n'}</Text>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Batch No At Start : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Batchno_at_start}</Text>{'\n'}</Text>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue No At Start : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Queue_no_at_start}</Text>{'\n'}</Text>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Left Location : </Text> <Text style={styles.listtextfont}>{LoadPublic_Purchase_booking_Tx.Left_location}</Text>{'\n'}</Text>
                                            //         <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Booking At : </Text> <Text style={styles.listtextfont}>{moment(LoadPublic_Purchase_booking_Tx.Booking_at).format('YYYY-MM-DD hh:mm')}</Text>{'\n'}</Text>
                                            //     </Body>
                                            //     <Right>
                                            //         <TouchableOpacity style={{
                                            //             width: "90%",
                                            //             height: "40%",
                                            //             alignItems: "center",
                                            //             justifyContent: "center",
                                            //         }}>
                                            //             <Text style={{ color: 'red' }}>Booking Cancled</Text>
                                            //         </TouchableOpacity>
                                            //     </Right>
                                            // </ListItem>} */}
                                    </List>
                                )
                            :
                            <List>
                                <ListItem>
                                    <Body>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Sales No. : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Customer Name : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Batch No At Start : </Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Queue No At Start :</Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Left Location :</Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Booking At :</Text></Text>
                                        <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>No Records Found</Text></Text>
                                    </Body>
                                </ListItem>
                            </List>
                        }
                    </Card>
                </ScrollView>
            </View>
        );
    }
}
BookingList.propTypes = {
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
)(BookingList);
