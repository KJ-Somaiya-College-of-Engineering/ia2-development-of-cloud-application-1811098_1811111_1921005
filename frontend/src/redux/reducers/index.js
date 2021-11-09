import { combineReducers } from "redux";
import CategoriesReducer from "./categoriesReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  user: authReducer,
  cart: cartReducer,
  addresses: addressReducer,
});
export default rootReducer;
