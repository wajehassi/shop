// import Product from '../../models/product';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    // const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'http://demo10.optimal.ps/ecom/api/category'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const categories = [];

        // console.log(resData);
    //   for (const key in resData) {
    //     loadedProducts.push(
    //       new Product(
    //         key,
    //         resData[key].ownerId,
    //         resData[key].title,
    //         resData[key].imageUrl,
    //         resData[key].description,
    //         resData[key].price
    //       )
    //     );
    //   }

      dispatch({
        type: SET_CATEGORIES,
        categories: categories,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};



