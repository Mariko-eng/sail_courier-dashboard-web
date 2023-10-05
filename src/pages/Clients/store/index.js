/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchCorporateCompanies, addCorporateCompany, deleteCorporateCompany } from './extra_reducers';
import { fetchClientsCorporate, addClientCorporate } from './extra_reducers';
import { fetchClientsPersonal, deleteClient } from './extra_reducers';


const errorReducer = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    loading: false,
    submitted: null,
    total: 1,
    data: [],
    dataCompanies : [],
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
      .addCase(fetchCorporateCompanies.pending, (state) => { // Fetch Corp Company
        state.loading = true;
      })
      .addCase(fetchCorporateCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.dataCompanies = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchCorporateCompanies.rejected, errorReducer)

      .addCase(addCorporateCompany.pending, (state) => { // Add Corp Company
        state.loading = true;
      })

      .addCase(addCorporateCompany.fulfilled, (state, action) => {
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

      .addCase(addCorporateCompany.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(deleteCorporateCompany.pending, (state) => {// Delete Corp Company
        state.loading = true;
      })

      .addCase(deleteCorporateCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteCorporateCompany.rejected, errorReducer)

      .addCase(fetchClientsCorporate.pending, (state) => { // Fetch Corp Clients
        state.loading = true;
      })

      .addCase(fetchClientsCorporate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchClientsCorporate.rejected, errorReducer)

      .addCase(addClientCorporate.pending, (state) => { // Add Corp Client
        state.loading = true;
      })

      .addCase(addClientCorporate.fulfilled, (state, action) => {
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

      .addCase(addClientCorporate.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(fetchClientsPersonal.pending, (state) => { // Fetch Personal Client
        state.loading = true;
      })
      .addCase(fetchClientsPersonal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchClientsPersonal.rejected, errorReducer)

      .addCase(deleteClient.pending, (state) => { // Delete Client
        state.loading = true;
      })

      .addCase(deleteClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteClient.rejected, errorReducer);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = clientsSlice.actions;
export default clientsSlice.reducer;
