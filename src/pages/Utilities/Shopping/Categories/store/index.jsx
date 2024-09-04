import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../config/axios';

export const fetchShoppingCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/shopping-categories/`;
    const response = await axios.get(url);

    const categories = response.data;
    return categories;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addShoppingCategory = createAsyncThunk('category/addCategory', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/shopping-categories/new`;

    const newCategory = {
      name: data.name
    }; 

    const response = await axios.post(url, newCategory);

    return {
      id: response.data.id,
      ...newCategory
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteShoppingCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/shopping-categories/delete/${id}`;
    const response = await axios.delete(url);
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

export const shoppingCategoriesSlice = createSlice({
  name: 'shoppingCategory',
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
      .addCase(fetchShoppingCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchShoppingCategories.rejected, handleError)

      .addCase(addShoppingCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(addShoppingCategory.fulfilled, (state, action) => {
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

      .addCase(addShoppingCategory.rejected, handleError)

      .addCase(deleteShoppingCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteShoppingCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteShoppingCategory.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = shoppingCategoriesSlice.actions;
export default shoppingCategoriesSlice.reducer;
