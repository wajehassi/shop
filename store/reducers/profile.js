import { SET_USER } from '../actions/profile';

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
