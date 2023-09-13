/* eslint-disable react/prop-types */
// import React from 'react'
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, route }) => {
 const store = useSelector((state) => state.auth);

  if (route) {
    if (store.isLoading === false) {
      if (Object.keys(store.user).length !== 0) {
        return <Navigate to="/home" />;
      }
    }
  }

  // if (route) {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     return <Navigate to= "/home" />
  //   }
  // }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute