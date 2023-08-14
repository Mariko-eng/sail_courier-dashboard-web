// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWTE7uURYIjzOJHIbXI4O7r9TnIf8OP6U",
  authDomain: "sail-courier.firebaseapp.com",
  projectId: "sail-courier",
  storageBucket: "sail-courier.appspot.com",
  messagingSenderId: "846499441905",
  appId: "1:846499441905:web:8e9b2d780100936d600d50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const auth = getAuth();
export const db = getFirestore();


export default app;
