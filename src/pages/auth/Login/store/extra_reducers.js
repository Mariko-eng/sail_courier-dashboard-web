/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../../../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { query, collection, where, doc, getDocs, getDoc } from 'firebase/firestore';

const adminsCollection = "admins";

// First, create the thunk
export const loginUser = createAsyncThunk(
  'users/login',
  // eslint-disable-next-line no-unused-vars
  async ({ email, password }, thunkAPI) => {
    // Take two parameters
    try {
      // Check if the email exists in the admins collection
      const q = query(collection(db, adminsCollection), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return thunkAPI.rejectWithValue({ message: 'Sorry, Account does not exist' });
      }

      const response = await signInWithEmailAndPassword(auth, email, password);

      // Get user data after successful login
      const userData = await getUserData(response.user.uid);

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
      return { message : "Signed Out Successfully!"};
    } catch (error) {
      // You should handle errors here
      //   console.log("Error", error);
      return thunkAPI.rejectWithValue({ message: 'Failed to logout' });
    }
  }
);

export const refreshAccessToken = async () => {

  // console.log("auth.currentUser", auth.currentUser);

  const user = auth.currentUser;
  if (user) {
    try {
      // Get a new token
      const token = await user.getIdToken(true);
      localStorage.setItem('accessToken', token); // Store new token
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error; // Handle errors as needed
    }
  }
  throw new Error('User not authenticated');
};

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, adminsCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      throw 'Document not found!';
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
