
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';
import { formatError } from '../../../../utils/axios-error';

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/?${query}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchOrdersToday = createAsyncThunk('orders/fetchOrdersToday', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/?${query}`;

    // console.log(url)

    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchOrdersLatest = createAsyncThunk('orders/fetchOrdersLatest', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/?${query}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchRegularOrders = createAsyncThunk('orders/fetchRegular', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/regular/?${query}`;
    // return {
    //   limit : 1000,
    //   total : 0,
    //   entries : []
    // };

    // console.log("fetchRegularOrders");
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchLaundryOrders = createAsyncThunk('orders/fetchLaundry', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/laundry/?${query}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchShoppingOrders = createAsyncThunk('orders/fetchShopping', async (query, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/orders/shopping/?${query}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const getOrderDetail = createAsyncThunk('orders/getDetail', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/main/orders/detail/${id}`);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const addRegularorder = createAsyncThunk('orders/addRegular', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const addLaundryOrder = createAsyncThunk('orders/addLaundry', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
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
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
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
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});
