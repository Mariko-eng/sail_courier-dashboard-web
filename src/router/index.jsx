import BlankLayout from '../components/layout/blank/BlankLayout';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import PageNotFound from '../pages/auth/NotFound';
import GetRoutes from './routes';
import { getHomeRoute } from '../utils/getHomeRoute';

const Router = () => {
  // console.log(GetRoutes());
  const HomeRoutes = GetRoutes();

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <PageNotFound /> }]
    },

    ...HomeRoutes
  ]);

  return routes;
};

export default Router;
