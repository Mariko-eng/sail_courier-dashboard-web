import { combineReducers } from "redux";
import customizationReducer from "./app";
import authReducer from "../../pages/Auth/Login/store";
import dashboardReducer from '../../pages/Dashboard/store';
import allOrdersReducer from '../../pages/Orders/store/slices/index';
import regularOrdersReducer from '../../pages/Orders/store/slices/regular';
import laundryOrdersReducer from '../../pages/Orders/store/slices/laundry';
import shoppingOrdersReducer from '../../pages/Orders/store/slices/shopping';
import shoppingCategoriesReducer from '../../pages/Utilities/Shopping/Categories/store';
import shoppingItemsReducer from '../../pages/Utilities/Shopping/Items/store';
import laundryCategoriesReducer from '../../pages/Utilities/Laundry/Categories/store';
import laundryItemsReducer from '../../pages/Utilities/Laundry/Items/store';
import couriersReducer from '../../pages/Staff/Couriers/store';
import agentsReducer from '../../pages/Staff/Agents/store';
import adminsReducer from '../../pages/Staff/Admins/store';
import personalClientsReducer from '../../pages/Clients/store/slices/clients_personal';
import corporateClientsReducer from '../../pages/Clients/store/slices/clients_corporate';
import corporateCompaniesReducer from '../../pages/Clients/store/slices/companies_corporate';


export const rootReducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  allOrders: allOrdersReducer,
  regularOrders: regularOrdersReducer,
  laundryOrders: laundryOrdersReducer,
  shoppingOrders: shoppingOrdersReducer,
  shoppingCategories: shoppingCategoriesReducer,
  shoppingItems: shoppingItemsReducer,
  laundryCategories: laundryCategoriesReducer,
  laundryItems: laundryItemsReducer,
  couriers: couriersReducer,
  agents: agentsReducer,
  admins: adminsReducer, 
  personalClients: personalClientsReducer,
  corporateClients: corporateClientsReducer,
  corporateCompanies: corporateCompaniesReducer
});