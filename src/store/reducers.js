import { combineReducers } from "redux";
import authReducer from "../pages/Login/store";
import customizationReducer from "./app/customizationReducer";
import ordersReducer from './../pages/Orders/store';
import shoppingCategoriesReducer from './../pages/Shopping/Categories/store';
import shoppingItemsReducer from './../pages/Shopping/Items/store';
import shoppingSubscriptionsReducer from './../pages/Shopping/Subscriptions/store';
import shoppingOrdersReducer from './../pages/Shopping/Orders/store';



export const rootReducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
  orders: ordersReducer,
  shoppingCategories: shoppingCategoriesReducer,
  shoppingItems: shoppingItemsReducer,
  shoppingSubscriptions: shoppingSubscriptionsReducer,
  shoppingOrders: shoppingOrdersReducer
});