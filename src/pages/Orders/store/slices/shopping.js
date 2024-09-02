// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  approveOrder,
  reAssignCourierToOrder,
  confirmShoppingOrderPickUp,
  confirmOrderdelivery,
  rejectOrder,
  cancelOrder,
  deleteOrder,
  toggleOrderPaymentStatus
} from '../reducers/reducers';
import {
  fetchAllOrders,
  fetchShoppingOrders,
  getOrderDetail,
  fetchOrderHistory,
  addOrderHistory
} from '../reducers/extra_reducers'

// ** Axios Imports
// import toast from 'react-hot-toast';

const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

export const shoppingOrdersSlice = createSlice({
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
    setOrderError: errorReducer
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
      .addCase(fetchAllOrders.rejected, errorReducer)

      .addCase(fetchShoppingOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(fetchShoppingOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.orders = action.payload.entries;
      })
      .addCase(fetchShoppingOrders.rejected, errorReducer)

      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(getOrderDetail.rejected, errorReducer)


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
      .addCase(deleteOrder.rejected, errorReducer)

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
      .addCase(approveOrder.rejected, errorReducer)

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
      .addCase(reAssignCourierToOrder.rejected, errorReducer)

      // Status 7
      .addCase(confirmShoppingOrderPickUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmShoppingOrderPickUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = state.orders.map((order) => {
          if (order.id === payload.id) {
            return { ...order, ...payload };
          }
          return order;
        });
      })
      .addCase(confirmShoppingOrderPickUp.rejected, errorReducer)


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
      .addCase(confirmOrderdelivery.rejected, errorReducer)

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
      .addCase(rejectOrder.rejected, errorReducer)

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
      .addCase(cancelOrder.rejected, errorReducer)

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
      .addCase(toggleOrderPaymentStatus.rejected, errorReducer)

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
export const { clearError, setOrderError, setSubmitted, setEditing } = shoppingOrdersSlice.actions;
export default shoppingOrdersSlice.reducer;
