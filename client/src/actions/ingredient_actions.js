import axios from "axios";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./types";

export const addIngredient = (id) => async dispatch => {
  try {
    debugger
    const res = await axios.put(`/api/ingredients/add/${id}`);
    dispatch({
      type: ADD_INGREDIENT,
      payload: res.data,
    });
  } catch (err) {
    throw "err"
  }
}

export const removeIngredient = (id) => async (dispatch) => {
  try {
    debugger;
    const res = await axios.put(`/api/ingredients/remove/${id}`);
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: res.data,
    });
  } catch (err) {
    throw "err";
  }
};