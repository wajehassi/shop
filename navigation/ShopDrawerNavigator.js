import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator
} from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

import { Platform, Button, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { ReactElement } from "react";
import OrdersNavigatorStack from "./OrdersNavigator";
import ProductsNavigatorStack from "./ProductsNavigator";
import AdminNavigatorStack from "./AdminNavigator";
import ProfileNavigatorStack from "./ProfileNavigator";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const Drawer = createDrawerNavigator();

function ShopDrawerNavigator(): ReactElement {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigatorStack}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigatorStack}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.tintColor}
            />
          ) ,
          headerTitle: 'Your Orders',
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigatorStack}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigatorStack}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default ShopDrawerNavigator;
