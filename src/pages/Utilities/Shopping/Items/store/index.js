// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../../../config/axios';


export const fetchShoppingItems = createAsyncThunk('item/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/shopping-items/`;
    const response = await axios.get(url);

    const items = response.data;
    return items; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addShoppingItem = createAsyncThunk('item/addItem', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/main/shopping-items/new`;

    const response = await axios.post(url, data);

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
    const url = `${baseUrl}/main/shopping-items/delete/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
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
    setDataError: errorReducer
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
      .addCase(fetchShoppingItems.rejected, errorReducer)

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

      .addCase(addShoppingItem.rejected, errorReducer)

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

      .addCase(deleteShoppingItem.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = shoppingItemsSlice.actions;
export default shoppingItemsSlice.reducer;
