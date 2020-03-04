import React from "react";
import OrdersScreen, {
  screenOptions as ordersScreenOptions
} from '../screens/shop/OrdersScreen';
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import defaultNavOptions from "../constants/defaultNavOptions";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const Stack = createStackNavigator();
const OrdersNavigator = props => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
