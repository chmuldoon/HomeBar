import { combineReducers } from "redux";
import alerts from "./alertsReducer";
import auth from "./authReducer";
import cocktails from "./cocktailsReducer"
import search from './searchReducer'
import ingredients from './ingredientsReducer'
export default combineReducers({
  alerts,
  auth,
  cocktails,
  ingredients,
  search
  
});
