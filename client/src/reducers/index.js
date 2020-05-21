import { combineReducers } from "redux";
import alerts from "./alertsReducer";
import auth from "./authReducer";


export default combineReducers({
  alerts,
  auth,
});
