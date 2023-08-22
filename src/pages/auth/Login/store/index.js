import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logOutUser } from "./extra_reducers";
import toast from "react-hot-toast";

const initialUser = () => {
  const item = window.localStorage.getItem("user");
  // console.log(item)
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

const initialAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken ? accessToken : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: initialUser(),
    accessToken: initialAccessToken(),
  },

  reducers: {
    logout: (state) => {
      state.user = {}
      state.accessToken = null
    }
  },

  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      toast.error('Logged in Successfully', {
        position: 'top-right'
      });
    });

    // eslint-disable-next-line no-unused-vars
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.accessToken = null;
      toast.error('Could not Login Successfully', { position: 'bottom-right' });
    });

    // eslint-disable-next-line no-unused-vars
    builder.addCase(logOutUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.accessToken = null;
      toast.error(action.payload.message, {position: 'top-right'});
    });

    // eslint-disable-next-line no-unused-vars
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Could not Logout Successfully', { position: 'bottom-right' });
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { createPost, updatePost, deletePost } = actions;
// Export the reducer, either as a default or named export
export default reducer;
