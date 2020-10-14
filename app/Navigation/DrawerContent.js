import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, Image
} from "react-native";
import {
  bgDrawerHeader,
  drawerLogoColor,
  drawerInactiveItemColor,
  bgDrawerInactiveItem,
  bgDrawerActiveItem,
  drawerHeaderColor
} from "../global.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigateTo } from "../Redux/actions";

function getUnique(arr, comp) {

  // store the comparison  values in array
  const unique = arr.map(e => e[comp])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);

  return unique;
}
const DrawerContent = ({ navigateTo, activeRoute, routes, closeDrawer, loginctx }) => (
  <ScrollView>
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        {/* <Icon name="airplane-takeoff" size={50} color={drawerLogoColor} /> */}
        <Image source={require('../img/logo.png')} height={50} width={50} />
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.drawerTitle}>{loginctx.Userid}</Text>
        <Text style={styles.drawerEmail}>{loginctx.Username} , {loginctx.FirstName} {loginctx.LastName} </Text>
        <Text style={styles.drawerEmail}>{loginctx.Mobile} , {loginctx.EmailId}</Text>
      </View>
    </View>
    {routes.map(route => (
      <TouchableOpacity
        key={route.screen}
        onPress={() => {
          closeDrawer();
          navigateTo(route.name);
        }}
        style={
          activeRoute.name === route.name
            ? [styles.drawerItem, styles.activeDrawerItem]
            : styles.drawerItem
        }
      >
        {route.icon && (
          <View style={styles.drawerItemLogo}>
            <Icon
              name={route.icon}
              size={30}
              color={activeRoute.name === route.name ? "#fff" : "#000"}
            />
          </View>
        )}
        <Text
          style={
            activeRoute.name === route.name
              ? { color: "#fff" }
              : { color: "#000" }
          }
        >
          {route.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

DrawerContent.propTypes = {
  activeRoute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen: PropTypes.any.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigateTo: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  loginctx: PropTypes.object
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingTop: 40, // 24dp (Space for the translucent StatusBar) plus 16dp Android Header paddingTop
    paddingLeft: 16,
    height: 170,
    backgroundColor: bgDrawerHeader
  },
  headerLogo: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  subTitle: {
    height: 56,
    paddingTop: 8
  },
  drawerTitle: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14
  },
  drawerEmail: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14
  },
  activeDrawerItem: {
    backgroundColor: bgDrawerActiveItem
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: bgDrawerInactiveItem,
    color: drawerInactiveItemColor,
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#fff"
  },
  drawerItemLogo: {
    paddingRight: 16
  }
});
function getFilter(arr, loginctx) {
  let unique_ = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type == 'H') {
      unique_.push(arr[i]);
    } else {
      if (arr[i].type == loginctx.Userid) {
        unique_.push(arr[i]);
      }
    }
  }
  return unique_;
}
const mapStateToProps = (state, ownProps) => ({
  routes: getFilter(getUnique(state.routes.routes, 'id'), state.loginctx),
  activeRoute: state.routes.activeRoute,
  closeDrawer: ownProps.closeDrawer,
  loginctx: state.loginctx,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => {
    dispatch(navigateTo(routeName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);
