
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../config/axios';
import { formatError } from '../../../utils/axios-error';

export const fetchDashboardData = createAsyncThunk('orders/fetchDashboardData', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/dashboard/summary`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});
