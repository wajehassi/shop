// import PRODUCTS from '../../data/dummy-data';
import {
  SET_CATEGORIES
} from '../actions/category.js';
// import Product from '../../models/product';

const initialState = {
  availableCategories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        availableCategories: action.categories,
      };
  }
  return state;
};
