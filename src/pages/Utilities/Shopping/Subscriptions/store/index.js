// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchShoppingSubscriptions = createAsyncThunk('subscriptions/fetchAll', async (_, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'shopping_subscriptions');
    const response = await getDocs(collectionRef);

    const Subscriptions = [];

    for (const item of response.docs) {
      const combinedData = { id: item.id, ...item.data() };
      Subscriptions.push(combinedData);
    }

    return Subscriptions;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addShoppingSubscription = createAsyncThunk('subscriptions/addItem', async (data, thunkAPI) => {
  try {
    // const response = await client.post('/api/v1/users/register', data);
    // const msg = data.id ? `User info updated successfully` : `New user registered`;
    // toast.success(msg, { duration: 8000, position: 'top-center' });
    // return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteShoppingSubscription = createAsyncThunk('subscriptions/deleteItem', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'shopping_subscriptions', id);
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

export const shoppingSubscriptionsSlice = createSlice({
  name: 'ShoppingSubscription',
  initialState: {
    loading: false,
    submitted: null,
    total: 1,
    data: [],
    edit: false,
    error: null,
    selectedData: null
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
    setDataError: errorReducer
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchShoppingSubscriptions.rejected, errorReducer)

      .addCase(addShoppingSubscription.pending, (state) => {
        state.loading = true;
      })

      .addCase(addShoppingSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        if (state.edit) {
          state.selectedData = action.payload;
          state.data = state.data.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, ...action.payload };
            }
            return item;
          });
        } else {
          state.data.unshift(action.payload);
        }
      })

      .addCase(addShoppingSubscription.rejected, errorReducer)

      .addCase(deleteShoppingSubscription.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteShoppingSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteShoppingSubscription.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = shoppingSubscriptionsSlice.actions;
export default shoppingSubscriptionsSlice.reducer;
