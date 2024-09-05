import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  approveOrder,
  reAssignCourierToOrder,
  confirmOrderdelivery,
  rejectOrder,
  cancelOrder,
  deleteOrder,
  toggleOrderPaymentStatus
} from '../reducers/reducers';
import {
  fetchAllOrders,
  fetchOrdersToday,
  fetchOrdersLatest,
  getOrderDetail,
  fetchOrderHistory,
  addOrderHistory
} from '../reducers/extra_reducers'

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

const handleErrorToday = (state, { payload }) => {
    state.loadingTotal = false;
    state.error = payload || 'An unexpected error occurred';
    toast.error(state.error, { position: 'bottom-right' });
  };

  const handleErrorLatest = (state, { payload }) => {
    state.loadingLatest = false;
    state.error = payload || 'An unexpected error occurred';
    toast.error(state.error, { position: 'bottom-right' });
  };

export const allOrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    loadingToday: false,
    loadingLatest: false,
    submitted: null,
    limit: 1,
    limitToday: 1,
    limitLatest: 1,
    total: 1,
    totalToday: 1,
    totalLatest: 1,
    orders: [],
    ordersToday: [],
    ordersLatest: [],
    orderHistory: [],
    edit: false,
    error: null,
    selectedOrder: null
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
    setOrderError: handleError
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchAllOrders.rejected, handleError)

      .addCase(fetchOrdersToday.pending, (state) => {
        state.loadingToday = true;
        state.ordersToday = [];
      })
      .addCase(fetchOrdersToday.fulfilled, (state, action) => {
        state.loadingToday = false;
        state.limitToday = action.payload.limit;
        state.totalToday = action.payload.total;
        state.ordersToday = action.payload.entries;
      })
      .addCase(fetchOrdersToday.rejected, handleErrorToday)

      .addCase(fetchOrdersLatest.pending, (state) => {
        state.loadingLatest = true;
        state.ordersLatest = [];
      })
      .addCase(fetchOrdersLatest.fulfilled, (state, action) => {
        state.loadingLatest= false;
        state.limitLatest = action.payload.limit;
        state.totalLatest = action.payload.total;
        state.ordersLatest = action.payload.entries;
      })
      .addCase(fetchOrdersLatest.rejected, handleErrorLatest)

      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(getOrderDetail.rejected, handleError)

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => {
          if (order.id !== payload) {
            return order;
          }
        });
      })
      .addCase(deleteOrder.rejected, handleError)

      // Status 1
      .addCase(approveOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(approveOrder.rejected, handleError)


      // Status 4
      .addCase(reAssignCourierToOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(reAssignCourierToOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(reAssignCourierToOrder.rejected, handleError)

      // Status 10
      .addCase(confirmOrderdelivery.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmOrderdelivery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmOrderdelivery.rejected, handleError)

      // Status 10
      .addCase(rejectOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(rejectOrder.rejected, handleError)

      // Status 10
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(cancelOrder.rejected, handleError)

      // Payment status 10
      .addCase(toggleOrderPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleOrderPaymentStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(toggleOrderPaymentStatus.rejected, handleError)

      // Historu
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.orderHistory = [];
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        // state.limit = action.payload.limit;
        // state.total = action.payload.total;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addOrderHistory.pending, (state) => {
        state.loading = true;
      })

      .addCase(addOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        state.orderHistory.unshift(action.payload);
      })

      .addCase(addOrderHistory.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      });

  }
});
export const { clearError, setOrderError, setSubmitted, setEditing } = allOrdersSlice.actions;
export default allOrdersSlice.reducer;
