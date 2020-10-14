import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView, Dimensions,
} from 'react-native';
import styles from '../style';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/Ionicons";
import { Card, Fab, CardItem, List, ListItem, Body, Right, Radio } from 'native-base';
import SozidUrl from '../SozidUrl';

class MemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Sozid_publc_registration_no: null,
            Active_flag: 'N',
            edit_Sozid_publc_registration_no: null,
            edit_Active_flag: null,
            Type: 'A',
            Customer_Public_Associate_no: null,
            Customer_no: null,
            BtnName: 'Save',
            LoadSozid_publc_registration_Master: [],
            Member_name: null,
            Member_phno: null,
            phoneno_validation: null,
            SelectbackgroundColor: "#C0C0C0",
            IconColor: "blue",
        }
        this.MemberSaveOnPress = this.MemberSaveOnPress.bind(this);
        this.SearchByNameorPhoneNumber = this.SearchByNameorPhoneNumber.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.SelectOnPress = this.SelectOnPress.bind(this);

    }
    onValueChange(name, value) {
        if (name == 'Member_name') {
            this.setState({ Member_name: value == '' ? null : value });
            this.setState({ Member_phno: null });
        } else if (name == 'Member_phno') {
            this.setState({ Member_name: null });
            this.setState({ Member_phno: value });
        }
    }
    onEndEditing = (key, val) => {
        if (key == 'Member_phno') {
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
            } else {
                this.setState({
                    phoneno_validation: val,
                });
                return true;
            }
        }
    }
    SelectOnPress(Sozid_publc_registration_no) {
        this.setState({ Sozid_publc_registration_no: Sozid_publc_registration_no });
    }
    componentDidMount() {
        if (this.props.navigation.state.params.Customer_Public_Associate_no != null && this.props.navigation.state.params.Customer_Public_Associate_no != "" && this.props.navigation.state.params.Customer_Public_Associate_no != undefined) {
            this.setState({
                Sozid_publc_registration_no: this.props.navigation.state.params.Sozid_publc_registration_no,
                Active_flag: this.props.navigation.state.params.Active,
                Type: this.props.navigation.state.params.Type,
                Customer_Public_Associate_no: this.props.navigation.state.params.Customer_Public_Associate_no,
                Customer_no: this.props.navigation.state.params.Customer_no,
                BtnName: 'Update',
                edit_Sozid_publc_registration_no: this.props.navigation.state.params.Sozid_publc_registration_no,
                edit_Active_flag: this.props.navigation.state.params.Active,
            });
        }
    }
    SearchByNameorPhoneNumber() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Member_phno != null && this.state.phoneno_validation != null) {
                if (this.state.Member_phno == this.state.phoneno_validation) {

                }
                else {
                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravity(
                            'Please Enter Currect Phone Number',
                            ToastAndroid.SHORT, //can be SHORT, LONG
                            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                        );
                    } else {
                        AlertIOS.alert('Please Enter Currect Phone Number');
                    }
                    return;
                }
            }
            if (this.state.Member_name != null || this.state.phoneno_validation != null) {
                let basectx = {
                    Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
                    Userid: this.props.loginctx.Userid, Type: 'V',
                    tableName: 'Sozid_publc_registration_Master',
                    obj: {
                        Member_name: this.state.Member_name,
                        Member_phno: this.state.Member_phno
                    }
                }
                return fetch(SozidUrl.SozidUrl + '/api/Values/SearchByNameorPhoneNumber', {
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
                                    this.setState({ LoadSozid_publc_registration_Master: [] });
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
                                    this.setState({ LoadSozid_publc_registration_Master: res_val.return_data });
                                }
                                // this.setState({ LoadSozid_publc_registration_Master: res_val.return_data });
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
                                this.setState({ LoadSozid_publc_registration_Master: [] });
                            }
                        } else {
                            const emp_arr = [];
                            this.setState({ LoadSozid_publc_registration_Master: emp_arr });

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
                        this.setState({ LoadSozid_publc_registration_Master: [] });
                        // throw (error);
                    });
            }
            else {
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity(
                        "Please Enter Member Name Or Phone No.",
                        ToastAndroid.SHORT, //can be SHORT, LONG
                        ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                    );
                } else {
                    AlertIOS.alert("Please Enter Member Name Or Phone No.");
                }
            }
        }
    }
    MemberSaveOnPress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Type == 'A') {
                if (this.state.Sozid_publc_registration_no != null && this.state.Active_flag != null) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type,
                        tableName: 'Customer_Public_Associate_Master',
                        obj: {
                            Sozid_publc_registration_no: this.state.Sozid_publc_registration_no,
                            Active_flag: this.state.Active_flag
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
                    if (this.state.Sozid_publc_registration_no == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Select At least one Record',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Select At least one Record');
                        }
                    }
                }
            } else if (this.state.Type == 'U') {
                if (this.state.Sozid_publc_registration_no != this.state.edit_Sozid_publc_registration_no || this.state.Active_flag != this.state.edit_Active_flag) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type, tableName: 'Customer_Public_Associate_Master',
                        obj: {
                            Customer_Public_Associate_no: this.state.Customer_Public_Associate_no,
                            Sozid_publc_registration_no: this.state.Sozid_publc_registration_no == this.state.edit_Sozid_publc_registration_no ? null : this.state.Sozid_publc_registration_no,
                            Active_flag: this.state.Active_flag == this.state.edit_Active_flag ? null : this.state.Active_flag
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
            <View style={{
                flex: 1,
                backgroundColor: '#003f5c',
                alignItems: 'center',
                // justifyContent: 'center',
            }}>

                <View style={{
                    width: "80%",
                    backgroundColor: "#465881",
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: "center",
                    padding: 20
                }}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Member Name'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        value={this.state.Member_name}
                        onChangeText={val => this.onValueChange('Member_name', val)}
                    />
                </View>
                <Text style={{ color: 'white', paddingBottom: 10 }}>OR</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder='Phone Number'
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        value={this.state.Member_phno}
                        keyboardType='phone-pad'
                        onChangeText={val => this.onValueChange('Member_phno', val)}
                        onEndEditing={(event) => this.onEndEditing('Member_phno', event.nativeEvent.text)}
                    />
                </View>
                <TouchableOpacity style={{
                    width: "60%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 25,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }} onPress={() => this.SearchByNameorPhoneNumber()}>
                    <Text style={styles.loginText}>Search</Text>
                </TouchableOpacity>
                {this.state.LoadSozid_publc_registration_Master.length > 0 ? <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        alignItems: 'center',
                        justifyContent: 'center', width: (Dimensions.get('window').width - 100)
                    }}
                >
                    <View style={{ width: (Dimensions.get('window').width - 100) }}>
                        <Card style={styles.Cardstyle}>
                            {this.state.LoadSozid_publc_registration_Master.length > 0 ?
                                this.state.LoadSozid_publc_registration_Master
                                    .map(LoadSozid_publc_registration_Maste =>
                                        <List>
                                            <ListItem>
                                                <Body>
                                                    <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Member Name : </Text> <Text style={styles.listtextfont}>{LoadSozid_publc_registration_Maste.FirstName} {LoadSozid_publc_registration_Maste.LastName}</Text>{'\n'}</Text>
                                                    <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Mobile Number : </Text> <Text style={styles.listtextfont}>{LoadSozid_publc_registration_Maste.Mobile}</Text>{'\n'}</Text>
                                                    <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>EmailId : </Text> <Text style={styles.listtextfont}>{LoadSozid_publc_registration_Maste.EmailId}</Text>{'\n'}</Text>
                                                </Body>
                                                <Right>
                                                    <TouchableOpacity style={{
                                                        width: 40,
                                                        backgroundColor: this.state.Sozid_publc_registration_no == LoadSozid_publc_registration_Maste.Sozid_publc_registration_no ? 'green' : this.state.SelectbackgroundColor,
                                                        borderRadius: 25,
                                                        height: 40,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        // marginTop: 40,
                                                        marginBottom: 10
                                                    }} onPress={() => this.SelectOnPress(LoadSozid_publc_registration_Maste.Sozid_publc_registration_no)}>
                                                        <Icon name="ios-checkmark-circle-outline" size={25} color={this.state.Sozid_publc_registration_no == LoadSozid_publc_registration_Maste.Sozid_publc_registration_no ? 'white' : this.state.IconColor} />
                                                    </TouchableOpacity>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    )
                                : null
                            }
                        </Card>
                    </View>
                </ScrollView> : null}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>Active </Text>
                    <Radio selected={this.state.Active_flag == 'Y' ? true : false} onPress={() => this.setState({ Active_flag: 'Y' })} /><Text style={{ color: 'white' }}>Yes </Text>
                    <Radio selected={this.state.Active_flag == 'N' ? true : false} onPress={() => this.setState({ Active_flag: 'N' })} /><Text style={{ color: 'white' }}>No </Text>
                </View>
                <TouchableOpacity style={{
                    width: "60%",
                    backgroundColor: "#fb5b5a",
                    borderRadius: 25,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }} onPress={() => this.MemberSaveOnPress()}>
                    <Text style={styles.loginText}>{this.state.BtnName}</Text>
                </TouchableOpacity>
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
MemberForm.propTypes = {
    loginctx: PropTypes.object,

};
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal

});
export default connect(
    mapStateToProps
)(MemberForm);
