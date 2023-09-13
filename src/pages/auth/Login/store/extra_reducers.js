/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../../../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// First, create the thunk
export const loginUser = createAsyncThunk(
  'users/login',
  // eslint-disable-next-line no-unused-vars
  async ({ email, password }, thunkAPI) => {
    // Take two parameters
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response.user)
      // console.log(response.user.uid);
      // console.log(response.user.accessToken);

      // const userData = await getUserData(response.user.uid);

      // console.log(userData)

      // window.localStorage.setItem('accessToken', response.user.accessToken);
      // window.localStorage.setItem('user', JSON.stringify(userData));

      // const data = {
      //   accessToken: response.user.accessToken,
      //   user: userData
      // };

      // return data;
      return { message: 'Logged In Successfully' };
    } catch (error) {
      // You should handle errors here
      //   console.log("Error", error);
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

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, 'admins', userId);
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

// async function getUserData(userId) {
//   try {
//     const docRef = doc(db, 'admins', userId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       console.log('Document data:', docSnap.data());
//       return docSnap.data();
//     } else {
//       // docSnap.data() will be undefined in this case
//       console.log('No such document!');
//       throw 'Document not found!';
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
