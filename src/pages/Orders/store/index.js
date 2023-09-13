// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  approveOrder,
  assignCourierToRegularOrder,
  assignCourierToLaundryOrder,
  reAssignCourierToOrder,
  confirmRegularOrderPickUp,
  confirmLaundryOrderPickUp,
  confirmShoppingOrderPickUp,
  confirmLaundryOrderServicing,
  confirmLaundryOrderDroppingOff,
  confirmOrderdelivery,
  rejectOrder,
  cancelOrder
} from './reducers';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';
// import toast from 'react-hot-toast';

const ordersurl = 'https://us-central1-sail-courier.cloudfunctions.net/courierApi/main/orders';

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${ordersurl}/?limit=1000`);
    // console.log(response.data);
    // return structuredClone(response.data);
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
    // console.log(response.data);
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
        state.loading = false;
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
        state.loading = false;
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
        state.loading = false;
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
      .addCase(deleteOrder.rejected, errorReducer)

      // Status 1
      .addCase(approveOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(approveOrder.rejected, errorReducer)

      // Status 2
      .addCase(assignCourierToRegularOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignCourierToRegularOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(assignCourierToRegularOrder.rejected, errorReducer)

      // Status 3
      .addCase(assignCourierToLaundryOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignCourierToLaundryOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(assignCourierToLaundryOrder.rejected, errorReducer)

      // Status 4
      .addCase(reAssignCourierToOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(reAssignCourierToOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(reAssignCourierToOrder.rejected, errorReducer)

      // Status 5
      .addCase(confirmRegularOrderPickUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmRegularOrderPickUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmRegularOrderPickUp.rejected, errorReducer)

      // Status 6
      .addCase(confirmLaundryOrderPickUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmLaundryOrderPickUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmLaundryOrderPickUp.rejected, errorReducer)

      // Status 7
      .addCase(confirmShoppingOrderPickUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmShoppingOrderPickUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmShoppingOrderPickUp.rejected, errorReducer)

      // Status 8
      .addCase(confirmLaundryOrderServicing.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmLaundryOrderServicing.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmLaundryOrderServicing.rejected, errorReducer)

      // Status 9
      .addCase(confirmLaundryOrderDroppingOff.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmLaundryOrderDroppingOff.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmLaundryOrderDroppingOff.rejected, errorReducer)

      // Status 10
      .addCase(confirmOrderdelivery.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmOrderdelivery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmOrderdelivery.rejected, errorReducer)

      // Status 10
      .addCase(rejectOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(rejectOrder.rejected, errorReducer)

      // Status 10
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(cancelOrder.rejected, errorReducer);
  }
});
export const { clearError, setOrderError, setSubmitted, setEditing } = appOrdersSlice.actions;
export default appOrdersSlice.reducer;
