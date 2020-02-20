import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as profileActions from "../../store/actions/profile";

const ProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userData = useSelector(state => state.profile.user);
  const dispatch = useDispatch();

  const loadProfile = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(profileActions.fetchUser());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProfile().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfile]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProfile}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && userData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No User Data</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.centered}>
        <Text>{userData.id ? userData.id : '-'}</Text>
        <Text>{userData.name ? userData.name : '-'}</Text>
        <Text>{userData.email ? userData.email : '-'}</Text>
        <Text>{userData.status ? userData.status : '-'}</Text>
        <Text>{userData.date_of_birth ? userData.date_of_birth : '-'}</Text>
        <Text>{userData.email ? userData.cover : '-'}</Text>
      </View>
    </ScrollView>
  );
};
ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: "Profile",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Add"
    //       iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
    //       onPress={() => {
    //         navData.navigation.navigate('EditProduct');
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  } ,
  text : {
    paddingVertical: 20,
  }
});

export default ProfileScreen;
