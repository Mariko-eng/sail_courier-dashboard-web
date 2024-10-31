import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { formatError } from '../../../../utils/axios-error';
import { API } from '../../../../utils/api';

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (query, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchOrdersToday = createAsyncThunk('orders/fetchOrdersToday', async (query, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchRegularOrders = createAsyncThunk('orders/fetchRegular', async (query, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/regular/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/laundry/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const fetchShoppingOrders = createAsyncThunk('orders/fetchShopping', async (query, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/shopping/?host=admin&env=${env}&${query}`;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const getOrderDetail = createAsyncThunk('orders/getDetail', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/detail/${id}/?host=admin&env=${env}`;

    const response = await API.get(url);
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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const id = data.id;

    const url = `/main/orders/history/list/${id}/?host=admin&env=${env}`;

    const response = await API.get(url);
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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/orders/history/add/?host=admin&env=${env}`;

    const payload = {
      order: data.order,
      description: data.description,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString()
    };

    const response = await API.post(url, payload);
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
