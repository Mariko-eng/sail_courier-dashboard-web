import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchDashboardData } from './reducers';


// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,

    totalYearlyCount: 0,
    totalYearlyRevenue: 0,
    monthlyOrders: [],

    last30DaysOrdersCount: 0,
    last30DaysRevenue: 0,
    last30DaysOrders: [],


    last7DaysOrdersCount: 0,
    last7DaysRevenue: 0,
    last7DaysOrders: [],

    todayOrdersCount: 0,
    todayRevenue: 0,
    todayOrders: [],

    clientsCount: 0,
    couriersCount: 0,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalYearlyCount = action.payload.totalYearlyCount;
        state.totalYearlyRevenue = action.payload.totalYearlyRevenue;
        state.monthlyOrders = action.payload.monthlyOrders;

        state.last30DaysOrdersCount = action.payload.last30DaysOrdersCount;
        state.last30DaysRevenue = action.payload.last30DaysRevenue;
        state.last30DaysOrders = action.payload.last30DaysOrders;

        state.last7DaysOrdersCount = action.payload.last7DaysOrdersCount;
        state.last7DaysRevenue = action.payload.last7DaysRevenue;
        state.last7DaysOrders = action.payload.last7DaysOrders;

        state.todayOrdersCount = action.payload.todayOrdersCount;
        state.todayRevenue = action.payload.todayRevenue;
        state.todayOrders = action.payload.todayOrders;

        state.clientsCount = action.payload.clientsCount;
        state.couriersCount = action.payload.couriersCount;
      })
      .addCase(fetchDashboardData.rejected, handleError);
  }
});

export default dashboardSlice.reducer;
