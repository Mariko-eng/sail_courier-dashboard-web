import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../../pages/dashboard/Default')));
const Regular = Loadable(lazy(() => import('../../pages/Orders/Regular')));
const Laundry = Loadable(lazy(() => import('../../pages/Orders/Laundry')));
const RegularClients = Loadable(lazy(() => import('../../pages/Clients/Regular')));
const CorporateClients = Loadable(lazy(() => import('../../pages/Clients/Corporate')));

const ShoppingCategories = Loadable(lazy(() => import('../../pages/Shopping/Categories')));
const ShoppingItems = Loadable(lazy(() => import('../../pages/Shopping/Items')));
const ShoppingSubscriptions = Loadable(lazy(() => import('../../pages/Shopping/Subscriptions')));
const ShoppingOrders = Loadable(lazy(() => import('../../pages/Shopping/Orders')));

export const AppRoutes = [
  {
    path: 'home',
    meta: { isPrivate: true },
    element: <DashboardDefault />
  },
  {
    path: 'orders/regular',
    meta: { isPrivate: true },
    element: <Regular />
  },
  {
    path: 'orders/laundry',
    meta: { isPrivate: true },
    element: <Laundry />
  },
  {
    path: 'clients/regular',
    meta: { isPrivate: true },
    element: <RegularClients />
  },
  {
    path: 'clients/corporate',
    meta: { isPrivate: true },
    element: <CorporateClients />
  },
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
    element: <ShoppingSubscriptions />
  },
  {
    path: 'shopping/orders',
    meta: { isPrivate: true },
    element: <ShoppingOrders />
  }
];
