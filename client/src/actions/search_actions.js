import axios from "axios";

import { SEARCH_ITEMS } from "../actions/types"


export const fetchSearchItems = () => async dispatch => {
  try {
    const res = await axios.get("/api/cocktails/search");
    dispatch({
      type: SEARCH_ITEMS,
      payload: res.data
    })
  } catch (err) {
    // throw "err";
    
  }
}