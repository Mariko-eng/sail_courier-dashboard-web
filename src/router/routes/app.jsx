import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';

// Dashboard
const DashboardDefault = Loadable(lazy(() => import('../../pages/Dashboard')));

// Orders
const QuickSendOrdersList = Loadable(lazy(() => import('../../pages/Orders/QuickSend/list')));
const QuickSendOrdersNew = Loadable(lazy(() => import('../../pages/Orders/QuickSend/new')));
const QuickSendOrdersDetail = Loadable(lazy(() => import('../../pages/Orders/QuickSend/detail')));

const WaybillOrdersList = Loadable(lazy(() => import('../../pages/Orders/Waybill')));
const WaybillOrdersEdit = Loadable(lazy(() => import('../../pages/Orders/Waybill/edit')));

// Clients - Corporate Accounts
const CorporateCompaniesList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/list')));
const CorporateCompanyUserAccountsList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Users')));
const CorporateCompanyWarehousesList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Warehouses')));
const CorporateCompanyOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders')));
const CorporateCompanyQuickSendOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders/QuickSend')));
const CorporateCompanyWaybillOrdersList = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies/Orders/Waybill')));

// Clients
const ClientsPersonal = Loadable(lazy(() => import('../../pages/Clients/Personal')));
const ClientsCorporate = Loadable(lazy(() => import('../../pages/Clients/Corporate/Users/list')));

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
    path: 'orders/quick-send',
    meta: { isPrivate: true },
    element: <QuickSendOrdersList />
  },
  {
    path: 'orders/quick-send/detail/:id',
    meta: { isPrivate: true },
    element: <QuickSendOrdersDetail />
  },
  {
    path: 'orders/quick-send/new',
    meta: { isPrivate: true },
    element: <QuickSendOrdersNew />
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
    path: 'clients/corporate/companies/:id/orders-quick-send',
    meta: { isPrivate: true },
    element: <CorporateCompanyQuickSendOrdersList />
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
