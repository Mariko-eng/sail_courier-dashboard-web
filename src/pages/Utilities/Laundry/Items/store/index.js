import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../../../utils/api';

export const fetchLaundryItems = createAsyncThunk('item/fetchAll', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/laundry-items/?host=admin&env=${env}`;

    const response = await API.get(url);

    // console.log(response);
    const items = response.data;
    return items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLaundryItem = createAsyncThunk('item/addItem', async (data, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/laundry-items/new/?host=admin&env=${env}`;

    const response = await API.post(url, data);

    return {
      id: response.data.id,
      ...data
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLaundryItem = createAsyncThunk('item/deleteItem', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/main/laundry-items/delete/${id}/?host=admin&env=${env}`;

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

export const laundryItemsSlice = createSlice({
  name: 'laundryItem',
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
    setSelectedData: (state, { payload }) => {
      state.selectedData = payload;
    },
    setDataError: handleError
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLaundryItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaundryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchLaundryItems.rejected, handleError)

      .addCase(addLaundryItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(addLaundryItem.fulfilled, (state, action) => {
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

      .addCase(addLaundryItem.rejected, handleError)

      .addCase(deleteLaundryItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteLaundryItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteLaundryItem.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing, setSelectedData } = laundryItemsSlice.actions;
export default laundryItemsSlice.reducer;
