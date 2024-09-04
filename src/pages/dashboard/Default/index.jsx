import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersLatest, fetchOrdersToday } from '../../Orders/store/reducers/extra_reducers';
import { Box } from '@mui/material';
import LatestOrdersTable from './tables/latest';
import TodayOrdersTable from './tables/today';

// Utility function to format date in YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Dashboard = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [queryStrToday, setQueryStrToday] = useState('');
  const [queryStrLatest, setQueryStrLatest] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch()

  useEffect(() => {
    const queryParamsToday = new URLSearchParams();
    const queryParamsLatest = new URLSearchParams();

    queryParamsToday.append('limit', rowsPerPage);
    queryParamsLatest.append('limit', rowsPerPage);

    if (startDate) {
      const selectedDate = new Date(startDate);
      const startDateIsoDateString = selectedDate.toISOString();

      queryParamsToday.append('startDate', startDateIsoDateString);
    }

    if (endDate) {
      const selectedDate = new Date(endDate);
      const endDateIsoDateString = selectedDate.toISOString();

      queryParamsToday.append('endDate', endDateIsoDateString);
    }

    setQueryStrToday(queryParamsToday)
    setQueryStrLatest(queryParamsLatest)

  }, [rowsPerPage, startDate, endDate, setQueryStrToday, setQueryStrLatest]);

  useEffect(() => {
    if (queryStrToday !== "") {
      dispatch(fetchOrdersToday(queryStrToday));
    }

    if (queryStrLatest !== "") {
      dispatch(fetchOrdersLatest(queryStrLatest));
    }
  }, [queryStrToday, queryStrLatest, dispatch]);

  const store = useSelector((state) => state.allOrders);

  const ordersToday = store.ordersToday;

  const ordersLatest = store.ordersLatest;

  // console.log(ordersToday)
  // console.log(ordersLatest)

  return (
    <Box px={'10px'} py={'20px'}>
      <p>Today's Latest 10 Orders</p>
      <TodayOrdersTable orders={ordersToday} />
      <br />
      <hr />
      <br />
      <p>Last 10 Orders</p>
      <LatestOrdersTable orders={ordersLatest} />
    </Box>
  )
}

export default Dashboard

// import { useEffect, useState } from 'react';

// // material-ui
// import { Grid } from '@mui/material';

// // project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';

// import { gridSpacing } from '../../../store/reducers/app';

// // ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <EarningCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <TotalOrderLineChartCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <Grid container spacing={gridSpacing}>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeDarkCard isLoading={isLoading} />
//               </Grid>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeLightCard isLoading={isLoading} />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12} md={8}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;
