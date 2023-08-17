// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../firebase/config';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchShoppingCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'shopping_categories');
    const response = await getDocs(collectionRef);

    const categories = [];

    for (const item of response.docs) {
      const combinedData = { id: item.id, ...item.data() };
      categories.push(combinedData);
    }

    return categories;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addShoppingCategory = createAsyncThunk('category/addCategory', async (data, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'shopping_categories');
    const newCategory = {
      name: data.name
    };

    const response = await addDoc(collectionRef, newCategory);

    return {
      id: response.id,
      name: data.name
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteShoppingCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'shopping_categories', id);
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
    setDataError: errorReducer
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
      .addCase(fetchShoppingCategories.rejected, errorReducer)

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

      .addCase(addShoppingCategory.rejected, errorReducer)

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

      .addCase(deleteShoppingCategory.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = shoppingCategoriesSlice.actions;
export default shoppingCategoriesSlice.reducer;
