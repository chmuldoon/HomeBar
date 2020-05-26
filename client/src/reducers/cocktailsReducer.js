import {
  FETCH_COCKTAIL, USER_COCKTAILS, ADD_INGREDIENT, REMOVE_INGREDIENT
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
    case ADD_INGREDIENT:
    case USER_COCKTAILS:
    case REMOVE_INGREDIENT:
    
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