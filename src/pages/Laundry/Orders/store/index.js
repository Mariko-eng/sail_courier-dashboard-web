// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchLaundryorders = createAsyncThunk('order/fetchAll', async (_, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'laundry_orders');
    const response = await getDocs(collectionRef);

    const orders = [];

    for (const item of response.docs) {
      const combinedData = { id: item.id, ...item.data() };
      orders.push(combinedData);
    }

    return orders;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLaundryOrder = createAsyncThunk('order/addorder', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLaundryOrder = createAsyncThunk('order/deleteorder', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'laundry_orders', id);
    await deleteDoc(docRef);
    return {
      success: true,
      messagee: 'Deleted Successfully!'
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

export const laundryOrdersSlice = createSlice({
  name: 'laundryOrder',
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
      .addCase(fetchLaundryorders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaundryorders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchLaundryorders.rejected, errorReducer)

      .addCase(addLaundryOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(addLaundryOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        if (state.edit) {
          state.selectedOrder = action.payload;
          state.orders = state.orders.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, ...action.payload };
            }
            return item;
          });
        } else {
          state.orders.unshift(action.payload);
        }
      })

      .addCase(addLaundryOrder.rejected, errorReducer)

      .addCase(deleteLaundryOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteLaundryOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteLaundryOrder.rejected, errorReducer);
  }
});
export const { clearError, setOrderError, setSubmitted, setEditing } = laundryOrdersSlice.actions;
export default laundryOrdersSlice.reducer;
