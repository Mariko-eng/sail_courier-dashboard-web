// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/config'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchRegularOrders = createAsyncThunk('orders/fetchRegular', async (_, thunkAPI) => {
  try {
    const ordersCollection = collection(db, 'prod_orders');
    const response = await getDocs(ordersCollection);

    const orders = [];

    for (const item of response.docs) {
      const docRef = doc(db, 'prod_orders_regular', item.id);
      const itemDetail = await getDoc(docRef);
      // console.log(itemDetail.data());

      const combinedData = { id: item.id, ...item.data(), ...itemDetail.data() };
      orders.push(combinedData);
    }

    return orders;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const fetchLaundryOrders = createAsyncThunk('orders/fetchLaundry', async (configs, thunkAPI) => {
  try {
    // const { page } = configs;
    // delete configs['page'];
    // let url = `/api/v1/users?page=${page}`;
    // Object.keys(configs).forEach((key) => {
    //   if (configs[key] != null || configs[key] !== '') {
    //     url += `&${key}=${configs[key]}`;
    //   }
    // });
    // const response = await client.get(url);
    // return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrderDetail = createAsyncThunk('orders/getDetail', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'prod_orders', id);
    const docSnap = await getDoc(docRef);

    return { id: id, ...docSnap.data() };

    // const url = `/api/v1/users/${id}`;
    // const response = await client.get(url);
    // return response.data.data;
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
      .addCase(fetchRegularOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegularOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchRegularOrders.rejected, errorReducer)

      .addCase(fetchLaundryOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaundryOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchLaundryOrders.rejected, errorReducer)

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

  }
});
export const { clearError, setOrderError, setSubmitted, setEditing } = appOrdersSlice.actions;
export default appOrdersSlice.reducer; 
