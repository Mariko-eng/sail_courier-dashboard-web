/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  fetchClientsPersonal,
  activateClient,
  deactivateClient,
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

export const personalClientsSlice = createSlice({
  name: 'personal_clients',
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
      .addCase(fetchClientsPersonal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientsPersonal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchClientsPersonal.rejected, handleError)

      .addCase(activateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.data = state.data.filter((item) => item.id !== payload);
        toast.success('Client activated successfully', { position: 'top-right' });
      })
      .addCase(activateClient.rejected, handleError)

      .addCase(deactivateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deactivateClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.data = state.data.filter((item) => item.id !== payload);
        toast.success('Client deactivated successfully', { position: 'top-right' });
      })
      .addCase(deactivateClient.rejected, handleError)

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

export const { clearError, setDataError, setSubmitted, setEditing } = personalClientsSlice.actions;
export default personalClientsSlice.reducer;
