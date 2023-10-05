import { combineReducers } from "redux";
import authReducer from "../pages/auth/Login/store";
import customizationReducer from "./app/customizationReducer";
import ordersReducer from './../pages/Orders/store';
import shoppingCategoriesReducer from './../pages/Utilities/Shopping/Categories/store';
import shoppingItemsReducer from './../pages/Utilities/Shopping/Items/store';
import laundryCategoriesReducer from './../pages/Utilities/Laundry/Categories/store';
import laundryItemsReducer from './../pages/Utilities/Laundry/Items/store';
import couriersReducer from './../pages/Staff/Couriers/store';
import agentsReducer from './../pages/Staff/Agents/store';
import adminsReducer from './../pages/Staff/Admins/store';
import clientsReducer from './../pages/Clients/store';

export const rootReducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
  orders: ordersReducer,
  shoppingCategories: shoppingCategoriesReducer,
  shoppingItems: shoppingItemsReducer,
  laundryCategories: laundryCategoriesReducer,
  laundryItems: laundryItemsReducer,
  couriers: couriersReducer,
  agents: agentsReducer,
  admins: adminsReducer,
  clients: clientsReducer
});