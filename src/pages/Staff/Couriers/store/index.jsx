/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';
import toast from 'react-hot-toast';

export const fetchCouriers = createAsyncThunk('courier/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/couriers/`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addCourier = createAsyncThunk('courier/addNew', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/couriers/new`;
    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);
    const uniqueNumber = 'SC' + uniqueNo;

    const courierData = {
      applied: false,
      applicationID: '',
      courierNo: uniqueNumber,
      surName: data.surName,
      firstName: data.firstName,
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

    // console.log('response.data');
    // console.log(response.data);

    return {
      id: response.id,
      ...courierData
    };
  } catch (error) {
    // console.log(error);
    // console.log(error.response.data.message);

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

export const deleteCourier = createAsyncThunk('courier/delete', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/couriers/delete/${id}`;
    await axios.delete(url)
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
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
    setDataError: errorReducer
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
      .addCase(fetchCouriers.rejected, errorReducer)

      .addCase(addCourier.pending, (state) => {
        state.loading = true;
      })

      .addCase(addCourier.fulfilled, (state, action) => {
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

      .addCase(addCourier.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(deleteCourier.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCourier.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== payload)
      })

      .addCase(deleteCourier.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = CouriersSlice.actions;
export default CouriersSlice.reducer;
