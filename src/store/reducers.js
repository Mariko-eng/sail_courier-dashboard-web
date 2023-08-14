import { combineReducers } from "redux";
import authReducer from "../pages/Login/store";
import customizationReducer from "./app/customizationReducer";
import orderReducer from './../pages/Orders/store';


export const rootReducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
  orders: orderReducer
});