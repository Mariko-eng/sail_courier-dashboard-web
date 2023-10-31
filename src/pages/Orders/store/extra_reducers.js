
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../../firebase/config';
import { baseUrl } from '../../../config/axios';

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/?limit=1000`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchRegularOrders = createAsyncThunk('orders/fetchRegular', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/regular/?limit=1000`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchLaundryOrders = createAsyncThunk('orders/fetchLaundry', async (configs, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/laundry/?limit=1000`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchShoppingOrders = createAsyncThunk('orders/fetchShopping', async (configs, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/shopping/?limit=1000`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrderDetail = createAsyncThunk('orders/getDetail', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/detail/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addRegularorder = createAsyncThunk('orders/addRegular', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLaundryOrder = createAsyncThunk('orders/addLaundry', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//// Order History
export const fetchOrderHistory = createAsyncThunk('orders/fetchOrderHistory', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const response = await axios.get(`${baseUrl}/main/orders/history/list/${id}?limit=1000`);
    // console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addOrderHistory = createAsyncThunk('orders/addOrderHistory', async (data, thunkAPI) => {
  try {
    const payload = {
      order: data.order,
      description: data.description,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString()
    };

    const response = await axios.post(`${baseUrl}/main/orders/history/add/`, payload);
    return {
      id: response.data.id,
      description: data.description,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
