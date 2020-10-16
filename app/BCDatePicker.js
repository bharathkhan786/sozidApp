import React, { Component } from 'react';
import moment from 'moment';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    ImageBackground,
    TextInput,
    Image, TouchableHighlight,
    Platform, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

class BCDatePicker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show_time: false,
            datetime_value: null,
            show_date: false,
        }
        this.onDateTimeFilterChange_RN = this.onDateTimeFilterChange_RN.bind(this);
        this.onDateTimeFilter_RN = this.onDateTimeFilter_RN.bind(this);
        this.onDateTimeFilterForEdit_RN = this.onDateTimeFilterForEdit_RN.bind(this);
        this.onPressDate = this.onPressDate.bind(this);

    }
    onPressDate() {
        // this._renderDate()
        this.setState({ show_date: true });
        return;
    }
    onDateTimeFilterForEdit_RN(momentDate) {
        console.log('momentDate1 :', moment(momentDate, "x").format("YYYY-MM-DD"));
        let val = moment(momentDate, "x").format("YYYY-MM-DD");
        if (val == "Invalid date") {
            val = null;
            this.props.onchange(val);
            return;
        }
        //  this.state.show_date = false;
        this.setState({ show_date: false });
        this.setState({ show_time: true });
        this.setState({ datetime_value: val });

        // this.state.datetime_value = moment(momentDate, "x").format("YYYY-MM-DD");
        //  return;
    }
    onDateTimeFilter_RN(momentDate) {
        console.log('momentDate :', momentDate);
        if (momentDate == "Invalid date") {
            momentDate = null;
        }
        this.setState({ datetime_value: momentDate });
        this.setState({ show_time: true })
        this.setState({ show_date: false })
        // this.state.datetime_value = momentDate;
        return;
    }
    onDateTimeFilterChange_RN(momentDate) {
        let val1 = moment(momentDate, "x").format("hh:mm a");
        if (val1 == "Invalid date") {
            val1 = null;
            this.props.onchange(val1);
            return;
        }
        let val = this.state.datetime_value + ' ' + val1;
        console.log('val', val);
        this.setState({ show_time: false })
        this.setState({ show_date: false })
        this.props.onchange(val);
        return;

    }
    _renderIcon() {
        return (
            <Image
                style={{
                    width: 32,
                    height: 32,
                    marginLeft: 5,
                    marginRight: 5
                }}
                source={require('./img/date_icon.png')}
            />
        );
    }
    _renderDateEdit() {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(e, date) => this.onDateTimeFilterForEdit_RN(date)}
            />

        );
    }
    _renderDate() {
        return (
            <DatePicker
                style={{ width: "100%" }}
                date={this.props.value}//{new Date(req_val)}
                placeholder={this.props.placeholder}//"select date"
                format="YYYY-MM-DD"
                placeholderTextColor="#000000"
                // minDate={moment()}
                // maxDate={moment()}
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
                onDateChange={(date) => this.onDateTimeFilter_RN(date)}
                mode='date'
            />
        );
    }
    render() {
        const DatePickerStyles = StyleSheet.create({
            // inputDatePickerStyles: {
            dateIcon: {
                position: 'absolute',
                right: this.props.Mandatory == true ? 75 : 50,
                top: 4,
                marginRight: 0
            },
            dateInput: {
                marginRight: 36,
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'purple',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,
                fontWeight: 'bold'

            },
            // },
            styles: {
                // width: 390,
                width: this.props.Mandatory == true ? Dimensions.get('screen').width - 13 : Dimensions.get('screen').width + 4,
            },
        });

        const { name } = this.props;
        const { onchange } = this.props;
        const { placeholder } = this.props;
        const { type } = this.props;

        const { value } = this.props;
        const { disabled } = this.props;

        let val_temp = "RN";
        let req_field = null;

        let date_input_type = "YYYY-MM-DD";
        let datetime_input_type = "YYYY-MM-DD HH:MM";
        let time_input_type = "HH:MM";
        let month_input_type = "YYYY-MM";

        let req_val = value;
        let res = null;


        const dateInputStyle = [
            {
                flex: 1,
                height: 40,
                // width: 100,
                // borderWidth: 1,
                borderColor: '#aaa',
                alignItems: 'center',
                justifyContent: 'center'
            },
            {
                // backgroundColor: '#eee'
            }
        ];

        return (
            <View>
                {(req_val != null && req_val != undefined && req_val != '') ?
                    this.state.show_date == true ?
                        <View>
                            {this._renderDateEdit()}
                        </View>
                        : <TouchableHighlight
                            style={{ width: "100%" }}
                            underlayColor={'transparent'}
                            onPress={this.onPressDate}
                            testID="dateTimePicker"
                        >
                            <View style={{
                                flexDirection: 'row',
                                height: 40,
                                width: "100%",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={dateInputStyle}>
                                    <Text allowFontScaling={true} style={{ color: 'white' }}>{req_val}</Text>
                                </View>
                                {this._renderIcon()}
                            </View>
                        </TouchableHighlight>
                    :
                    <View>
                        {this._renderDate()}
                    </View>
                }

                {this.state.show_time == true ?
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(e, date) => this.onDateTimeFilterChange_RN(date)}
                    /> : null}

            </View>
        );
    }
}


function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;

    //   return JSON.stringify(obj) === JSON.stringify({});
}



BCDatePicker.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onchange: PropTypes.func.isRequired,
    format: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};


export default BCDatePicker;

