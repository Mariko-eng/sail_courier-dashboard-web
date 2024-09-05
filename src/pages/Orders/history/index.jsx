/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { prettyDate } from '../../../utils/app-functions';

// Store
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory, addOrderHistory } from '../store/reducers/extra_reducers';


// import AnimateButton1 from '../../../ui-component/extended/AnimateButton';
// import AnimateButton from '../';


// eslint-disable-next-line react/prop-types
const OrderHistory = ({ order }) => {
  const [ desc, setDesc ] = useState("");
  const [ descError, setDescError] = useState('');
  const [ submitting, setSubmitting] = useState('');
  const dispatch = useDispatch();

  const store = useSelector((state) => state.allOrders);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    dispatch(fetchOrderHistory({ id: order.id }));
  }, [dispatch, order]);

  const handleSubmit = () => {
    if(desc.length < 10) {
      return setDescError("Should Be At Least 10 Characters!")
    }else{
      setDescError('');
    }

    const data = {
      order: order,
      description: desc
    };

    console.log(data)
    dispatch(addOrderHistory(data));
    setSubmitting(false);
    setDesc("");
  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box height="10px" />
      <Typography variant="h4" component="h2">
        Order Tracking History
      </Typography>
      <Box height="20px" />
      <div>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Update Tracking Information"
          multiline
          maxRows={4}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </div>
      {Boolean(descError) && <Box sx={{ color: 'red' }}>{descError}</Box>}
      <Box height="20px" />
      {/* <AnimateButton> */}
        <LoadingButton
          disableElevation
          loading={store.loading}
          disabled={store.loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </LoadingButton>

      {store.orderHistory.map((item, index) => (
        <Box key={index} mb={'10px'} mt={'10px'} color={'white'} p={2} sx={{ background: 'blue', borderRadius: '10px' }}>
          <Box mt={1}>{item.description}</Box>
          <Box mt={2} display={'flex'} justifyContent={'end'} color={'cornsilk'}>
            {prettyDate(item.createdAt)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
