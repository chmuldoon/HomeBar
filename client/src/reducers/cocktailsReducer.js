import {
  FETCH_COCKTAIL, USER_COCKTAILS
} from "../actions/types"

const initialState = {
  cocktail: null,
  cocktails: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_COCKTAILS:
      debugger
      return {
        ...state,
        cocktails: payload,
        loading: false
      };
  
    default:
      return state;
  }
}