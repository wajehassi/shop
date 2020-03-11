import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import * as categoryActions from "../../store/actions/categories";
import Colors from "../../constants/Colors";

const CategoryScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  //   const products = useSelector(state =>
  //     state.products.availableProducts.filter(
  //       prod => prod.categoryId == categoryId
  //     )
  //   );
  const categoryId = props.route.params.categoryId;
  //   console.log(categoryId);
  const category = useSelector(state =>
    state.categories.availableCategories.find(cat => cat.id === categoryId)
  );
  const products = useSelector(state => state.categories.categoryProducts);
  const dispatch = useDispatch();

  const loadCategory = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(categoryActions.fetchCategory(categoryId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadCategory);
    return;
    return () => {
      willFocusSub.remove();
    };
  }, [loadCategory]);

  useEffect(() => {
    setIsLoading(true);
    loadCategory().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategory]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadCategory}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading && !category) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  //   if (!isLoading && products.length === 0) {
  //     return (
  //       <View style={styles.centered}>
  //         <Text>No products found. Maybe start adding some!</Text>
  //       </View>
  //     );
  //   }

  return (  
      <FlatList
        onRefresh={loadCategory}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
          ListHeaderComponent={
              <>
      <Image style={styles.image} source={{ uri: category.imageUrl }} />
      <Text style={styles.price}>{category.nameEn}</Text>
      <Text style={styles.description}>{category.descriptionEn}</Text>
      </>
               }
      />
  );
};

export const screenOptions = navData => {
  return {
          headerTitle: navData.route.params.categoryTitle,

    // headerTitle: navData.route.params.productTitle,
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
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

// const styles = StyleSheet.create({
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" }
// });
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export default CategoryScreen;
