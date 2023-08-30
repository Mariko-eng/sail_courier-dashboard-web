import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCouriers } from '../../Staff/Couriers/store';
import { Box, Card } from '@mui/material';
import { Button } from 'react-bootstrap';

const SelectCourier = () => {
  const dispatch = useDispatch();

  const couriersStore = useSelector((state) => state.couriers);

  const data = couriersStore.data;

//   console.log(data)

  const newLoadList = structuredClone(data);

  useEffect(() => {
    dispatch(fetchCouriers());
  }, [dispatch]);

  return (
    <div>
      <p>Select Courier</p>

      {newLoadList.map((obj) => (
        <div key={obj.id}>
          <Card sx={{ mb:"20px" }}>
            <Box display={'flex'} justifyContent={"space-between"}>
              <Box flex={1}>{obj.courierNo}</Box>
              <Box display={'flex'} flex={2} flexDirection={'column'} alignItems={"center"}>
                <Box>
                  {obj.firstName} {obj.surName}
                </Box>
                <Box>{obj.phone}</Box>
              </Box>
              <Box flex={1}><Button>Select</Button></Box>
            </Box>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCourier;
