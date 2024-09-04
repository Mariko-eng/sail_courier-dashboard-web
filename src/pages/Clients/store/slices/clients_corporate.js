/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  fetchClientsCorporate,
  addClientCorporate,
  deleteClient
} from '../reducers/extra_reducers';

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

// Helper function to update or add data
const updateData = (state, action) => {
  if (state.edit) {
    state.selectedData = action.payload;
    state.data = state.data.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
  } else {
    state.data.unshift(action.payload);
  }
};

export const corporateClientsSlice = createSlice({
  name: 'corporate_clients',
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
      .addCase(fetchClientsCorporate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientsCorporate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchClientsCorporate.rejected, handleError)

      .addCase(addClientCorporate.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClientCorporate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        updateData(state, action);
        toast.success('Corporate client added successfully', { position: 'top-right' });
      })
      .addCase(addClientCorporate.rejected, (state, { payload }) => {
        state.loading = false;
        handleError(state, { payload });
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== payload);
        toast.success('Client deleted successfully', { position: 'top-right' });
      })
      .addCase(deleteClient.rejected, handleError);
  }
});

export const { clearError, setDataError, setSubmitted, setEditing } = corporateClientsSlice.actions;
export default corporateClientsSlice.reducer;
