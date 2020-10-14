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
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import SozidUrl from '../SozidUrl';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import NetConnection from './NetConnection';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadCustomer_Public_Associate_Master: [], //Customer Name list
      Customer_no: null,
      Sales_date: null,
      LoadCustomer_Location_Master: [],
      SelectbackgroundColor: "#C0C0C0",
      IconColor: "blue",
      Vendor_sales_no: null
    }
    this.Loaddata = this.Loaddata.bind(this);
    this.SearchOnPress = this.SearchOnPress.bind(this);
    this.SaveOnPress = this.SaveOnPress.bind(this);
    this.SelectOnPress = this.SelectOnPress.bind(this);
    this.onValueChange = this.onValueChange.bind(this);


  }
  onValueChange(name, value) {
    if (name == 'customer_name') {
      this.setState({ Customer_no: value == '' ? null : value });
      this.setState({ Sales_date: null });
    } else if (name == 'sales_date') {
      this.setState({ Customer_no: null });
      this.setState({ Sales_date: value });
    }
  }
  SearchOnPress() {
    if (this.props.NetConnectionVal == "Online") {
      if (this.state.Customer_no != null || this.state.Sales_date != null) {
        let basectx = {
          Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
          Userid: this.props.loginctx.Userid, Type: 'V',
          tableName: 'Customer_Public_Associate_MasterLocation_MasterVendor_Register_MasterVendor_sales_Txn',
          obj: {
            Customer_no: this.state.Customer_no,
            Sales_date: this.state.Sales_date
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
                  this.setState({ LoadCustomer_Location_Master: [] });
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
                  this.setState({ LoadCustomer_Location_Master: res_val.return_data });
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
                this.setState({ LoadCustomer_Location_Master: [] });
              }
            } else {
              const emp_arr = [];
              this.setState({ LoadCustomer_Location_Master: emp_arr });
            }
          }).catch(error => {
            this.setState({ LoadCustomer_Location_Master: [] });
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
      else {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            "Please Select Customer Name Or Sales Date",
            ToastAndroid.SHORT, //can be SHORT, LONG
            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
          );
        } else {
          AlertIOS.alert("Please Select Customer Name Or Sales Date");
        }
      }
    }
  }
  SaveOnPress() {
    if (this.props.NetConnectionVal == "Online") {
      if (this.state.Vendor_sales_no != null) {
        let basectx = {
          Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
          Userid: this.props.loginctx.Userid, Type: 'A', tableName: 'Public_Purchase_booking_Txn',
          obj: {
            Vendor_sales_no: this.state.Vendor_sales_no
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
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            'Please Select At least one Record',
            ToastAndroid.SHORT, //can be SHORT, LONG
            ToastAndroid.TOP //can be TOP, BOTTON, CENTER
          );
        } else {
          AlertIOS.alert('Please Select At least one Record');
        }
      }
    }
  }
  SelectOnPress(Vendor_sales_no) {
    this.setState({ Vendor_sales_no: Vendor_sales_no });
  }

  Loaddata() {
    if (this.props.NetConnectionVal == "Online") {
      let basectx = {
        Customer_no: this.props.loginctx.Sozid_publc_Customer_registration_no,
        Userid: this.props.loginctx.Userid, Type: 'V', tableName: 'Customer_Public_Associate_Master'
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
                this.setState({ LoadCustomer_Public_Associate_Master: [] });
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
                const LoadCustomer_Public_Associate_Masters = res_val.return_data.map(LoadCustomer_Public_Associate_Maste => {
                  return {
                    label: LoadCustomer_Public_Associate_Maste.Customer_name,
                    value: LoadCustomer_Public_Associate_Maste.Customer_no
                  };
                });
                this.setState({ LoadCustomer_Public_Associate_Master: LoadCustomer_Public_Associate_Masters }) //Customer Name
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
              this.setState({ LoadCustomer_Public_Associate_Master: [] });

            }
          } else {
            const emp_arr = [];
            this.setState({ LoadCustomer_Public_Associate_Master: emp_arr });

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
          this.setState({ LoadCustomer_Public_Associate_Master: [] });

          // throw (error);
        });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.NetConnectionVal !== this.props.NetConnectionVal) {
      this.Loaddata();
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
      <View style={{
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
        {/* <NetConnection /> */}
        <View style={{
          width: wp("80%"),
          backgroundColor: "#465881",
          borderRadius: 25,
          height: hp(6),
          marginBottom: 20,
          justifyContent: "center",
          padding: 20,
          paddingTop: 20
        }}>
          <RNPickerSelect
            onValueChange={(value) => this.onValueChange('customer_name', value)}
            placeholder={{ label: 'Select  Customer Name', value: '' }}
            value={this.state.Customer_no}
            items={this.state.LoadCustomer_Public_Associate_Master}
            style={styles.pickerSelectStyles}
          />
        </View>
        <Text style={{ color: 'white', paddingBottom: 10 }}>OR</Text>
        <View style={styles.inputView} >
          <DatePicker
            style={{ width: wp("70%") }}
            date={this.state.Sales_date}
            mode="date"
            placeholder="Select Sales Date"
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
            onDateChange={(date) => { this.onValueChange('sales_date', date) }}
          />
        </View>
        <TouchableOpacity style={{
          width: wp("60%"),
          backgroundColor: "#fb5b5a",
          borderRadius: 25,
          height: hp(6),
          alignItems: "center",
          justifyContent: "center",
        }} onPress={() => this.SearchOnPress()}>
          {/* <IconEditDelete name="search" /> */}
          <Text style={styles.loginText}>Search</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            paddingTop: 1,
            paddingBottom: 1,
            alignItems: 'center',
            justifyContent: 'center', width: (wp("100%") - 100)
          }}
        >
          <View style={{ width: (wp("100%") - 100) }}>
            <Card style={styles.Cardstyle}>
              {this.state.LoadCustomer_Location_Master.length > 0 ?
                this.state.LoadCustomer_Location_Master
                  .map(LoadCustomer_Location_Maste =>
                    <List>
                      <ListItem>
                        <Body>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Customer Name : </Text> <Text style={styles.listtextfont}>{LoadCustomer_Location_Maste.Customer_name}</Text>{'\n'}</Text>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Sales Date : </Text> <Text style={styles.listtextfont}>{moment(LoadCustomer_Location_Maste.Sales_date).format('YYYY-MM-DD')}</Text>{'\n'}</Text>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id: </Text> <Text style={styles.listtextfont}>{LoadCustomer_Location_Maste.Location_id}</Text>{'\n'}</Text>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Name: </Text> <Text style={styles.listtextfont}>{LoadCustomer_Location_Maste.Vendor_name}</Text>{'\n'}</Text>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Opens At: </Text> <Text style={styles.listtextfont}>{moment(LoadCustomer_Location_Maste.opens_at).format('YYYY-MM-DD hh:mm:ss')}</Text>{'\n'}</Text>
                          <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Closes At: </Text> <Text style={styles.listtextfont}>{moment(LoadCustomer_Location_Maste.closes_at).format('YYYY-MM-DD hh:mm:ss')}</Text>{'\n'}</Text>
                        </Body>
                        <Right>
                          <TouchableOpacity style={{
                            width: wp(7),
                            backgroundColor: this.state.Vendor_sales_no == LoadCustomer_Location_Maste.Vendor_sales_no ? 'green' : this.state.SelectbackgroundColor,
                            borderRadius: 25,
                            height: hp(4),
                            alignItems: "center",
                            justifyContent: "center",
                            // marginTop: 40,
                            marginBottom: 10
                          }} onPress={() => this.SelectOnPress(LoadCustomer_Location_Maste.Vendor_sales_no)}>
                            <Icon name="ios-checkmark-circle-outline" size={25} color={this.state.Vendor_sales_no == LoadCustomer_Location_Maste.Vendor_sales_no ? 'white' : this.state.IconColor} />
                          </TouchableOpacity>
                        </Right>
                      </ListItem>
                    </List>
                  )
                :
                <List>
                  <ListItem>
                    <Body>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Customer Name : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Sales Date  : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Location Id  : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Vendor Name  : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Opens At  : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>Closes At  : </Text></Text>
                      <Text note numberOfLines={1} ><Text style={styles.listtextheaderfont}>No Records Found</Text></Text>
                    </Body>
                  </ListItem>
                </List>
              }
            </Card>
          </View>
        </ScrollView>
        <TouchableOpacity style={{
          width: wp("60%"),
          backgroundColor: "#fb5b5a",
          borderRadius: 25,
          height: hp(5),
          alignItems: "center",
          justifyContent: "center",
        }} onPress={() => this.SaveOnPress()}>
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
Booking.propTypes = {
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
)(Booking);
