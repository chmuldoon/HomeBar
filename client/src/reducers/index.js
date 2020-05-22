import { combineReducers } from "redux";
import alerts from "./alertsReducer";
import auth from "./authReducer";
import cocktails from "./cocktailsReducer"

export default combineReducers({
  alerts,
  auth,
  cocktails
  
});
