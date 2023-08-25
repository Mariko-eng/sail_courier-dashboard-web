import { combineReducers } from "redux";
import authReducer from "../pages/auth/Login/store";
import customizationReducer from "./app/customizationReducer";
import ordersReducer from './../pages/Orders/store';
import shoppingCategoriesReducer from './../pages/Utilities/Shopping/Categories/store';
import shoppingItemsReducer from './../pages/Utilities/Shopping/Items/store';
import shoppingSubscriptionsReducer from './../pages/Utilities/Shopping/Subscriptions/store';
import couriersReducer from './../pages/Staff/Couriers/store';

export const rootReducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
  orders: ordersReducer,
  shoppingCategories: shoppingCategoriesReducer,
  shoppingItems: shoppingItemsReducer,
  shoppingSubscriptions: shoppingSubscriptionsReducer,
  couriers: couriersReducer
});