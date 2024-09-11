import React from 'react'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { gridSpacing } from '../../../store/reducers/app';
import { Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

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
 const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const chartData = {
    series: [{
      name: "Number",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 0, 0, 0]
  }],
  options : {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: 'Number of deliveries per month',
      align: 'left'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  }
  };

  return ( 
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>Today's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>This Week's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>This Month's Orders</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper>
            <Box height={"150px"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h2' color='primary'>0</Typography>
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
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Recent Delivery Locations</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Recently Added Clients/Users</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={4}>
        <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Revenue Information</Typography>
              <Typography variant='h6'>Today</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>This Week</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>This Month</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
              <Typography variant='h6'>This Year</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Clients</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
            </Box>
          </Paper>
          <Paper>
          <Box display={"flex"} mt={"10px"} py={"10px"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant='h6'>Couriers</Typography>
              <Typography variant='h2' color='primary'>0</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>

    // <Grid container spacing={gridSpacing}>
    //   <Grid item xs={12}>
    //     <Grid container spacing={gridSpacing}>
    //       <Grid item lg={4} md={6} sm={6} xs={12}>
    //         {/* <EarningCard isLoading={isLoading} /> */}
    //       </Grid>
    //       <Grid item lg={4} md={6} sm={6} xs={12}>
    //         {/* <PopularCard isLoading={isLoading} /> */}
    //         {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
    //       </Grid>
    //       <Grid item lg={4} md={12} sm={12} xs={12}>
    //         <Grid container spacing={gridSpacing}>
    //           <Grid item sm={6} xs={12} md={6} lg={12}>
    //             {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
    //           </Grid>
    //           <Grid item sm={6} xs={12} md={6} lg={12}>
    //             {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Grid container spacing={gridSpacing}>
    //       <Grid item xs={12} md={8}>
    //         {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {/* <PopularCard isLoading={isLoading} /> */}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  )
}

export default DashboardSummary