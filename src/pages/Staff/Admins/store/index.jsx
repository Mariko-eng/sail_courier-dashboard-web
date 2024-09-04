import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';

export const fetchAdmins = createAsyncThunk('admin/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/admins/`;
    const response = await axios.get(url);

    // console.log('response.data');
    // console.log(response.data);

    const admins = response.data;
    return admins;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addAdmin = createAsyncThunk('admin/addNew', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/admins/new`;
    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);
    const uniqueNumber = 'SD' + uniqueNo;

    const adminData = {
      adminNo: uniqueNumber,
      ...data,
      isActive: true,
      isStaff: true,
      isSuperAdmin: false,
      topic: 'admin',
      token: "",
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    // console.log(adminData)

    const response = await axios.post(url, adminData);

    return {
      id: response.id,
      ...adminData
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    if (error.response.status == 400) {
      if (error.response.data.message) {
        return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
      }
    } else {
      return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    }

    return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

export const deleteAdmin = createAsyncThunk('admin/delete', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/admins/delete/${id}`;
    await axios.delete(url);
    return id;
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

export const adminsSlice = createSlice({
  name: 'admins',
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
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchAdmins.rejected, handleError)

      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(addAdmin.fulfilled, (state, action) => {
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

      .addCase(addAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteAdmin.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = adminsSlice.actions;
export default adminsSlice.reducer;
