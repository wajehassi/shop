export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORY = "SET_CATEGORY";
import Product from "../../models/product";
import Category from "../../models/category";

const BaseURL = "http://demo10.optimal.ps/ecom/api";
const StorageURL = "http://demo10.optimal.ps/ecom/storage/";

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    // const userId = getState().auth.userId;
    try {
      const response = await fetch(BaseURL + "/category");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const categories = resData.categories;
      const loadedCategories = [];

      categories.forEach(element => {
        loadedCategories.push(
          new Category(
            element.id,
            element.name,
            element.name_ar,
            element.description,
            element.description_ar,
            StorageURL + element.cover
          )
        );
      });
      dispatch({
        type: SET_CATEGORIES,
        categories: loadedCategories
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchCategory = id => {
  return async (dispatch, getState) => {
    // any async code you want!
    // const userId = getState().auth.userId;
    try {
      const response = await fetch(BaseURL + "/category/" + id);

      if (!response.ok) {
        console.log("error");
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const categoryData = resData.category;
      const categoryProducts = resData.products;
      const categoryChildren = resData.categories;

      const loadedCategoryProducts = [];
      try {
        categoryProducts.forEach(element => {
          loadedCategoryProducts.push(
            new Product(
              element.id,
              // "u1",
              element.name,
              StorageURL + element.cover,
              element.description,
              parseFloat(element.price)
            )
          );
        });
      } catch (error) {
        console.log(error.message);
      }
      category = new Category(
        categoryData.id,
        categoryData.name,
        categoryData.name_ar,
        categoryData.description,
        categoryData.description_ar,
        StorageURL + categoryData.cover
      );

      dispatch({
        type: SET_CATEGORY,
        categoryProducts: loadedCategoryProducts,
        category: category
      });
    } catch (err) {
      throw err;
    }
  };
};
