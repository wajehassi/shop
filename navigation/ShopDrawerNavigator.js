import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator
} from "@react-navigation/drawer";

import { Platform, Button, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
      <Drawer.Screen name="Products" component={ProductsNavigatorStack} />
      <Drawer.Screen name="Orders" component={OrdersNavigatorStack} />
      <Drawer.Screen name="Admin" component={AdminNavigatorStack} />
      <Drawer.Screen name="Profile" component={ProfileNavigatorStack} />
    </Drawer.Navigator>
  );
}

export default ShopDrawerNavigator;
