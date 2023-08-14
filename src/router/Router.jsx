import Login from "../pages/Login";
import BlankLayout from "../components/layout/blank/BlankLayout";
import { Navigate, useRoutes } from "react-router-dom";
import getRoutes from './routes/index'
import { getHomeRoute } from '../utils/getHomeRoute';
import PageNotFound from "../pages/NotFound.jsx";


const Router = () => {
  const HomeRoutes = getRoutes

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
