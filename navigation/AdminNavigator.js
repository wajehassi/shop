import React from "react";
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions
} from '../screens/user/EditProductScreen';
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import defaultNavOptions from "../constants/defaultNavOptions";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const Stack = createStackNavigator();

const AdminNavigator = props => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default AdminNavigator;
