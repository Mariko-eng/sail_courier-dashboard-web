import BlankLayout from '../components/layout/blank/BlankLayout';
import { useRoutes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import PageNotFound from '../pages/Auth/NotFound';
import GetRoutes from './routes';
import ResetPassword from '../pages/Auth/ResetPassword';

const Router = () => {
  const HomeRoutes = GetRoutes();

  const routes = useRoutes([
    {
      path: '/',
      element: <BlankLayout />,
      children: [
        { path: '', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'reset-password', element: <ResetPassword /> }
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