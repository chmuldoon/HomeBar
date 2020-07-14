import { SEARCH_ITEMS, LOGOUT } from "../actions/types";

const initialState = {
  ingredients: null,
  cocktails: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        ingredients: payload.ingredients,
        cocktails: payload.cocktails,
        loading: false,
      };
    case LOGOUT:
      return initialState
    default:
      return state;
  }
};
