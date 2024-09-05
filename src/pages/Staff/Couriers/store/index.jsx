import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';
import { formatError } from '../../../../utils/axios-error';

export const fetchCouriers = createAsyncThunk('courier/fetchAll', async (_, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/couriers/?env=dev` : `${baseUrl}/users/couriers/?env=prod`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const addCourier = createAsyncThunk('courier/addNew', async (data, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/couriers/new/?env=dev` : `${baseUrl}/users/couriers/new/?env=prod`;
    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);
    const uniqueNumber = 'SC' + uniqueNo;

    const courierData = {
      applied: false,
      applicationID: '',
      courierNo: uniqueNumber,
      firstName: data.firstName,
      userName: data.firstName,
      surName: data.surName,
      fullNames: data.surName,
      imageFormat: data.imageFormat,
      imageBase64: data.imageBase64,
      phone: data.phone,
      homeDistrict: data.homeDistrict,
      homeVillage: data.homeVillage,
      email: data.email,
      password: data.password,
      IDType: data.IDType,
      IDNumber: data.IDNumber,
      courierType: data.courierType,
      positionLat: 0.34759,
      positionLng: 32.5825,
      isOnline: false,
      isActive: true,
      plate: '',
      vehicle: 'Motor Bike',
      rating: 0.0,
      trips: 0.0,
      token: '',
      topic: 'courier',
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    const response = await axios.post(url, courierData);

    return {
      id: response.data.id,
      ...courierData
    };
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const deleteCourier = createAsyncThunk('courier/delete', async (id, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/couriers/delete/${id}/?env=dev` : `${baseUrl}/users/couriers/delete/${id}/?env=prod`;
    await axios.delete(url)
    return id;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

export const CouriersSlice = createSlice({
  name: 'couriers',
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
      .addCase(fetchCouriers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchCouriers.rejected, handleError)

      .addCase(addCourier.pending, (state) => {
        state.loading = true;
        state.submitted = false;
        state.error = null;
      })

      .addCase(addCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        state.error = null;
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

      .addCase(addCourier.rejected, (state, { payload }) => {
        state.loading = false;
        state.submitted = false;
        state.error = payload;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(deleteCourier.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCourier.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== payload)
      })

      .addCase(deleteCourier.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = CouriersSlice.actions;
export default CouriersSlice.reducer;
