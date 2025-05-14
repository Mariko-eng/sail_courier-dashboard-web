import React, { useMemo, useCallback } from 'react'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { fetch_dashboard_analytics } from '../../../services/dashboard';


const DashboardSummary = () => { 
  const [stats, setStatsData] = useState({});
  const [loading, setLoading] = useState(false);

  // Memoize fetchData function to prevent unnecessary rerenders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch_dashboard_analytics();
      setLoading(false);
      setStatsData(response);
      // setOrderData(results.entries);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("stats" , stats)

  const chartData = useMemo(() => {
    // Ensure monthlyOrders is available and is an array
  
    if (!stats.monthlyOrders || !Array.isArray(stats.monthlyOrders)) {
      return { series: [], options: {} };
    }
  
    // Extract data for the chart
    const data = stats.monthlyOrders.map(item => item.count);
  
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
  }, [stats]);


  return ( 
    <>
    { loading ? <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={400}>
      ...loading...
    </Box> :  
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{stats.todayOrdersCount}</Typography>
              <Typography variant='h6'>Today's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{stats.last7DaysOrdersCount}</Typography>
              <Typography variant='h6'>This Week's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{stats.last30DaysOrdersCount}</Typography>
              <Typography variant='h6'>This Month's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>{stats.totalYearlyCount}</Typography>
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
              <Typography variant='h2' color='primary'>{stats.todayRevenue}</Typography>
              <Typography variant='h6'>This Week</Typography>
              <Typography variant='h2' color='primary'>{stats.last7DaysRevenue}</Typography>
              <Typography variant='h6'>This Month</Typography>
              <Typography variant='h2' color='primary'>{stats.last30DaysRevenue}</Typography>
              <Typography variant='h6'>This Year</Typography>
              <Typography variant='h2' color='primary'>{stats.totalYearlyRevenue}</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Clients</Typography>
              <Typography variant='h2' color='primary'>{stats.clientsCount}</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Couriers</Typography>
              <Typography variant='h2' color='primary'>{stats.couriersCount}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>}
    </>
  )
}

export default DashboardSummary