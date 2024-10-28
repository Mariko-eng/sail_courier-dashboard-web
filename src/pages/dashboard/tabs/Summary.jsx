import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { gridSpacing } from '../../../store/reducers/app';
import { Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/reducers';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

const DashboardSummary = () => {
  const dispatch = useDispatch()

 useEffect(() => {
    dispatch(fetchDashboardData());
}, [dispatch]);

 
const store = useSelector((state) => state.dashboard);

// console.log(store)

const chartData = useMemo(() => {
  // Ensure monthlyOrders is available and is an array

  if (!store.monthlyOrders || !Array.isArray(store.monthlyOrders)) {
    return { series: [], options: {} };
  }

  // Extract data for the chart
  const data = store.monthlyOrders.map(item => item.count);

  const chartOptions = {
    series: [{
      name: "Number of Deliveries",
      data: data
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: 'Number of Deliveries per Month',
        align: 'left'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
        title: {
          text: 'Number of Deliveries'
        }
      },
      tooltip: {
        shared: true,
        intersect: false
      }
    }
  };

  return chartOptions;
}, [store.monthlyOrders]);


  return ( 
    <>
    { store.loading ? <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={400}>
      ...loading...
    </Box> :  
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{store.todayOrdersCount}</Typography>
              <Typography variant='h6'>Today's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{store.last7DaysOrdersCount}</Typography>
              <Typography variant='h6'>This Week's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{store.last30DaysOrdersCount}</Typography>
              <Typography variant='h6'>This Month's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{store.totalYearlyCount}</Typography>
              <Typography variant='h6'>This Year's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={8}>
          <Paper>
            <Box height={"400px"} p={"20px"} >
              <ReactApexChart
              options={chartData.options} 
              series={chartData.series} 
              type="line" 
              height={350}
              width="100%" 
              />
              </Box>
            </Paper>
          {/* <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Recent Delivery Locations</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Recently Added Clients/Users</Typography>
            </Box>
          </Paper> */}
        </Grid>
        <Grid size={4}>
        <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Revenue Information</Typography>
              <Typography variant='h6'>Today</Typography>
              <Typography variant='h2' color='primary'>{store.todayRevenue}</Typography>
              <Typography variant='h6'>This Week</Typography>
              <Typography variant='h2' color='primary'>{store.last7DaysRevenue}</Typography>
              <Typography variant='h6'>This Month</Typography>
              <Typography variant='h2' color='primary'>{store.last30DaysRevenue}</Typography>
              <Typography variant='h6'>This Year</Typography>
              <Typography variant='h2' color='primary'>{store.totalYearlyRevenue}</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Clients</Typography>
              <Typography variant='h2' color='primary'>{store.clientsCount}</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Couriers</Typography>
              <Typography variant='h2' color='primary'>{store.couriersCount}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>}
    </>
  )
}

export default DashboardSummary