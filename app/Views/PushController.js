import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import {
  Platform
} from 'react-native';
export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
      popInitialNotification: true,
      senderID: "373460443899"
    });
  }

  render() {
    return null;
  }
}