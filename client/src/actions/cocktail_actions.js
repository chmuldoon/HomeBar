import axios from "axios";
import { FETCH_COCKTAIL,UPDATE_USER, CREATE_COCKTAIL, USER, USER_FAVORITES, USER_COCKTAILS, REMOVE_FAVORITE, SIMILAR_COCKTAILS, RESET_COCKTAILS } from "../actions/types";
import history from "../history";
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
export const clearCocktail = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COCKTAIL,
      payload: null,
    });
  } catch (err) {
    throw "err";
  }
};
export const clearCocktails = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_COCKTAILS,
      payload: [],
    });
  } catch (err) {
    throw "err";
  }
};
export const formCocktailUrl = (cocktail) => {
  if(cocktail.userMade){
    return cocktail.photo
  }else{
    return `https://www.thecocktaildb.com/images/media/drink/${cocktail.photo}`;
  }
}
export const createCocktail = (cocktailData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(cocktailData)
  try {
    const res = await axios.post("/api/cocktails", body, config)
    console.log(res.data)
    dispatch({
      type: CREATE_COCKTAIL,
      payload: res.data

    })
    console.log("1")
    history.push(`/cocktails/${res.data._id}`)
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
