import React, { useEffect, useRef, useState, NativeModules } from "react";
import { useSelector } from "react-redux";
// import { NavigationActions } from 'react-navigation';
import { CommonActions } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";

import { localize } from "../internationalization";
import { useNavigation } from '@react-navigation/native';
import StartupScreen from "../screens/StartupScreen";
import RootNavigator from "./MainNavigator";
export const navigationRef = React.createRef();
import { NavigationContainer, NavigationActions } from "@react-navigation/native";


import AuthNavigator from "./AuthNavigator";
import ShopDrawerNavigator from "./ShopDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const NavigationContainer2 = props => {

  const [auth, setAuth] = React.useState(false);
  const isAuth = useSelector(state => state.auth);

  useEffect( ()  => {
    console.log("company");
    const tryLogin = async () => {
      console.log('tryLogintryLogintryLogintryLogin')
      const userData = await AsyncStorage.getItem("userData");
      console.log('444444444444444444444')
      console.log(userData)

      if (!userData) {
        console.log(11111111111111)
        setAuth(false);
      } else {
        console.log(22222222222222)
        setAuth(true);
      }
      console.log('66666666666')
    }
    tryLogin();
    console.log('22222');
    console.log(auth);
    console.log('111111111');

  }, [isAuth]);

  // const navigation = useNavigation();

  const navRef = useRef();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="StartupScreen"
          component={StartupScreen}
        /> */}
        {auth ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Shop"
            component={ShopDrawerNavigator}
          />
        ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={AuthNavigator}
            />
          )}
      </Stack.Navigator>

    </NavigationContainer>

  );

};

export default NavigationContainer2;