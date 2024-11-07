import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersLatest } from '../../Orders/store/reducers/extra_reducers';
import { Box } from '@mui/material';
import LatestOrdersTable from '../tables/latest';

// Utility function to format date in YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DashboardRecentOrders = () => {
  const [queryStrLatest, setQueryStrLatest] = useState('');

  const dispatch = useDispatch()

  useEffect(() => {
    const queryParamsLatest = new URLSearchParams();

    queryParamsLatest.append('limit', 10);

    setQueryStrLatest(queryParamsLatest)

  }, [setQueryStrLatest]);


  useEffect(() => {
    if (queryStrLatest !== "") {
      dispatch(fetchOrdersLatest(queryStrLatest));
    }
  }, [queryStrLatest, dispatch]);


  const store = useSelector((state) => state.allOrders);

  const ordersLatest = store.ordersLatest;

  // console.log(ordersLatest)

  return (
    <Box px={'10px'} py={'20px'}>
      <p>Latest 10 Orders</p>
      <LatestOrdersTable orders={ordersLatest} />
    </Box>
  )
}

export default DashboardRecentOrders