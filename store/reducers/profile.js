import { SET_USER } from '../actions/profile';
// import Order from '../../models/order';

const initialState = {
  user: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.user
      };
  }
  return state;
};
