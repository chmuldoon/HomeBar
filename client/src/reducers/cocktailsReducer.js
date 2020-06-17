import {
  FETCH_COCKTAIL, REMOVE_FAVORITE,USER_FAVORITES, USER_COCKTAILS, ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_MUST_HAVE, REMOVE_MUST_HAVE, SIMILAR_COCKTAILS, RESET_COCKTAILS
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
    case ADD_MUST_HAVE:
    case REMOVE_FAVORITE:
    case SIMILAR_COCKTAILS:
    case USER_COCKTAILS:
    case REMOVE_MUST_HAVE:
    case USER_FAVORITES:
    case REMOVE_INGREDIENT:
      return {
        ...state,
        cocktails: payload,
        loading: false,
      };
    case FETCH_COCKTAIL:
      return {
        ...state,
        cocktail: payload,
        loading: false
      }
    case RESET_COCKTAILS:
      return initialState

    default:
      return state;
  }
}