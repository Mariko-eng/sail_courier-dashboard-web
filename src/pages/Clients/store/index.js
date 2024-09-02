/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  fetchCorporateCompanies,
  addCorporateCompany,
  deleteCorporateCompany,
  fetchClientsCorporate,
  addClientCorporate,
  fetchClientsPersonal,
  deleteClient
} from './extra_reducers';

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

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    loading: false,
    submitted: null,
    total: 1,
    data: [],
    dataCompanies: [],
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
      .addCase(fetchCorporateCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCorporateCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.dataCompanies = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchCorporateCompanies.rejected, handleError)

      .addCase(addCorporateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCorporateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        updateData(state, action);
        toast.success('Corporate company added successfully', { position: 'top-right' });
      })
      .addCase(addCorporateCompany.rejected, (state, { payload }) => {
        state.loading = false;
        handleError(state, { payload });
      })

      .addCase(deleteCorporateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCorporateCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== payload);
        toast.success('Corporate company deleted successfully', { position: 'top-right' });
      })
      .addCase(deleteCorporateCompany.rejected, handleError)

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

      .addCase(fetchClientsPersonal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientsPersonal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchClientsPersonal.rejected, handleError)

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

export const { clearError, setDataError, setSubmitted, setEditing } = clientsSlice.actions;
export default clientsSlice.reducer;
