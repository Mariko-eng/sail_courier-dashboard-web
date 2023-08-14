import { createSlice } from "@reduxjs/toolkit";
import authReducer, { loginUser } from "./reducer";
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
    authReducer,
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUser.pending, (state, action) => {
      // Add user to the state array
      // console.log(state);
      console.log(action);
      state.isLoading = true;
      //   state.entities.push(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(state);
      // console.log(action);
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      toast.error("Logged in Successfully", {
              position: "top-right",
            });

    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // Add user to the state array
      // console.log(state);
      console.log(action);
      state.isLoading = false;
      state.user = {};
      
      toast.error("Could not Login Successfully", { position: "bottom-right",});
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { createPost, updatePost, deletePost } = actions;
// Export the reducer, either as a default or named export
export default reducer;
