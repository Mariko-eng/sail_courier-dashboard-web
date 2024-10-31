import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../../../utils/api';


export const fetchShoppingItems = createAsyncThunk('item/fetchAll', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/shopping-items/?host=admin&env=${env}`;

    const response = await API.get(url);

    const items = response.data;
    return items; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addShoppingItem = createAsyncThunk('item/addItem', async (data, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/shopping-items/new/?host=admin&env=${env}`;

    const response = await API.post(url, data);

    return {
      id: response.data.id,
      ...data
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteShoppingItem = createAsyncThunk('item/deleteItem', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/shopping-items/delete/${id}/?host=admin&env=${env}`;

    const response = await API.delete(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

export const shoppingItemsSlice = createSlice({
  name: 'shoppingItem',
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
    setDataError: handleError
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchShoppingItems.rejected, handleError)

      .addCase(addShoppingItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(addShoppingItem.fulfilled, (state, action) => {
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

      .addCase(addShoppingItem.rejected, handleError)

      .addCase(deleteShoppingItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteShoppingItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteShoppingItem.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = shoppingItemsSlice.actions;
export default shoppingItemsSlice.reducer;
