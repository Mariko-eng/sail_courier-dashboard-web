import { combineReducers } from "redux";
import customizationReducer from "./theme";
import sidebarReducer from "./sidebar";
import authReducer from "../../pages/Auth/store";
import shoppingCategoriesReducer from '../../pages/Utilities/Shopping/Categories/store';
import shoppingItemsReducer from '../../pages/Utilities/Shopping/Items/store';
import laundryCategoriesReducer from '../../pages/Utilities/Laundry/Categories/store';
import laundryItemsReducer from '../../pages/Utilities/Laundry/Items/store';
import agentsReducer from '../../pages/Staff/Agents/store';
import adminsReducer from '../../pages/Staff/Admins/store';
import personalClientsReducer from '../../pages/Clients/store/slices/clients_personal';
import corporateClientsReducer from '../../pages/Clients/store/slices/clients_corporate';
import corporateCompaniesReducer from '../../pages/Clients/store/slices/companies_corporate';


export const rootReducer = combineReducers({
  customization: customizationReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  shoppingCategories: shoppingCategoriesReducer,
  shoppingItems: shoppingItemsReducer,
  laundryCategories: laundryCategoriesReducer,
  laundryItems: laundryItemsReducer,
  agents: agentsReducer,
  admins: adminsReducer, 
  personalClients: personalClientsReducer,
  corporateClients: corporateClientsReducer,
  corporateCompanies: corporateCompaniesReducer
});