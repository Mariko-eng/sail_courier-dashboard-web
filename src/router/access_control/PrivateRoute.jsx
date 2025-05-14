/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
// import Spinner from "../layouts/Spinner";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children, route }) => {

 const store = useSelector((state) => state.auth);

  if (route) {
      if (store.isLoading === false) {
        if (Object.keys(store.user).length === 0) {
          return <Navigate to="/login" />;
        }
      }
    // if (!user) {
    //   return <Navigate to="/login" />;
    // }
  }
  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};
export default PrivateRoute;
