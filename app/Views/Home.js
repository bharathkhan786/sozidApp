import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  ImageBackground, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../Redux/actions';
const backgroundImage = require('../img/bg_travel.jpeg');

const Home = ({ activeRoute, navigateTo, loginctx }) => (
  <ImageBackground
    source={backgroundImage}
    style={styles.container}
    imageStyle={{ opacity: 0.3 }}
  >
    <ScrollView contentContainerStyle={styles.view}>
      <Image source={require('../img/200px-logo.png')} />
      {/* <Text >Sozid_security_no :{loginctx.Sozid_security_no}</Text>
      <Text >Login_no:{loginctx.Login_no} </Text>
      <Text >Userid:{loginctx.Userid}</Text>
      <Text >Username:{loginctx.Username}</Text>
      <Text >Pub/Customer:{loginctx.Sozid_publc_Customer_registration_no}</Text>
      <Text >FirstName:{loginctx.FirstName}</Text>
      <Text >LastName:{loginctx.LastName}</Text>
      <Text >Mobile:{loginctx.Mobile}</Text>
      <Text >EmailId:{loginctx.EmailId}</Text>
      <Text style={styles.header1}>{activeRoute.name}</Text> */}
      <Text style={styles.text}>
        Welcome to Krish It ...
          </Text>
      {/* <Button
        title="Vendor"
        style={styles.button}
        onPress={() => { navigateTo('Vendor'); }}
      /> */}
    </ScrollView>
  </ImageBackground>
);

Home.propTypes = {
  activeRoute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen: PropTypes.any.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
  loginctx: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#ECEFF1',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  header1: {
    fontSize: 28,
    marginBottom: '30%',
  },
  text: {
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: '10%',
  },
});

const mapStateToProps = state => ({
  activeRoute: state.routes.activeRoute,
  loginctx: state.loginctx,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => { dispatch(navigateTo(routeName)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

