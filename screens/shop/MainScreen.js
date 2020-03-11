import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CategoryItem from "../../components/shop/CategoryItem";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import * as categoryActions from "../../store/actions/categories";
import Colors from "../../constants/Colors";

const MainScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const categories = useSelector(state => state.categories.availableCategories);
  // console.log(categories);
  const dispatch = useDispatch();

  const loadMainPage = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
      await dispatch(categoryActions.fetchCategories());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadMainPage);
    return;
    return () => {
      willFocusSub.remove();
    };
  }, [loadMainPage]);

  useEffect(() => {
    setIsLoading(true);
    loadMainPage().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadMainPage]);

  const selectItemHandler = (id, title) => {
    // console.log(title);
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };
   const selectCategoryHandler = (id, title) => {
    // console.log(title);
    //       console.log(id);

    props.navigation.navigate("CategoryDetail", {
      categoryId: id,
      categoryTitle: title
    });
  };
  

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadMainPage}
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

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
        // <FlatList
        //   onRefresh={loadMainPage}
        //   refreshing={isRefreshing}
        //   data={products}
        //   keyExtractor={item => item.id.toString()}
        //   renderItem={itemData => (
        //     <ProductItem
        //       image={itemData.item.imageUrl}
        //       title={itemData.item.title}
        //       price={itemData.item.price}
        //       onSelect={() => {
        //         selectItemHandler(itemData.item.id, itemData.item.title);
        //       }}
        //     >
        //       <Button
        //         color={Colors.primary}
        //         title="View Details"
        //         onPress={() => {
        //           selectItemHandler(itemData.item.id, itemData.item.title);
        //         }}
        //       />
        //       <Button
        //         color={Colors.primary}
        //         title="To Cart"
        //         onPress={() => {
        //           dispatch(cartActions.addToCart(itemData.item));
        //         }}
        //       />
        //     </ProductItem>
        //   )}
        // />
        <FlatList
          onRefresh={loadMainPage}
          refreshing={isRefreshing}
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
            <CategoryItem
              image={itemData.item.imageUrl}
              title={itemData.item.nameEn}
              description={itemData.item.descriptionEn}
              onSelect={() => {
                selectCategoryHandler(itemData.item.id, itemData.item.nameEn);
              }}
            >
              <Button
                color={Colors.primary}
                title="View"
                onPress={() => {
                  selectCategoryHandler(itemData.item.id, itemData.item.nameEn);
                }}
              />
            </CategoryItem>
          )}
        />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: "Categories",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default MainScreen;
