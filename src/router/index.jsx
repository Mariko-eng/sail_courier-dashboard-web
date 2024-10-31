import BlankLayout from '../components/layout/blank/BlankLayout';
import { useRoutes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import PageNotFound from '../pages/Auth/NotFound';
import GetRoutes from './routes';
import ProtectedLayout from '../components/layout/protected';

const Router = () => {
  const HomeRoutes = GetRoutes();

  const routes = useRoutes([
    {
      path: '/',
      element: <ProtectedLayout />,
      children: [
        { path: '', element: <Login /> },
        { path: 'login', element: <Login /> }
      ]
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