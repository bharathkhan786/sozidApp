// const React = require("react-native");
import {
  View,
  Button, Text,
  TextInput,
  StyleSheet, TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
// import Activity from './Views/Activity';
// const { StyleSheet } = React;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontWeight: 'bold'
  },
});

export default {
  pickerSelectStyles: StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
      fontWeight: 'bold'
    },
  }),
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    paddingHorizontal: 70,
    paddingTop: 20,
    paddingBottom: 10,
  },
  container2: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  containersignup: {
    flex: 1,
    backgroundColor: '#003f5c',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  forgotpwdlogo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40
  },
  signuplogo: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#fb5b5a",
    // marginBottom: 20,
    // paddingBottom: 10,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: (Dimensions.get('window').width / 4)
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputViewfrom: {
    width: "100%",
    backgroundColor: "#465881",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    // justifyContent: "center",
    // padding: 20
  },
  inputViewby2: {
    width: "90%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputView2: {
    width: "100%",
    // backgroundColor: "#465881",
    // borderRadius: 25,
    // height: 50,
    marginBottom: 20,
    // justifyContent: "center",
    paddingLeft: 40
  },
  inputViewSplit: {
    width: "40%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputViewSplitby2: {
    width: "45%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  EditDeleteBtn: {
    width: 50,
    backgroundColor: "#C0C0C0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    marginBottom: 10
  },
  AddBtn: {
    width: "20%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signBtn: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 15
  },
  backBtn: {
    width: "15%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  loginText: {
    color: "white"
  },
  viewSplit: {
    justifyContent: 'space-around'
  },
  header: {
    backgroundColor: '#455A64',
    height: 50, // 56dp AppBar height plus 24dp correction for the StatusBar translucent
    paddingTop: 4 // StatusBar's height
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
  scrollContentContainer: {
    paddingTop: 1,
    paddingBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    // backgroundColor: this.props.disabled == true ? '#edf1f2' : null,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  listtextheaderfont: {
    color: '#F0FFF0',
    fontStyle: 'normal',
    fontWeight: 'bold'
  },
  listtextfont: {
    color: '#DDA0DD',
    fontStyle: 'normal',
    fontWeight: 'bold'
  },
  Cardstyle: {
    backgroundColor: '#003f5c'
  },
  activitystyle: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    paddingStart: 30
  },
  startbtn: {
    width: "45%",
    backgroundColor: "#008000",
    borderRadius: 25,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'space-between',
    // marginTop: 40,
    //marginBottom: 10,
    marginHorizontal: 3,
    marginVertical: 2
  },
  preclosebtn: {
    width: "45%",
    backgroundColor: "#FF0000",
    borderRadius: 25,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'space-between',
    //marginBottom: 10,
    marginHorizontal: 3,
    marginVertical: 2
  },
  closebtn: {
    width: "45%",
    backgroundColor: "#FF6347",
    borderRadius: 25,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'space-between',
    //marginBottom: 10,
    marginHorizontal: 3,
    marginVertical: 2
  },
  nextbtn: {
    width: "45%",
    backgroundColor: "#0000FF",
    borderRadius: 25,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'space-between',
    //marginBottom: 10,
    marginHorizontal: 3,
    marginVertical: 2
  }
};