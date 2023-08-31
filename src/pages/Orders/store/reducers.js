import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../../firebase/config';


const ordersurl = 'https://us-central1-sail-courier.cloudfunctions.net/courierApi/main/orders';

export const approveOrder = createAsyncThunk('orders/approveOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/update/approve/${id}`, orderData);
    return {
      id:data.id,
      status:"approved",
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
