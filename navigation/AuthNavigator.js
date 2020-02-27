import React from "react";
import AuthScreen from "../screens/user/AuthScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};
const Stack = createStackNavigator();

function AuthNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
