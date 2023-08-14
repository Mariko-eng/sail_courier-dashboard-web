import { lazy } from 'react';

// project imports
import Loadable from '../../ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../../pages/dashboard/Default')));
const Regular = Loadable(lazy(() => import('../../pages/Orders/Regular')));
const Laundry = Loadable(lazy(() => import('../../pages/Orders/Laundry')));
const Shopping = Loadable(lazy(() => import('../../pages/Orders/Shopping')));
const RegularClients = Loadable(lazy(() => import('../../pages/Clients/Regular')));
const CorporateClients = Loadable(lazy(() => import('../../pages/Clients/Corporate')));


const HomeRoutes = [
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
    path: 'orders/shopping',
    meta: { isPrivate: true },
    element: <Shopping />
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
  }
];

export default HomeRoutes;
