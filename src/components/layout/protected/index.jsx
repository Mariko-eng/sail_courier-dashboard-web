import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
    const store = useSelector((store) => store.auth);

    // console.log(store.user)

    // if (store.user === undefined || store.user === null) {
    //     // return <Outlet />;
    // } else {
    //     // return <Navigate to={"/home"} replace={true} />;
    // }

    return <Outlet />;
}

export default ProtectedLayout