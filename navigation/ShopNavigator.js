import React from "react";
// import {
// createStackNavigator,
// createDrawerNavigator,
//   createSwitchNavigator,
//   createAppContainer,
//   DrawerItems
// } from '@react-navigation';
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Platform, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import UserProfileScreen from "../screens/user/ProfileScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { navigationRef } from './NavigationContainer2';

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

const ProductsNavigator = createStackNavigator();

function ProductsNavigatorStack() {
  return (
    <ProductsNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsNavigator.Navigator>
  );
}


// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const OrdersNavigator = createStackNavigator();

function OrdersNavigatorStack() {
  return (
    <OrdersNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersNavigator.Screen name="Orders" component={OrdersScreen} />
    </OrdersNavigator.Navigator>
  );
}
// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const AdminNavigator = createStackNavigator();

function AdminNavigatorStack() {
  return (
    <AdminNavigator.Navigator>
      <AdminNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
      />
      <AdminNavigator.Screen name="EditProduct" component={EditProductScreen} />
    </AdminNavigator.Navigator>
  );
}

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const ProfileNavigator = createStackNavigator();

function ProfileNavigatorStack() {
  return (
    <ProfileNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileNavigator.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />
    </ProfileNavigator.Navigator>
  );
}

// const ProfileNavigator = createStackNavigator(
//   {
//     UserProfile: UserProfileScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const ShopNavigator = createDrawerNavigator();

const ShopDrawerNavigator = () => { 
          const dispatch = useDispatch();

  return (
    <ShopNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }} screenOptions={defaultNavOptions}
      drawerContent={ props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                  <DrawerItemList {...props} />
    {/* <DrawerItem
        label="Logout"
        onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
      />          */}
           <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopNavigator.Screen name="Products" component={ProductsNavigatorStack} />
      <ShopNavigator.Screen name="Orders" component={OrdersNavigatorStack} />
      <ShopNavigator.Screen name="Admin" component={AdminNavigatorStack} />
      <ShopNavigator.Screen name="Profile" component={ProfileNavigatorStack} />
    </ShopNavigator.Navigator>
  );
};
// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//     Profile: ProfileNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout());
//                 // props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

const AuthNavigator = createStackNavigator();

function AuthNavigatorStack() {
  return (
    <AuthNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthNavigator.Navigator>
  );
}
// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

const AuthStack = createStackNavigator();

function MainNavigator() {
//     const isAuth = useSelector(state => !!state.auth.token);
// useEffect(() => {
//     console.log(isAuth);
//     console.log(localize("company"));
//     console.log("company");

//     if (!isAuth) {
//       console.log("not auth");
//       navigationRef.current?.dispatch(
//         CommonActions.navigate({ name: "Auth" })
//       );
//     }
//   }, [isAuth]);

  return (
    <NavigationContainer>
      {/* <AuthStack.Navigator> */}
        {/* <> */}
          {/* <AuthStack.Screen name="Shop" component={ShopDrawerNavigator} /> */}
          {/* <AuthStack.Screen name="Startup" component={StartupScreen} />
          <AuthStack.Screen name="Auth" component={AuthNavigatorStack} />
        </> */}
      {/* </AuthStack.Navigator> */}
      
            <StartupScreen />

    </NavigationContainer>
  );
}
// export default function App() {
//   return <NavigationContainer>{MainNavigator}</NavigationContainer>
// }
// export default createAppContainer(MainNavigator);

export default MainNavigator;
