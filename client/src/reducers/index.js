import { combineReducers } from "redux";
import alerts from "./alertsReducer";
import auth from "./authReducer";
import cocktails from "./cocktailsReducer"
import search from './searchReducer'
export default combineReducers({
  alerts,
  auth,
  cocktails,
  search
  
});
