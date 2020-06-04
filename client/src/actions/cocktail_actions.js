import axios from "axios";
import { FETCH_COCKTAIL,UPDATE_USER, USER_COCKTAILS, REMOVE_FAVORITE } from "../actions/types";
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

export const addFavorite = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/cocktails/add/favorites/${id}`)
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });

  } catch (err) {
    throw "err";
  }
}

export const removeFavorite = (id, cocktailPage = false) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/cocktails/remove/favorites/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });
    if(cocktailPage){
      dispatch({
        type: REMOVE_FAVORITE,
        payload: res.data.cocktails,
      });
    }
  } catch (err) {
    throw "err";
  }
};
