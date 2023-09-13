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

export const assignCourierToRegularOrder = createAsyncThunk('orders/assignCourierToRegularOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/regular/update/courier/assign/${id}`, orderData);
    return {
      id: data.id,
      status: 'assigned',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const assignCourierToLaundryOrder = createAsyncThunk('orders/assignCourierToLaundryOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/laundry/update/courier/assign/${id}`, orderData);
    return {
      id: data.id,
      status: 'assigned',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const reAssignCourierToOrder = createAsyncThunk('orders/reAssignCourierToOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/update/courier/re-assign/${id}`, orderData);
    return {
      id: data.id,
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const confirmRegularOrderPickUp = createAsyncThunk('orders/confirmRegularOrderPickUp', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/regular/update/confirm-pickup/${id}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const confirmLaundryOrderPickUp = createAsyncThunk('orders/confirmLaundryOrderPickUp', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/laundry/update/confirm-pickup/${id}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const confirmShoppingOrderPickUp = createAsyncThunk('orders/confirmShoppingOrderPickUp', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/shopping/update/confirm-pickup/${id}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const confirmLaundryOrderServicing = createAsyncThunk('orders/confirmLaundryOrderServicing', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/laundry/update/servicing/${id}`, orderData);
    return {
      id: data.id,
      status: 'servicing',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const confirmLaundryOrderDroppingOff = createAsyncThunk('orders/confirmLaundryOrderDroppingOff', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/laundry/update/dropping-off/${id}`, orderData);
    return {
      id: data.id,
      status: 'droppingOff',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const confirmOrderdelivery = createAsyncThunk('orders/confirmOrderdelivery', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/update/confirm-delivery/${id}`, orderData);
    return {
      id: data.id,
      status: 'delivered',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const rejectOrder = createAsyncThunk('orders/rejectOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/update/reject/${id}`, orderData);
    return {
      id: data.id,
      status: 'rejected',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (data, thunkAPI) => {
  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await axios.put(`${ordersurl}/update/approve/${id}`, orderData);
    return {
      id: data.id,
      status: 'cancelled',
      ...orderData
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});