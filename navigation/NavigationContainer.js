import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import { NavigationActions } from 'react-navigation';
import { CommonActions } from "@react-navigation/native";

import ShopNavigator from "./ShopNavigator";
import { localize } from "../internationalization";
import { useNavigation } from '@react-navigation/native';
import StartupScreen from "../screens/StartupScreen";
import RootNavigator  from "./MainNavigator";
export const navigationRef = React.createRef();

const NavigationContainer = props => {
    // const navigation = useNavigation();

  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);
  console.log(isAuth);
  useEffect(() => {
    console.log(isAuth);
    console.log(localize("company"));
    console.log("company");

    if (!isAuth) {
      console.log("not auth");
      navigationRef.current?.dispatch(
        CommonActions.navigate({ name: "Auth" })
      );
    }
  }, [isAuth]);

  return <RootNavigator  />;
};

export default NavigationContainer;
