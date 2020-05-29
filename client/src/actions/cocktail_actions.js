import axios from "axios";

import { FETCH_COCKTAIL, USER_COCKTAILS } from "../actions/types";

export const getUserCocktails = () => async dispatch => {
  try {
    debugger
    const res = await axios.get(`/api/cocktails`)
    dispatch({
      type: USER_COCKTAILS,
      payload: res.data
    })
  } catch (err) {
    throw "err"
  }
}
