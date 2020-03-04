import React from "react";
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import defaultNavOptions from "../constants/defaultNavOptions";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const AuthNavigator = props => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
