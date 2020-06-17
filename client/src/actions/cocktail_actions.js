import axios from "axios";
import { FETCH_COCKTAIL,UPDATE_USER, USER, USER_FAVORITES, USER_COCKTAILS, REMOVE_FAVORITE, SIMILAR_COCKTAILS, RESET_COCKTAILS } from "../actions/types";
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
export const getUserFavorites = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cocktails/favorites`);
    dispatch({
      type: USER_FAVORITES,
      payload: res.data,
    });
  } catch (err) {
    throw "err";
  }
};
export const resetCocktails = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_COCKTAILS,
      payload: null
    });
  } catch (err) {
    throw "err";
    
  }
}
export const similarCocktails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cocktails/similar/${id}`);
    dispatch({
      type: SIMILAR_COCKTAILS,
      payload: res.data,
    });
  } catch (err) {
    throw "err";
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
