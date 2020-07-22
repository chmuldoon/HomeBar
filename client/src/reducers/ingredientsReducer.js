import {
  FETCH_USER_LISTS,
  UPDATE_INGREDIENTS,
  LOGOUT,
  WELL
} from "../actions/types";
const initialState = {
  ingredient: null,
  ingredients: null,
  mustHave: null,
  loading: true,
  error: {},
  well: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WELL:
      return {
        ...state,
        loading: false,
        well: payload
      }
    case FETCH_USER_LISTS:
      return {
        ...state,
        ingredients: payload.ingredients,
        mustHave: payload.mustHave,
        loading: false
      }
    case LOGOUT:
      return initialState
    default:
      return state;
  }
};
