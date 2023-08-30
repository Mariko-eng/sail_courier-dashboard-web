// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';
// import toast from 'react-hot-toast';

const ordersurl = "https://us-central1-sail-courier.cloudfunctions.net/courierApi/main/orders"

export const fetchAllOrders = createAsyncThunk('courier/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/?limit=1000`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchRegularOrders = createAsyncThunk('orders/fetchRegular', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/regular/?limit=1000`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const fetchLaundryOrders = createAsyncThunk('orders/fetchLaundry', async (configs, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/laundry/?limit=1000`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const fetchShoppingOrders = createAsyncThunk('orders/fetchShopping', async (configs, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/shopping/?limit=1000`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});



export const getOrderDetail = createAsyncThunk('orders/getDetail', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/detail/${id}`);
    // console.log(response.data);
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


export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id, thunkAPI) => {
  try {
    // await client.delete(`/api/v1/users/delete/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

export const appOrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    submitted: null,
    limit: 1,
    total: 1,
    orders: [],
    edit: false,
    error: null,
    selectedOrder: null
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSubmitted: (state, { payload }) => {
      state.submitted = payload;
    },
    setEditing: (state, { payload }) => {
      state.edit = payload;
    },
    setOrderError: errorReducer
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchAllOrders.rejected, errorReducer)

      .addCase(fetchRegularOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchRegularOrders.fulfilled, (state, action) => {
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchRegularOrders.rejected, errorReducer)

      .addCase(fetchLaundryOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })

      .addCase(fetchLaundryOrders.fulfilled, (state, action) => {
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })

      .addCase(fetchLaundryOrders.rejected, errorReducer)

      .addCase(fetchShoppingOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchShoppingOrders.fulfilled, (state, action) => {
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchShoppingOrders.rejected, errorReducer)

      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(getOrderDetail.rejected, errorReducer)

      .addCase(addRegularorder.pending, (state) => {
        state.loading = true;
      })

      .addCase(addRegularorder.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        if (state.edit) {
          state.selectedOrder = action.payload;
          state.orders = state.orders.map((order) => {
            if (order.id === action.payload.id) {
              return { ...order, ...action.payload };
            }
            return order;
          });
        } else {
          state.orders.unshift(action.payload);
        }
      })

      .addCase(addRegularorder.rejected, errorReducer)

      .addCase(addLaundryOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(addLaundryOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        if (state.edit) {
          state.selectedOrder = action.payload;
          state.orders = state.orders.map((order) => {
            if (order.id === action.payload.id) {
              return { ...order, ...action.payload };
            }
            return order;
          });
        } else {
          state.orders.unshift(action.payload);
        }
      })

      .addCase(addLaundryOrder.rejected, errorReducer)

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => {
          if (order.id !== payload) {
            return order;
          }
        });
      })

      .addCase(deleteOrder.rejected, errorReducer);

  }
});
export const { clearError, setOrderError, setSubmitted, setEditing } = appOrdersSlice.actions;
export default appOrdersSlice.reducer; 
