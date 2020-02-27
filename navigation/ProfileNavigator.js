import React from "react";
import UserProfileScreen from "../screens/user/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

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

const ProfileNavigator = props => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTitle: "Profile",
          headerLeft:()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  props.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
