import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logOutUser } from "./extra_reducers";
import toast from "react-hot-toast";

const initialUser = () => {
  const item = window.localStorage.getItem("user");
  return item ? JSON.parse(item) : {};
};

const initialAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken ? accessToken : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    user: initialUser(),
    accessToken: initialAccessToken()
  },

  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      window.localStorage.setItem('accessToken', action.payload.accessToken);
      window.localStorage.setItem('user', JSON.stringify(action.payload.user));
      
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      
      toast.success('Logged in Successfully', { position: 'top-right' });
    },
    clearUser: (state) => {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('accessToken');
      state.user = {};
      state.accessToken = null;
    },
    logout: (state) => {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('accessToken');
      state.user = {};
      state.accessToken = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      window.localStorage.setItem('accessToken', action.payload.accessToken);
      window.localStorage.setItem('user', JSON.stringify(action.payload.user));
      toast.success('Logged in Successfully', { position: 'top-right' });
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.accessToken = null;
      const errorMessage = action.payload?.message || 'Could not Login Successfully';
      toast.error(errorMessage, { position: 'bottom-right' });
    });

    builder.addCase(logOutUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.accessToken = null;
      toast.success(action.payload.message, { position: 'top-right' });
    });

    builder.addCase(logOutUser.rejected, (state, action) => {
      state.isLoading = false;
      const errorMessage = action.payload?.message || 'Could not Logout Successfully';
      toast.error(errorMessage, { position: 'bottom-right' });
    });
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { setIsLoading, setUser, clearUser, logout } = actions;
// Export the reducer, either as a default or named export
export default reducer;
