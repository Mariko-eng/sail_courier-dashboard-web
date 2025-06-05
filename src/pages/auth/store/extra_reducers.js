/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API } from '../../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { clearStoredToken, getStoredToken, storeToken } from '../../../utils/auth';

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
  backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
  backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
}

// First, create the thunk
export const loginUser = createAsyncThunk(
  'users/login',
  // eslint-disable-next-line no-unused-vars
  async ({ email, password }, thunkAPI) => {
    // Take two parameters
    try {
      // Check if the email exists
      var exists = await CheckIfUserIsAdmin(email)
      if (exists == false) {
        return thunkAPI.rejectWithValue({ message: 'Sorry, Account does not exist' });
      }

      const response = await signInWithEmailAndPassword(auth, email, password);

      // Get user data after successful login
      const userData = await getUserData(response.user.uid);

      // console.log("userData" , userData);

      return {
        message: 'Logged In Successfully',
        accessToken: response.user.accessToken,
        user: userData
      };
    } catch (error) {
      // You should handle errors here
      console.log("Error", error);
      return thunkAPI.rejectWithValue({ message: 'Failed to login' });
    }
  }
);

// First, create the thunk
export const logOutUser = createAsyncThunk(
  'users/logout',
  // eslint-disable-next-line no-unused-vars
  async (thunkAPI) => {
    // Take two parameters
    try {
      await signOut(auth);
      localStorage.clear();
      return { message: "Signed Out Successfully!" };
    } catch (error) {
      // You should handle errors here
      //   console.log("Error", error);
      return thunkAPI.rejectWithValue({ message: 'Failed to logout' });
    }
  }
);


export const refreshAccessToken = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          localStorage.setItem('accessToken', token); // Store new token
          resolve(token);
        } catch (error) {
          console.error('Error refreshing token:', error);
          reject(error);
        }
      } else {
        reject('User not authenticated');
      }
    });
  });
};

export const getUserData = async () => {
  try {
    const url = `${backendUrl}/api/accounts/user-admin/signin/`

    const response = await API.post(url);

    const {user} = response.data;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetUserPassword = async (email) => {
  try {
    // Check if the email exists
    var exists = await CheckIfUserIsAdmin(email)
    if (exists == false) {
      throw `Error sending the reset link. Admin account with email *${email}* was not found!`;
    } else {
      // If the email exists, proceed with sending the password reset email
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent!');
      return "success";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Function to handle the user authentication state
// export const checkAuthState = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         // If the user is authenticated, resolve the promise with the user info
//         resolve(user);
//       } else {
//         // If the user is not authenticated, resolve with null or reject
//         resolve(null);
//       }
//       unsubscribe(); // Unsubscribe after getting the result
//     });
//   });
// };


export const CheckIfUserIsAdmin = async (email) => {
  try {

    const url = `${backendUrl}/api/accounts/user-admin/check/`

    const data = {
      "email": email
    };

    const response = await axios.post(url, data);

    const { status, roles } = response.data;

    if (status == false) {
      throw "User is not an admin";
    } else {
      // roles is an array of strings
      if (roles.includes("app_admin")) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("User is not an admin");
    // throw error;
  }
} 

export const checkAuthState = async () => {
  try {
    // First check if we have a valid stored token
    const storedToken = getStoredToken();
    
    if (storedToken && storedToken.expiresAt > Date.now()) {
      // Return a mock user object with the stored token
      return {
        getIdToken: async () => storedToken.token
      };
    }
    
    // If no valid token, get fresh from Firebase
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      });
    });
    
    if (user) {
      // Get fresh token and store it
      const token = await user.getIdToken();
      const decodedToken = await user.getIdTokenResult();
      storeToken(token, decodedToken.claims.exp - decodedToken.claims.iat);
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error checking auth state:', error);
    clearStoredToken();
    return null;
  }
};
