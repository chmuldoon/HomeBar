import axios from "axios";

import { FETCH_COCKTAIL, USER_COCKTAILS } from "../actions/types";
export const getCocktail = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/cocktails/${id}`);
    dispatch({
      type: FETCH_COCKTAIL,
      payload: res.data,
    });
  } catch (err) {
     throw "err";
  }
}
export const getUserCocktails = () => async dispatch => {
  try {
    const res = await axios.get(`/api/cocktails`)
    dispatch({
      type: USER_COCKTAILS,
      payload: res.data
    })
  } catch (err) {
    throw "err"
  }
}
