import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
const BaseURL = 'http://demo10.optimal.ps/ecom/api' ;

export const fetchOrders = () => {
  return async (dispatch, getState) => {
     const token = getState().auth.token;

    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        BaseURL + `/orders`,
                {
        method: 'GET',
        headers: {
          'Accept': 'application/json' ,
          'X-Access-Token' : 'Bearer'+' '+token
        }
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const respData = await response.json();
            console.log('orders');

      // console.log(respData.orders.data);
      const resData = respData.orders.data ;
      const loadedOrders = [];
// console.log(resData);
resData.forEach(element =>{
    // console.log(new Date(Date.now()));

  // console.log(element.id);
        loadedOrders.push(
          new Order(
            element.id,
            element.order_products,
            element.total_products,
            new Date(Date.now())
          )
        );
} );
console.log(loadedOrders);
      for (const key in resData) {
        // console.log(key.id);
        // loadedOrders.push(
        //   new Order(
        //     key,
        //     resData[key].cartItems,
        //     resData[key].totalAmount,
        //     new Date(resData[key].date)
        //   )
        // );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
