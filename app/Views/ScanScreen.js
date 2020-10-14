import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigateTo } from '../Redux/actions';
import { View } from 'native-base';

class ScanScreen extends Component {
  state = {
    qr: null
  };
  onSuccess = e => {
    this.setState({ qr: e.data });
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  render() {
    return (
      <View style={styles.centerText}>
        <View style={{ flex: 1 }}>
          <QRCodeScanner
            onRead={this.onSuccess}
            reactivate={true}
            showMarker={true}
            flashMode={RNCamera.Constants.FlashMode.auto}
            containerStyle={styles.centerText}
          // topContent={
          //   <Text>scan the QR code.</Text>
          // }
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }
          />
        </View>
        <Text>{this.state.qr}</Text>
      </View>
    );
  }
}
ScanScreen.propTypes = {
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
)(ScanScreen);
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});