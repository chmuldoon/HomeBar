import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert_actions";
import setAuthToken from "../util/setAuthToken";

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//register a user
export const register = ( email, password ) => async (dispatch) => {
  //adds headers to request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //translates to json

  const body = JSON.stringify({ email, password });

  try {

    //makes http request with the body and header
    const res = await axios.post("/api/users", body, config);

    //should return the token
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//login user
export const login = (email, password) => async (dispatch) => {
  //adds headers to request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //translates to json
  const body = JSON.stringify({ email, password });
  try {
    //makes http request with the body and header
    const res = await axios.post("/api/auth", body, config);
    //should return the token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const demoLogin = () => async (dispatch) => {
  //adds headers to request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //translates to json
  const body = JSON.stringify({ email: "demo@demo.com", password: "password" });
  try {
    //makes http request with the body and header
    const res = await axios.post("/api/auth", body, config);
    //should return the token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
