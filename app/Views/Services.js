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

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        // const { navigation } = this.props;
        // //for refreshing grid by clicking goback
        // this.focusListener = navigation.addListener('didFocus', () => {
        //     this.Loaddata();
        // });
    }

    componentWillUnmount() {
        // this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.container2}>
                <Text style={{ color: 'white' }}>Services</Text>
                <ScrollView>
                    <Text style={{ color: 'white' }}>Terms and Policy</Text>
                </ScrollView>
            </View>
        );
    }
}
Services.propTypes = {
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
    loginctx: state.loginctx
});
const mapDispatchToProps = dispatch => ({
    navigateTo: routeName => { dispatch(navigateTo(routeName)); },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
