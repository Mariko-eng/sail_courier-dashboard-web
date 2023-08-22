// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../firebase/config';
import { collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore';

// ** Axios Imports
// import client from '../../../../axios';
// import { generateError } from '@utils';

// import toast from 'react-hot-toast';

export const fetchLaundryItems = createAsyncThunk('item/fetchAll', async (_, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'laundry_items');
    const response = await getDocs(collectionRef);

    const items = [];

    for (const item of response.docs) {
      const combinedData = { id: item.id, ...item.data() };
      items.push(combinedData);
    }

    return items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addLaundryItem = createAsyncThunk('item/addItem', async (data, thunkAPI) => {
  try {
    const collectionRef = collection(db, 'laundry_items');
    const response = await addDoc(collectionRef, data);

    return {
      id: response.id,
      ...data
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLaundryItem = createAsyncThunk('item/deleteItem', async (id, thunkAPI) => {
  try {
    const docRef = doc(db, 'laundry_items', id);
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
    setDataError: errorReducer
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
      .addCase(fetchLaundryItems.rejected, errorReducer)

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

      .addCase(addLaundryItem.rejected, errorReducer)

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

      .addCase(deleteLaundryItem.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = laundryItemsSlice.actions;
export default laundryItemsSlice.reducer;
