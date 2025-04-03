/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { fetch_couriers } from '../../../services/couriers';

const SelectCourier = ({ selectedCourier, setSelectedCourier, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [couriers, setCouriers] = useState([]);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetch_couriers();
      setCouriers(results);
    } catch (error) {
      console.error('Error fetching data: ', error);
      // Optional: Set error state and display message to the user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])


  const handleSelect = (courier) => {
    setSelectedCourier(courier);
    onSelect();
  };

  return (
    <Box>
      <Box my={2}>
        <Typography variant="h4" component="h2">Select Courier</Typography>
      </Box>

      {loading && (
        <Box display={"flex"} justifyContent={"center"} my={2}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {/* Scrollable Container for couriers */}
      <Box 
        my={2} 
        sx={{
          overflowY: 'auto',   // Make it scrollable
        }}
      >
        {couriers.map((obj) => (
          <Paper key={obj.id} sx={{ mb: '20px', p: 2, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box flex={1}>{obj.courierNo}</Box>
              <Box display={'flex'} flex={2} flexDirection={'column'} alignItems={'center'}>
                <Box>
                  {obj.firstName} {obj.surName}
                </Box>
                <Box>{obj.phone}</Box>
              </Box>
              <Box flex={1}>
                <Button 
                  color={selectedCourier ? "secondary" : "primary"}
                  onClick={() => handleSelect(obj)}
                >
                  Select
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SelectCourier;
