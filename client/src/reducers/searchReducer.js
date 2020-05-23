import { SEARCH_ITEMS } from "../actions/types";

const initialState = {
  searchItems: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        searchItems: payload,
        loading: false,
      };

    default:
      return state;
  }
};
