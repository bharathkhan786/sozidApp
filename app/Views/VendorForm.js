import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from '../style';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Radio } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import SozidUrl from '../SozidUrl';

class VendorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Vendor_name: null,
            Selling_items: null,
            Active_flag: 'N',
            edit_Vendor_name: null,
            edit_Selling_items: null,
            edit_Active_flag: null,
            Type: 'A',
            Customer_Vendor_no: null,
            Customer_no: null,
            BtnName: 'Save'

        }
        this.VendorSaveOnPress = this.VendorSaveOnPress.bind(this);
    }
    componentDidMount() {
        if (this.props.navigation.state.params.Customer_Vendor_no != null && this.props.navigation.state.params.Customer_Vendor_no != "" && this.props.navigation.state.params.Customer_Vendor_no != undefined) {
            this.setState({
                Vendor_name: this.props.navigation.state.params.Vendor_name,
                Selling_items: this.props.navigation.state.params.Selling_items,
                Active_flag: this.props.navigation.state.params.Active,
                Type: this.props.navigation.state.params.Type,
                Customer_Vendor_no: this.props.navigation.state.params.Customer_Vendor_no,
                Customer_no: this.props.navigation.state.params.Customer_no,
                BtnName: 'Update',
                edit_Vendor_name: this.props.navigation.state.params.Vendor_name,
                edit_Selling_items: this.props.navigation.state.params.Selling_items,
                edit_Active_flag: this.props.navigation.state.params.Active,
            });
        }
    }
    VendorSaveOnPress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Type == 'A') {
                if (this.state.Vendor_name != null && this.state.Selling_items != null && this.state.Active_flag != null) {
                    let basectx = { Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid, Type: this.state.Type, tableName: 'Customer_Vendor_Register_Master', obj: { Vendor_name: this.state.Vendor_name, Selling_items: this.state.Selling_items, Active_flag: this.state.Active_flag } }
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
                    if (this.state.Vendor_name == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Vendor Name',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Vendor Name');
                        }
                    } else if (this.state.Selling_items == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enetr Selling items',
                                ToastAndroid.SHORT, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enetr Selling items');
                        }
                    }
                }
            } else if (this.state.Type == 'U') {
                if (this.state.Vendor_name != this.state.edit_Vendor_name || this.state.Selling_items != this.state.edit_Selling_items || this.state.Active_flag != this.state.edit_Active_flag) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type, tableName: 'Customer_Vendor_Register_Master',
                        obj: {
                            Customer_Vendor_no: this.state.Customer_Vendor_no,
                            Vendor_name: this.state.Vendor_name == this.state.edit_Vendor_name ? null : this.state.Vendor_name,
                            Selling_items: this.state.Selling_items == this.state.edit_Selling_items ? null : this.state.Selling_items,
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
            <View style={styles.container3}>
                <View style={styles.inputViewfrom} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Vendor Name..."
                        placeholderTextColor='white'
                        value={this.state.Vendor_name}
                        onChangeText={text => this.setState({ Vendor_name: text == '' ? null : text })} />
                </View>
                <View style={styles.inputViewfrom} >
                    {/* <TextInput
                        style={styles.inputText}
                        placeholder="Selling Items..."
                        placeholderTextColor='white'
                        keyboardType='numeric'
                        value={this.state.Selling_items == null ? this.state.Selling_items : (this.state.Selling_items).toString()}
                        onChangeText={text => this.setState({ Selling_items: text == '' ? null : text })} /> */}
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ Selling_items: value == '' ? null : value })}
                        placeholder={{ label: 'Select Selling Items...', value: null }}
                        value={this.state.Selling_items}
                        items={[
                            { label: 'Vegetables', value: '1' },
                            { label: 'Non-perishable', value: '2' },
                            { label: 'Others', value: '3' },
                        ]}
                        style={styles.pickerSelectStyles}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>Active </Text>
                    <Radio selected={this.state.Active_flag == 'Y' ? true : false} onPress={() => this.setState({ Active_flag: 'Y' })} /><Text style={{ color: 'white' }}>Yes </Text>
                    <Radio selected={this.state.Active_flag == 'N' ? true : false} onPress={() => this.setState({ Active_flag: 'N' })} /><Text style={{ color: 'white' }}>No </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => this.VendorSaveOnPress()}>
                        <Text style={styles.loginText}>{this.state.BtnName}</Text>
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
VendorForm.propTypes = {
    loginctx: PropTypes.object,

};
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal

});
export default connect(
    mapStateToProps
)(VendorForm);
