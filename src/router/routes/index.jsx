import VerticalLayout from "../../components/layout/vertical/VerticalLayout";
import PrivateRoute from "../access_control/PrivateRoute";
import PublicRoute from "../access_control/PublicRoute";
import { AppRoutes } from './appRoutes';

const GetRoutes = () => {
  // const appRoutes = [];
    const allRoutes = [];
    const processedRoutes = [];

    AppRoutes.filter((route) => {
      let RouteTag = PrivateRoute;

      // console.log(route)
      // console.log(route.path);
      // console.log(route.meta);

      RouteTag = route.meta.isPrivate ? PrivateRoute : PublicRoute;

      route.element = <RouteTag route={route}>{route.element}</RouteTag>;

      processedRoutes.push(route);
    }); 

    allRoutes.push({
      path: "/",
      element: <VerticalLayout />,
      children: processedRoutes,
    });

    return allRoutes;
}

export default GetRoutes;
