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
import SozidUrl from '../SozidUrl';

class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Location_id: null,
            Floor: null,
            Location_spacing: null,
            Queue_batch: null,
            Separation_within_batch: null,
            Separation_across_batch: null,
            Queue_length: null,
            Active_flag: 'N',
            edit_Location_id: null,
            edit_Floor: null,
            edit_Location_spacing: null,
            edit_Queue_batch: null,
            edit_Separation_within_batch: null,
            edit_Separation_across_batch: null,
            edit_Queue_length: null,
            edit_Active_flag: null,
            Type: 'A',
            Customer_Location_no: null,
            Customer_no: null,
            BtnName: 'Save',

        }
        this.LocationSaveOnPress = this.LocationSaveOnPress.bind(this);
    }
    componentDidMount() {
        if (this.props.navigation.state.params.Customer_Location_no != null && this.props.navigation.state.params.Customer_Location_no != "" && this.props.navigation.state.params.Customer_Location_no != undefined) {
            this.setState({
                Customer_Location_no: this.props.navigation.state.params.Customer_Location_no,
                Location_id: this.props.navigation.state.params.Location_id,
                Floor: this.props.navigation.state.params.Floor,
                Location_spacing: this.props.navigation.state.params.Location_spacing,
                Queue_batch: this.props.navigation.state.params.Queue_batch,
                Separation_within_batch: this.props.navigation.state.params.Separation_within_batch,
                Separation_across_batch: this.props.navigation.state.params.Separation_across_batch,
                Queue_length: this.props.navigation.state.params.Queue_length,
                Active_flag: this.props.navigation.state.params.Active,
                Type: this.props.navigation.state.params.Type,
                Customer_no: this.props.navigation.state.params.Customer_no,
                BtnName: 'Update',
                edit_Location_id: this.props.navigation.state.params.Location_id,
                edit_Floor: this.props.navigation.state.params.Floor,
                edit_Location_spacing: this.props.navigation.state.params.Location_spacing,
                edit_Queue_batch: this.props.navigation.state.params.Queue_batch,
                edit_Separation_within_batch: this.props.navigation.state.params.Separation_within_batch,
                edit_Separation_across_batch: this.props.navigation.state.params.Separation_across_batch,
                edit_Queue_length: this.props.navigation.state.params.Queue_length,
                edit_Active_flag: this.props.navigation.state.params.Active,
            });
        }
    }
    LocationSaveOnPress() {
        if (this.props.NetConnectionVal == "Online") {
            if (this.state.Type == 'A') {
                if (this.state.Location_id != null && this.state.Floor != null && this.state.Location_spacing != null
                    && this.state.Queue_batch != null && this.state.Separation_within_batch != null
                    && this.state.Separation_across_batch != null && this.state.Queue_length != null && this.state.Active_flag != null) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type,
                        tableName: 'Customer_Location_Master',
                        obj: {
                            Location_id: this.state.Location_id,
                            Floor: this.state.Floor,
                            Location_spacing: this.state.Location_spacing,
                            Queue_batch: this.state.Queue_batch,
                            Separation_within_batch: this.state.Separation_within_batch,
                            Separation_across_batch: this.state.Separation_across_batch,
                            Queue_length: this.state.Queue_length,
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
                    if (this.state.Location_id == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Location Id',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Location Id');
                        }
                    } else if (this.state.Floor == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Floor',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Floor');
                        }
                    } else if (this.state.Location_spacing == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Location Spacing',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Location Spacing');
                        }
                    } else if (this.state.Queue_batch == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Queue Batch',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Queue Batch');
                        }
                    } else if (this.state.Separation_within_batch == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Separation within Batch',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Separation within Batch');
                        }
                    } else if (this.state.Separation_across_batch == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Separation Across Batch',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Separation Across Batch');
                        }
                    } else if (this.state.Queue_length == null) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.showWithGravity(
                                'Please Enter Queue Length',
                                ToastAndroid.LONG, //can be SHORT, LONG
                                ToastAndroid.TOP //can be TOP, BOTTON, CENTER
                            );
                        } else {
                            AlertIOS.alert('Please Enter Queue Length');
                        }
                    }
                }
            } else if (this.state.Type == 'U') {
                if (this.state.Location_id != this.state.edit_Location_id
                    || this.state.Floor != this.state.edit_Floor
                    || this.state.Location_spacing != this.state.edit_Location_spacing
                    || this.state.Queue_batch != this.state.edit_Queue_batch
                    || this.state.Separation_within_batch != this.state.edit_Separation_within_batch
                    || this.state.Separation_across_batch != this.state.edit_Separation_across_batch
                    || this.state.Queue_length != this.state.edit_Queue_length
                    || this.state.Active_flag != this.state.edit_Active_flag) {
                    let basectx = {
                        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no, Userid: this.props.loginctx.Userid,
                        Type: this.state.Type, tableName: 'Customer_Location_Master',
                        obj: {
                            Customer_Location_no: this.state.Customer_Location_no,
                            Location_id: this.state.Location_id == this.state.edit_Location_id ? null : this.state.Location_id,
                            Floor: this.state.Floor == this.state.edit_Floor ? null : this.state.Floor,
                            Location_spacing: this.state.Location_spacing == this.state.edit_Location_spacing ? null : this.state.Location_spacing,
                            Queue_batch: this.state.Queue_batch == this.state.edit_Queue_batch ? null : this.state.Queue_batch,
                            Separation_within_batch: this.state.Separation_within_batch == this.state.edit_Separation_within_batch ? null : this.state.Separation_within_batch,
                            Separation_across_batch: this.state.Separation_across_batch == this.state.edit_Separation_across_batch ? null : this.state.Separation_across_batch,
                            Queue_length: this.state.Queue_length == this.state.edit_Queue_length ? null : this.state.Queue_length,
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
            <View style={styles.containersignup}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Location ID"
                            placeholderTextColor='white'
                            value={this.state.Location_id}
                            onChangeText={text => this.setState({ Location_id: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Floor"
                            placeholderTextColor='white'
                            value={this.state.Floor}
                            onChangeText={text => this.setState({ Floor: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Location Spacing"
                            placeholderTextColor='white'
                            value={this.state.Location_spacing}
                            onChangeText={text => this.setState({ Location_spacing: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Queue Batch"
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            value={this.state.Queue_batch == null ? this.state.Queue_batch : (this.state.Queue_batch).toString()}
                            onChangeText={text => this.setState({ Queue_batch: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Separation Within Batch(Meters)"
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            value={this.state.Separation_within_batch == null ? this.state.Separation_within_batch : (this.state.Separation_within_batch).toString()}
                            onChangeText={text => this.setState({ Separation_within_batch: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Separation Across Batch(Meters)"
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            value={this.state.Separation_across_batch == null ? this.state.Separation_across_batch : (this.state.Separation_across_batch).toString()}
                            onChangeText={text => this.setState({ Separation_across_batch: text == '' ? null : text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Queue Length"
                            placeholderTextColor='white'
                            keyboardType='numeric'
                            value={this.state.Queue_length == null ? this.state.Queue_length : (this.state.Queue_length).toString()}
                            onChangeText={text => this.setState({ Queue_length: text == '' ? null : text })} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white' }}>Active </Text>
                        <Radio selected={this.state.Active_flag == 'Y' ? true : false} onPress={() => this.setState({ Active_flag: 'Y' })} /><Text style={{ color: 'white' }}>Yes </Text>
                        <Radio selected={this.state.Active_flag == 'N' ? true : false} onPress={() => this.setState({ Active_flag: 'N' })} /><Text style={{ color: 'white' }}>No </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.LocationSaveOnPress()}>
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
LocationForm.propTypes = {
    loginctx: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal

});
export default connect(
    mapStateToProps
)(LocationForm);
