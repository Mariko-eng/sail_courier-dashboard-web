import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';
import { formatError } from '../../../../utils/axios-error';

export const fetchAgents = createAsyncThunk('agent/fetchAll', async (_, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/agents/?env=dev` : `${baseUrl}/users/agents/?env=prod`;
    
    const response = await axios.get(url);

    const agents = response.data;
    return agents;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const addAgent = createAsyncThunk('agent/addNew', async (data, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/agents/new/?env=dev` : `${baseUrl}/users/agents/new/?env=prod`;
    
    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);
    const uniqueNumber = 'SA' + uniqueNo;

    const agentData = {
      applied: false,
      applicationID: '',
      agentNo: uniqueNumber,
      ...data,
      isOnline: false,
      isActive: true,
      rating: 0.0,
      trips: 0.0,
      token: '',
      topic: 'agent',
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    const response = await axios.post(url, agentData);

    return {
      id: response.data.id,
      ...agentData
    };
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const deleteAgent = createAsyncThunk('agent/delete', async (id, thunkAPI) => {
  try {
    const url = import.meta.env.VITE_ENV === "DEV" ? `${baseUrl}/users/agents/delete/${id}/?env=dev` : `${baseUrl}/users/agents/delete/${id}/?env=prod`;
    await axios.delete(url);
    return id;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

// Helper function for handling errors
const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload || 'An unexpected error occurred';
  toast.error(state.error, { position: 'bottom-right' });
};

export const agentsSlice = createSlice({
  name: 'agents',
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
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchAgents.rejected, handleError)

      .addCase(addAgent.pending, (state) => {
        state.loading = true;
      })

      .addCase(addAgent.fulfilled, (state, action) => {
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

      .addCase(addAgent.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload, { position: 'bottom-right' });
      })

      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAgent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = state.data.filter((item) => {
          if (item.id !== payload) {
            return item;
          }
        });
      })

      .addCase(deleteAgent.rejected, handleError);
  }
});
export const { clearError, setDataError, setSubmitted, setEditing } = agentsSlice.actions;
export default agentsSlice.reducer;
