/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import LoginScreen from './app/Views/Login';
import SignupScreen from './app/Views/Signup';
import ForgotPwdScreen from './app/Views/ForgotPwd';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { name as appName } from './app.json';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './app/Redux/reducers';
import React, { Component } from 'react';

let store = createStore(reducer);

const navigationOption = ({ navigation }) => ({

    headerBackTitle: ' ',
    headerBackTitleVisible: true,
    headerStyle: {
        backgroundColor: '#4e91bd',
        shadowOpacity: 0.25,
        shadowOffset: {
            height: 1,
        },
        shadowRadius: 5,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontSize: 18,
        fontWeight: '500',
    },
});
// const LandingNavigation = createStackNavigator({

//     Login: {
//         screen: LoginScreen,

//         navigationOptions: navigationOption
//         // uncomment this if you don't want Navigation Bar on Login page.
//         // navigationOptions: ({ navigation }) => ({ 
//         //   header: null
//         // })
//     },

//     Root:
//     {
//         screen: App,
//         navigationOptions: ({ navigation, props }) => ({
//             header: null
//         })
//     },
// });

// const MyApp = createAppContainer(LandingNavigation);
const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen,

            navigationOptions: navigationOption
            // uncomment this if you don't want Navigation Bar on Login page.
            // navigationOptions: ({ navigation }) => ({ 
            //   header: null
            // })
        },
        Signup: {
            screen: SignupScreen
        },
        ForgotPwd: {
            screen: ForgotPwdScreen
        },
        Root:
        {
            screen: App,
            navigationOptions: ({ navigation, props }) => ({
                header: null
            })
        },
    },
    {
        initialRouteName: 'Login'
    }
)


const AppContainer = createAppContainer(SwitchNavigator)
const DemoApp = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
)

AppRegistry.registerComponent(appName, () => DemoApp);
