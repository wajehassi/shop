import React, { useEffect, useRef, useState, NativeModules } from "react";
import { useSelector,useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import * as authActions from "../store/actions/auth";
import { localize } from "../internationalization";
import { useNavigation } from "@react-navigation/native";
import StartupScreen from "../screens/StartupScreen";
import RootNavigator from "./MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ShopDrawerNavigator from "./ShopDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const NavigationContainer2 = props => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(false);
  const isAuth = useSelector(state => state.auth);
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        setAuth(false);
      } else {
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);
        if (expirationDate <= new Date() || !token || !userId) {
          setAuth(false);
        } else {
          const expirationTime =
            expirationDate.getTime() - new Date().getTime();
          setAuth(true);
          dispatch(authActions.authenticate(userId, token, expirationTime));
        }
      }
    };
    tryLogin();
  }, [isAuth]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
