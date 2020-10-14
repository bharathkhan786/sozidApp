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

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadCustomer_Contact_Matser: [],
            Firstname: null,
            Lastname: null,
            Mobile: null,
            EmailId: null,
            Customer_Contact_no: null,
            Type: null,
            Customer_no: null,
            edit_Firstname: null,
            edit_Lastname: null,
            edit_Mobile: null,
            edit_EmailId: null
        }

        this.ContactEditOnPress = this.ContactEditOnPress.bind(this);
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
                Userid: this.props.loginctx.Userid, Type: 'V', tableName: 'Customer_Contact_Matser'
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
                            this.setState({ LoadCustomer_Contact_Matser: res_val.return_data });
                            let PreLoadData = res_val.return_data;
                            for (var property in PreLoadData) {
                                if (PreLoadData.hasOwnProperty(property)) {
                                    this.setState({
                                        Customer_Contact_no: PreLoadData[property].Customer_Contact_no,
                                        Customer_no: PreLoadData[property].Customer_no,
                                        Firstname: PreLoadData[property].Firstname,
                                        Lastname: PreLoadData[property].Lastname,
                                        Mobile: PreLoadData[property].Mobile,
                                        EmailId: PreLoadData[property].EmailId,
                                        Type: 'U',
                                        edit_Firstname: PreLoadData[property].Firstname,
                                        edit_Lastname: PreLoadData[property].Lastname,
                                        edit_Mobile: PreLoadData[property].Mobile,
                                        edit_EmailId: PreLoadData[property].EmailId,
                                    });
                                }
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
    ContactEditOnPress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Firstname != this.state.edit_Firstname
                || this.state.Lastname != this.state.edit_Lastname
                || this.state.Mobile != this.state.edit_Mobile
                || this.state.EmailId != this.state.edit_EmailId
            ) {
                let basectx = {
                    Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
                    Userid: this.props.loginctx.Userid,
                    Type: this.state.Type, tableName: 'Customer_Contact_Matser',
                    obj: {
                        Customer_Contact_no: this.state.Customer_Contact_no,
                        Firstname: this.state.Firstname == this.state.edit_Firstname ? null : this.state.Firstname,
                        Lastname: this.state.Lastname == this.state.edit_Lastname ? null : this.state.Lastname,
                        Mobile: this.state.Mobile == this.state.edit_Mobile ? null : this.state.Mobile,
                        EmailId: this.state.EmailId == this.state.edit_EmailId ? null : this.state.EmailId,
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
            // let PreLoadData = this.state.LoadCustomer_Contact_Matser;
            // for (var property in PreLoadData) {
            //     if (PreLoadData.hasOwnProperty(property)) {
            //         if (Customer_Contact_no == PreLoadData[property].Customer_Contact_no) {
            //             this.props.navigation.navigate('Add Contact', {
            //                 Customer_Contact_no: PreLoadData[property].Customer_Contact_no,
            //                 Customer_no: PreLoadData[property].Customer_no,
            //                 Vendor_name: PreLoadData[property].Vendor_name,
            //                 Selling_items: PreLoadData[property].Selling_items,
            //                 Active: PreLoadData[property].Active,
            //                 Type: 'U'
            //             });
            //         }
            //     }
            // }
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
            <View style={styles.containersignup}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Firstname..."
                            placeholderTextColor='white'
                            value={this.state.Firstname}
                            onChangeText={text => this.setState({ Firstname: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Lastname..."
                            placeholderTextColor='white'
                            value={this.state.Lastname}
                            onChangeText={text => this.setState({ Lastname: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Mobile..."
                            placeholderTextColor='white'
                            value={this.state.Mobile}
                            keyboardType='phone-pad'
                            onChangeText={text => this.setState({ Mobile: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="EmailId..."
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            value={this.state.EmailId}
                            onChangeText={text => this.setState({ EmailId: text == '' ? null : text })} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.ContactEditOnPress()}>
                            <Text style={styles.loginText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            // <View style={styles.container2}>
            //     <ScrollView>
            //         <Card style={styles.Cardstyle}>
            //             {this.state.LoadCustomer_Contact_Matser.length > 0 ?
            //                 this.state.LoadCustomer_Contact_Matser
            //                     .map(Customer_Contact_Matser =>
            //                         <List>
            //                             <ListItem>
            //                                 <Body>
            //                                     <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>First Name : </Text> <Text style={styles.listtextfont}>{Customer_Contact_Matser.Firstname}</Text>{'\n'}</Text>
            //                                     <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Last Name : </Text><Text style={styles.listtextfont}> {Customer_Contact_Matser.Lastname}</Text>{'\n'}</Text>
            //                                     <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Mobile : </Text> <Text style={styles.listtextfont}>{Customer_Contact_Matser.Mobile}</Text>{'\n'}</Text>
            //                                     <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>EmailId : </Text> <Text style={styles.listtextfont}>{Customer_Contact_Matser.EmailId}</Text>{'\n'}</Text>
            //                                          </Body>
            //                                 <Right>
            //                                     <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.ContactEditOnPress(Customer_Contact_Matser.Customer_Contact_no)}>
            //                                         <IconEditDelete name="edit" size={25} color="blue" />
            //                                     </TouchableOpacity>
            //                                     {/* <TouchableOpacity style={styles.EditDeleteBtn} onPress={() => this.ContactDeleteOnPress(Customer_Contact_Matser.Customer_Contact_no)}>
            //                                         <IconEditDelete name="delete" size={25} color="red" />
            //                                     </TouchableOpacity> */}
            //                                 </Right>
            //                             </ListItem>
            //                         </List>
            //                     )
            //                 :
            //                 <List>
            //                     <ListItem>
            //                         <Body>
            //                             <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>First Name : </Text></Text>
            //                             <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Last Name : </Text></Text>
            //                             <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Mobile : </Text></Text>
            //                             <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>EmailId : </Text></Text>
            //                             <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>No Records Found</Text></Text>
            //                         </Body>
            //                     </ListItem>
            //                 </List>
            //             }
            //         </Card>
            //     </ScrollView>
            //     {/* <Fab
            //         active
            //         direction="up"
            //         containerStyle={{}}
            //         style={{ backgroundColor: '#5067FF' }}
            //         position="bottomRight"
            //         onPress={() => this.props.navigation.navigate('Add Contact', {
            //             Customer_Contact_no: null,
            //         })}>
            //         <Icon name="ios-add" style={{ fontSize: 30 }} />
            //     </Fab> */}
            // </View>
        );
    }
}
Contact.propTypes = {
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
)(Contact);
