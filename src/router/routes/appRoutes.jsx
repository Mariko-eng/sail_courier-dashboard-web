import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';

// Dashboard
const DashboardDefault = Loadable(lazy(() => import('../../pages/Dashboard/Default')));

// Orders
const RegularOrders = Loadable(lazy(() => import('../../pages/Orders/Regular')));
const RegularOrdersNew = Loadable(lazy(() => import('../../pages/Orders/Regular/new')));
const LaundryOrders = Loadable(lazy(() => import('../../pages/Orders/Laundry')));
const ShoppingOrders = Loadable(lazy(() => import('../../pages/Orders/Shopping')));

// Clients - Corporate Accounts
const CorporateCompanies = Loadable(lazy(() => import('../../pages/Clients/Corporate/Companies')));
const ClientsCorporate = Loadable(lazy(() => import('../../pages/Clients/Corporate/Users')));

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
const StaffCouriers = Loadable(lazy(() => import('../../pages/Staff/Couriers')));

export const AppRoutes = [
  {
    path: 'home',
    meta: { isPrivate: true },
    element: <DashboardDefault />
  },
  {
    path: 'orders/regular',
    meta: { isPrivate: true },
    element: <RegularOrders />
  },
  {
    path: 'orders/regular/new',
    meta: { isPrivate: true },
    element: <RegularOrdersNew />
  },
  {
    path: 'orders/laundry',
    meta: { isPrivate: true },
    element: <LaundryOrders />
  },
  {
    path: 'orders/shopping',
    meta: { isPrivate: true },
    element: <ShoppingOrders />
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
    path: 'clients/corporate',
    meta: { isPrivate: true },
    element: <ClientsCorporate />
  },
  {
    path: 'clients/corporate/companies',
    meta: { isPrivate: true },
    element: <CorporateCompanies />
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
