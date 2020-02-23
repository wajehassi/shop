import React, { useEffect ,useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import AdminNavigator from "./AdminNavigator";
import AuthNavigator from "./AuthNavigator";
import ShopDrawerNavigator from "./ShopDrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationActions } from "@react-navigation/native";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";


const Stack = createStackNavigator();
const RootNavigator = props => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async (props) => {
    console.log(props);

    const tryLogin = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("userData");
      setIsLoading(false);

      if (!userData) {
        setAuth(false);
      } else {
        setAuth(true);
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          setAuth(false);
          props.navigation.navigate("Auth");
        } else {
          setAuth(true);
          props.navigation.navigate("Shop");
        }
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authActions.authenticate(userId, token, expirationTime));
      }

    };
    
    await tryLogin();
  }, [dispatch]);



  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default RootNavigator;
