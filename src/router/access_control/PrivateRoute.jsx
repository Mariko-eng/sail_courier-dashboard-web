/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
// import Spinner from "../layouts/Spinner";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
//  const user = JSON.parse(localStorage.getItem("user"));
//  console.log("user")
//  console.log(user)

 const store = useSelector((state) => state.auth);
// console.log('store');
// console.log(store);

  // console.log(route);
  // console.log(route.meta);

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
