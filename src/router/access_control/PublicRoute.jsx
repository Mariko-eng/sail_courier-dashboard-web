/* eslint-disable react/prop-types */
// import React from 'react'
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, route }) => {
  if (route) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return <Navigate to= "/home" />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute