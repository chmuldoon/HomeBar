import axios from "axios";

import { SEARCH_ITEMS } from "../actions/types"


export const fetchSearchItems = () => async dispatch => {
  try {
    debugger
    const res = await axios.get("/api/cocktails/search");
    debugger
    dispatch({
      type: SEARCH_ITEMS,
      payload: res.data
    })
  } catch (err) {
    // throw "err";
    
  }
}