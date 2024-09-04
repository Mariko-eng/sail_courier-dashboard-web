import axios from 'axios';
import toast from 'react-hot-toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';

export const fetchAgents = createAsyncThunk('agent/fetchAll', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/agents/`;
    const response = await axios.get(url);

    // console.log('response.data');
    // console.log(response.data);

    const agents = response.data;
    return agents;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addAgent = createAsyncThunk('agent/addNew', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/agents/new`;
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

    // console.log(agentData)

    const response = await axios.post(url, agentData);

    return {
      id: response.id,
      ...agentData
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    if (error.response.status == 400) {
      if (error.response.data.message) {
        return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
      }
    } else {
      return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    }

    return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

export const deleteAgent = createAsyncThunk('agent/delete', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/agents/delete/${id}`;
    await axios.delete(url);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
