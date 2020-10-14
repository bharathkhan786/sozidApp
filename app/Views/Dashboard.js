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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// const styless = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: 400,
//         width: 400,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_lables: [],
            data_Price: [],
            data_count: [],
        }
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
                Userid: this.props.loginctx.Userid, Type: 'G', tableName: 'Subscription_type_Txn',
                obj: {}
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
                            let PreLoadData = res_val.return_data;
                            let labels = [];
                            let data = [];
                            let data_c = [];
                            if (PreLoadData.length == 0) {
                                labels.push("empty");
                                data.push(0);
                                data_c.push(0);
                            }
                            for (var property in PreLoadData) {
                                if (PreLoadData.hasOwnProperty(property)) {
                                    labels.push(PreLoadData[property].y + '/' + PreLoadData[property].m);
                                    data.push(PreLoadData[property].p);
                                    data_c.push(PreLoadData[property].c);
                                }
                            }
                            this.setState({ data_lables: labels });
                            this.setState({ data_Price: data });
                            this.setState({ data_count: data_c });

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
        // this.focusListener = navigation.addListener('didFocus', () => {
        this.Loaddata();
        // });
    }

    componentWillUnmount() {
        // this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.containersignup}>
                <View paddingVertical={2} />
                <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>Total Amount Per Month</Text>
                <View paddingVertical={2} />
                <LineChart
                    data={{
                        labels: this.state.data_lables.length == 0 ? [""] : this.state.data_lables,//["January", "February", "March", "April", "May", "June"],
                        datasets:
                            [
                                {
                                    data: this.state.data_Price.length == 0 ? [0] : this.state.data_Price,//[20, 30, 40, 50, 60, 70],
                                    // color: (opacity = 1) => 'rgba(0, 143, 255, 1)',
                                    // strokeWidth: 2 // optional
                                }
                                // {
                                //     data: [10, 25, 35, 45, 55, 65],
                                //     color: (opacity = 1) => 'rgba(0, 255, 255, 1)',
                                //     strokeWidth: 2 // optional
                                // }
                            ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="Rs"
                    //  yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    fromZero={true}
                    chartConfig={{
                        backgroundColor: '#0091EA',
                        backgroundGradientFrom: '#0091EA',
                        backgroundGradientTo: '#0091EA',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    // verticalLabelRotation={10}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                {/* <View style={styless.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styless.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                    </MapView>
                </View> */}
            </View>
        );
    }
}
Dashboard.propTypes = {
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
)(Dashboard);
