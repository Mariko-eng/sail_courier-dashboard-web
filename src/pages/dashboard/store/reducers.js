
import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatError } from '../../../utils/axios-error';
import { API } from '../../../utils/api';

export const fetchDashboardData = createAsyncThunk('orders/fetchDashboardData', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/dashboard/summary/?host=admin&env=${env}`;

    const response = await API.get(url)
    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});
