import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';

// Dashboard
const DashboardDefault = Loadable(lazy(() => import('../../pages/Dashboard')));

// Orders
const RegularOrdersList = Loadable(lazy(() => import('../../pages/Orders/Regular/list')));
const RegularOrdersNew = Loadable(lazy(() => import('../../pages/Orders/Regular/new')));
const RegularOrdersDetail = Loadable(lazy(() => import('../../pages/Orders/Regular/detail')));

const WaybillOrdersList = Loadable(lazy(() => import('../../pages/Orders/Waybill')));
const WaybillOrdersEdit = Loadable(lazy(() => import('../../pages/Orders/Waybill/edit')));

const LaundryOrdersList = Loadable(lazy(() => import('../../pages/Orders/Laundry')));
const ShoppingOrdersList = Loadable(lazy(() => import('../../pages/Orders/Shopping')));

// Clients - Corporate Accounts
const CorporateCompaniesList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/list')));
const CorporateCompanyUserAccountsList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Users')));
const CorporateCompanyWarehousesList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Warehouses')));
const CorporateCompanyOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders')));
const CorporateCompanyRegularOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders/Regular')));
const CorporateCompanyWaybillOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders/Waybill')));
const ClientsCorporate = Loadable(lazy(() => import('../../pages/Clients/Corporate/Users/list')));

// Clients - Personal Accounts
const ClientsPersonal = Loadable(lazy(() => import('../../pages/Clients/Personal')));

// Utilities - Laundry
const LaundryCategories = Loadable(lazy(() => import('../../pages/Utilities/Laundry/Categories')));
const LaundryItems = Loadable(lazy(() => import('../../pages/Utilities/Laundry/Items')));

// Utilities - Shopping
const ShoppingCategories = Loadable(lazy(() => import('../../pages/Utilities/Shopping/Categories')));
const ShoppingItems = Loadable(lazy(() => import('../../pages/Utilities/Shopping/Items')));

// Staff
const StaffAdmins = Loadable(lazy(() => import('../../pages/Staff/Admins')));
const StaffAgents = Loadable(lazy(() => import('../../pages/Staff/Agents')));
const StaffCouriers = Loadable(lazy(() => import('../../pages/Staff/Couriers/list')));

export const AppRoutes = [
  {
    path: 'home',
    meta: { isPrivate: true },
    element: <DashboardDefault />
  }, 
  {
    path: 'orders/regular',
    meta: { isPrivate: true },
    element: <RegularOrdersList />
  },
  {
    path: 'orders/regular/detail/:id',
    meta: { isPrivate: true },
    element: <RegularOrdersDetail />
  },
  {
    path: 'orders/regular/new',
    meta: { isPrivate: true },
    element: <RegularOrdersNew />
  },
  {
    path: 'orders/waybill',
    meta: { isPrivate: true },
    element: <WaybillOrdersList />
  },
  {
    path: 'orders/waybill/edit/:id',
    meta: { isPrivate: true },
    element: <WaybillOrdersEdit />
  },
  {
    path: 'orders/laundry',
    meta: { isPrivate: true },
    element: <LaundryOrdersList />
  },
  {
    path: 'orders/shopping',
    meta: { isPrivate: true },
    element: <ShoppingOrdersList />
  },
  // Utilities - Laundry
  {
    path: 'laundry/categories',
    meta: { isPrivate: true },
    element: <LaundryCategories />
  },
  {
    path: 'laundry/items',
    meta: { isPrivate: true },
    element: <LaundryItems />
  },
  // Utilities - Shopping
  {
    path: 'shopping/categories',
    meta: { isPrivate: true },
    element: <ShoppingCategories />
  },
  {
    path: 'shopping/items',
    meta: { isPrivate: true },
    element: <ShoppingItems />
  },
  {
    path: 'shopping/subscriptions',
    meta: { isPrivate: true },
    element: <ShoppingItems />
  },
  // Clients - Corporate
  {
    path: 'clients/corporate/companies',
    meta: { isPrivate: true },
    element: <CorporateCompaniesList />
  },
  {
    path: 'clients/corporate/companies/:id/user-accounts/',
    meta: { isPrivate: true },
    element: <CorporateCompanyUserAccountsList />
  },
  {
    path: 'clients/corporate/companies/:id/warehouses',
    meta: { isPrivate: true },
    element: <CorporateCompanyWarehousesList />
  },
  {
    path: 'clients/corporate/companies/:id/orders-regular',
    meta: { isPrivate: true },
    element: <CorporateCompanyRegularOrdersList />
  },
  {
    path: 'clients/corporate/companies/:id/orders-waybill',
    meta: { isPrivate: true },
    element: <CorporateCompanyWaybillOrdersList />
  },
  {
    path: 'clients/corporate/companies/:id/orders',
    meta: { isPrivate: true },
    element: <CorporateCompanyOrdersList />
  },
  {
    path: 'clients/corporate',
    meta: { isPrivate: true },
    element: <ClientsCorporate />
  },
  // Clients - Personal
  {
    path: 'clients/personal',
    meta: { isPrivate: true },
    element: <ClientsPersonal />
  },
  // Staff
  {
    path: 'staff/admins',
    meta: { isPrivate: true },
    element: <StaffAdmins />
  },
  {
    path: 'staff/agents',
    meta: { isPrivate: true },
    element: <StaffAgents />
  },
  {
    path: 'staff/couriers',
    meta: { isPrivate: true },
    element: <StaffCouriers />
  }
];
