import axios from "axios";
import { UPDATE_USER, ADD_INGREDIENT, REMOVE_INGREDIENT, FETCH_USER_LISTS, ADD_MUST_HAVE, REMOVE_MUST_HAVE } from "./types";


export const fetchUserLists = () => async dispatch => {
  try {
    const res = await axios.get(`/api/ingredients/shelf`)
    dispatch({
      type: FETCH_USER_LISTS,
      payload: res.data
    })
    
  } catch (err) {
    throw "err";
    
  }
}
export const addIngredient = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/ingredients/add/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user
    })
    dispatch({
      type: ADD_INGREDIENT,
      payload: res.data.cocktails,
    });
    const res2 = await axios.get(`/api/ingredients/shelf`);

    dispatch({
      type: FETCH_USER_LISTS,
      payload: res2.data,
    });

  } catch (err) {
    throw "err"
  }
}

export const removeIngredient = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/ingredients/remove/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: res.data.cocktails,
    });
    const res2 = await axios.get(`/api/ingredients/shelf`);

    dispatch({
      type: FETCH_USER_LISTS,
      payload: res2.data,
    });
  } catch (err) {
    throw "err";
  }
};

export const addMustHave = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/ingredients/add/musthave/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });
    dispatch({
    
      type: ADD_MUST_HAVE,
      payload: res.data.cocktails,
    });
    const res2 = await axios.get(`/api/ingredients/shelf`);

    dispatch({
      type: FETCH_USER_LISTS,
      payload: res2.data,
    });
  } catch (err) {
    throw "err";
  }
};

export const removeMustHave = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/ingredients/remove/musthave/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });
    dispatch({
      type: REMOVE_MUST_HAVE,
      payload: res.data.cocktails,
    });
    const res2 = await axios.get(`/api/ingredients/shelf`);

    dispatch({
      type: FETCH_USER_LISTS,
      payload: res2.data,
    });
  } catch (err) {
    throw "err";
  }
};


// export const changeIngredients = (action, id) => async (dispatch) => {
//   try {
    
//   } catch (error) {
    
//   }
// }