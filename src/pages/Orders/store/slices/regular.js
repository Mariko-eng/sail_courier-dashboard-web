import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  approveOrder,
  assignCourierToRegularOrder,
  reAssignCourierToOrder,
  confirmRegularOrderPickUp,
  confirmOrderdelivery,
  rejectOrder,
  cancelOrder,
  deleteOrder,
  toggleOrderPaymentStatus
} from '../reducers/reducers';
import {
  fetchAllOrders,
  fetchRegularOrders,
  getOrderDetail,
  addRegularorder,
  fetchOrderHistory,
  addOrderHistory
} from '../reducers/extra_reducers'

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

export const regularOrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    submitted: null,
    limit: 1,
    total: 1,
    orders: [],
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

      .addCase(fetchRegularOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchRegularOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchRegularOrders.rejected, handleError)

      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(getOrderDetail.rejected, handleError)

      .addCase(addRegularorder.pending, (state) => {
        state.loading = true;
      })

      .addCase(addRegularorder.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        if (state.edit) {
          state.selectedOrder = action.payload;
          state.orders = state.orders.map((order) => {
            if (order.id === action.payload.id) {
              return { ...order, ...action.payload };
            }
            return order;
          });
        } else {
          state.orders.unshift(action.payload);
        }
      })

      .addCase(addRegularorder.rejected, handleError)

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

      // Status 2
      .addCase(assignCourierToRegularOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignCourierToRegularOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(assignCourierToRegularOrder.rejected, handleError)

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

      // Status 5
      .addCase(confirmRegularOrderPickUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmRegularOrderPickUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmRegularOrderPickUp.rejected, handleError)

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
export const { clearError, setOrderError, setSubmitted, setEditing } = regularOrdersSlice.actions;
export default regularOrdersSlice.reducer;
