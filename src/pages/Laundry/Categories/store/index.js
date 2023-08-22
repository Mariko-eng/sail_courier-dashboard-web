// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../firebase/config';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchLaundryCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'laundry_categories');
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

export const addLaundryCategory = createAsyncThunk('category/addCategory', async (data, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'laundry_categories');
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

export const deleteLaundryCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'laundry_categories', id);
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
    setDataError: errorReducer
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
      .addCase(fetchLaundryCategories.rejected, errorReducer)

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

      .addCase(addLaundryCategory.rejected, errorReducer)

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

      .addCase(deleteLaundryCategory.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = laundryCategoriesSlice.actions;
export default laundryCategoriesSlice.reducer;
