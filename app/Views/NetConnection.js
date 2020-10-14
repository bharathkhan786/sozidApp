import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Platform,
    AlertIOS, ScrollView, Dimensions
} from 'react-native';
import styles from '../style';
import * as NetInfo from '@react-native-community/netinfo';
import { LoadNetConnectionSuccess } from "../../app/Redux/actions";
import { connect } from "react-redux";

class NetConnection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connection_Status: null
        }
    }
    componentDidMount() {
        NetInfo.addEventListener(this.handleConnectivityChange);

        NetInfo.fetch().then((state) => {
            if (state.isConnected == true) {
                this.setState({ connection_Status: "Online" })
                this.props.dispatch(LoadNetConnectionSuccess("Online"));
            }
            else {
                this.setState({ connection_Status: "Offline" })
                this.props.dispatch(LoadNetConnectionSuccess("Offline"));

            }
        });
    }

    componentWillUnmount() {
        // NetInfo.removeEventListener(this.handleConnectivityChange);
    }
    handleConnectivityChange = (state) => {
        // console.log('isConnected', isConnected);
        if (state.isConnected == true) {
            this.setState({ connection_Status: "Online" })
            this.props.dispatch(LoadNetConnectionSuccess("Online"));
        }
        else {
            this.setState({ connection_Status: "Offline" })
            this.props.dispatch(LoadNetConnectionSuccess("Offline"));
        }
    }

    render() {
        return (
            <View style={{ position: 'absolute', top: 30 }} >{this.state.connection_Status == "Offline" ? <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width, height: (Dimensions.get('screen').width) / 4 * 0.25 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Connection Failed,Internet connection required</Text></View> : null}</View>
        );
    }
}

// export default NetConnection;
const mapStateToProps = (state, ownProps) => ({
    loginctx: state.loginctx,
    NetConnectionVal: state.NetConnectionVal
});
export default connect(
    mapStateToProps
    // mapDispatchToProps
)(NetConnection);
