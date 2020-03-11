// import PRODUCTS from '../../data/dummy-data';
import { SET_CATEGORIES, SET_CATEGORY } from "../actions/categories.js";
// import Product from '../../models/product';

const initialState = {
  availableCategories: [],
  categoryProducts: [],
  category: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        availableCategories: action.categories
      };
    case SET_CATEGORY:
      return {
        ...state,
        categoryProducts: action.categoryProducts,
        category: action.category
      };
  }
  return state;
};
