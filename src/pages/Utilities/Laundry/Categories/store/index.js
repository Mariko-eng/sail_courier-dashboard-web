import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../config/axios';

export const fetchLaundryCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/laundry-categories/`;
    const response = await axios.get(url);

    const categories = response.data;
    return categories;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLaundryCategory = createAsyncThunk('category/addCategory', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/laundry-categories/new`;

    const newCategory = {
      name: data.name
    };

    const response = await axios.post(url, newCategory);

    // console.log(response)
    // console.log(response.data);

    return {
      id: response.data.id,
      ...newCategory
    };
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLaundryCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/laundry-categories/delete/${id}`;
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

export const laundryCategoriesSlice = createSlice({
  name: 'laundryCategory',
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
      .addCase(fetchLaundryCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaundryCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchLaundryCategories.rejected, handleError)

      .addCase(addLaundryCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(addLaundryCategory.fulfilled, (state, action) => {
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

      .addCase(addLaundryCategory.rejected, handleError)

      .addCase(deleteLaundryCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteLaundryCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteLaundryCategory.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = laundryCategoriesSlice.actions;
export default laundryCategoriesSlice.reducer;
