import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { formatError } from '../../../../utils/axios-error';
import { API } from '../../../../utils/api';

const ordersurl = `/main/orders`;

export const approveOrder = createAsyncThunk('orders/approveOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/update/approve/${id}/?host=admin&env=${env}`, orderData);
    return {
      id:data.id,
      status:"approved",
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const assignCourierToRegularOrder = createAsyncThunk('orders/assignCourierToRegularOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/regular/update/courier/assign/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'assigned',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


export const assignCourierToLaundryOrder = createAsyncThunk('orders/assignCourierToLaundryOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/laundry/update/courier/assign/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'assigned',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const reAssignCourierToOrder = createAsyncThunk('orders/reAssignCourierToOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/update/courier/re-assign/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const confirmRegularOrderPickUp = createAsyncThunk('orders/confirmRegularOrderPickUp', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/regular/update/confirm-pickup/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


export const confirmLaundryOrderPickUp = createAsyncThunk('orders/confirmLaundryOrderPickUp', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/laundry/update/confirm-pickup/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


export const confirmShoppingOrderPickUp = createAsyncThunk('orders/confirmShoppingOrderPickUp', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      courierId: data.courierId,
      courierName: data.courierName,
      courierPhone: data.courierPhone,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/shopping/update/confirm-pickup/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'pickedUp',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const confirmLaundryOrderServicing = createAsyncThunk('orders/confirmLaundryOrderServicing', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/laundry/update/servicing/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'servicing',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


export const confirmLaundryOrderDroppingOff = createAsyncThunk('orders/confirmLaundryOrderDroppingOff', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/laundry/update/dropping-off/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'droppingOff',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const confirmOrderdelivery = createAsyncThunk('orders/confirmOrderdelivery', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/update/confirm-delivery/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'delivered',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const rejectOrder = createAsyncThunk('orders/rejectOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/update/reject/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'rejected',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const orderData = {
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/update/approve/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      status: 'cancelled',
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;

    await API.delete(`${ordersurl}/delete/${id}/?host=admin&env=${env}`);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
    }
});

export const toggleOrderPaymentStatus = createAsyncThunk('orders/toggleOrderPayment', async (data, thunkAPI) => {
  const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

  try {
    const id = data.id;
    const isFullyPaid = data.isFullyPaid;
    const orderData = {
      isFullyPaid: isFullyPaid,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/payment-status/toggle/${id}/?host=admin&env=${env}`, orderData);
    return {
      id: data.id,
      isFullyPaid: isFullyPaid,
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});