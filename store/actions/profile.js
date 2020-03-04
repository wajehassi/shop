export const SET_USER = 'SET_USER';
const BaseURL = 'http://demo10.optimal.ps/ecom/api' ;

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        BaseURL+`/profile` ,
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
      const resData = await response.json();
        console.log(resData);
      dispatch({ type: SET_USER, user: resData });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
