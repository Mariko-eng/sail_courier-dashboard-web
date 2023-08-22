/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
// import Spinner from "../layouts/Spinner";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
 const user = JSON.parse(localStorage.getItem("user"));

  // console.log(route);
  // console.log(route.meta);

  if (route) {
    if (!user) {
      return <Navigate to="/login" />;
    }
  }
  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};
export default PrivateRoute;
