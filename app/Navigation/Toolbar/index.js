import React, { Component } from "react";
import {
  View, StyleSheet, Text, Button, ToastAndroid, Platform,
  AlertIOS, Dimensions, Modal
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import ToolbarAndroid from '@react-native-community/toolbar-android';
import Iconscanner from "react-native-vector-icons/MaterialIcons";
import { goBack, navigateTo, setActiveRoute } from "../../Redux/actions";
import { bgHeader } from "../../global.styles";
import SozidUrl from '../../SozidUrl';
//import NetConnection from '../../Views/NetConnection';
import ScanScreen from '../../Views/ScanScreen';

export class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }
  static propTypes = {
    activeRoute: PropTypes.shape({
      name: PropTypes.string,
      screen: PropTypes.any,
      icon: PropTypes.string
    }),
    routes: PropTypes.arrayOf(PropTypes.object),
    showMenu: PropTypes.func,
    goBack: PropTypes.func,
    navigateTo: PropTypes.func,
    loginctx: PropTypes.object
  };
  onpressscanner = () => {
    // <ScanScreen />
    this.setState({ showModal: true });
  }
  scannerclose = () => {
    this.setState({ showModal: false });
  }
  onActionSelected = position => {
    const { navigateTo } = this.props;
    if (position === 0) {
      if (this.props.NetConnectionVal == "Online") {
        let basectx = { Login_no: this.props.loginctx.Login_no }
        return fetch(SozidUrl.SozidUrl + '/api/Values/Logout', {
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
              if (res_val.Message == "You have been successfully logged out!") {
                // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
                // this.props.dispatch(LoadLoginctxSuccess(res_val.return_data));
                this.props.navigation("Login");
                this.props.setActiveRoute("Home");
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
                // ToastAndroid.show(res_val.Message, ToastAndroid.SHORT);
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
  };
  render() {
    const { showMenu, goBack, activeRoute, routes } = this.props;

    return (
      <>
        <View style={styles.header}>
          <View style={{ width: Dimensions.get('screen').width - 50 }}>
            <Icon.ToolbarAndroid
              key={activeRoute.name}
              navIconName={
                activeRoute.name === routes[0].name ? "menu" : "arrow-left"
              }
              titleColor="#fff"
              title={activeRoute.name}
              onIconClicked={
                activeRoute.name === routes[0].name ? showMenu : goBack
              }
              overflowIconName="dots-vertical"
              style={{ height: 56 }}
              actions={[
                { title: "Logout", show: "never", iconName: "logout" }
              ]}
              onActionSelected={this.onActionSelected}
            />
          </View>
          <View style={{ paddingTop: 17, }}>
            <Icon name="qrcode-scan" color="white" size={20} onPress={this.onpressscanner} />
          </View>
          <View>
            <Modal
              animationType={"fade"}//{"none"}//{"slide"}//{"fade"}
              transparent={false}
              visible={this.state.showModal}
              onRequestClose={() => { console.log("Modal has been closed.") }}>
              <Button title="Back" onPress={this.scannerclose} />
              <Text>Scan the QR code.</Text>
              <View paddingVertical={3} />
              <ScanScreen />
              <View paddingVertical={3} />
              <View paddingVertical={3} />
            </Modal>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    backgroundColor: bgHeader,
    height: 80, // 56dp AppBar height plus 24dp correction for the StatusBar translucent
    paddingTop: 24, // StatusBar's height
    // width: 50
    flexDirection: 'row'
  }
});
export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const mapStateToProps = (state, ownProps) => ({
  activeRoute: state.routes.activeRoute,
  routes: state.routes.routes,
  showMenu: ownProps.showMenu,
  goBack: ownProps.goBack,
  loginctx: state.loginctx,
  setActiveRoute: ownProps.setActiveRoute,
  NetConnectionVal: state.NetConnectionVal

});

const mapDispatchToProps = dispatch => ({
  goBack: () => {
    dispatch(goBack());
  },
  navigateTo: routeName => {
    dispatch(navigateTo(routeName));
  },
  setActiveRoute: activeRouteName => {
    dispatch(setActiveRoute(activeRouteName));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
