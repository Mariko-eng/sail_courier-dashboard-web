import axios from "axios";
import { refreshAccessToken } from "../pages/Auth/Login/store/extra_reducers";

const devBaseUrl = 'http://127.0.0.1:3000';

const prodBaseUrl = 'https://us-central1-sail-courier.cloudfunctions.net/courierApi';

const baseUrl = import.meta.env.VITE_ENV === "DEV" ? devBaseUrl : prodBaseUrl;

export const API = axios.create({
  baseURL: baseUrl + "/admin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", 
  },
  timeout: 50000 // 5 minutes
});

API.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // console.log(config);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("User Token not Found!");
      console.log("Logout");
      window.location.reload();
    }
    return config;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    // If the response is successful, simply return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        console.log("Not Authorized");

        const newAccessToken = await refreshAccessToken(); // Get a new token

        // console.log("newAccessToken" , newAccessToken);

        API.defaults.headers.Authorization = `Bearer ${newAccessToken}`; // Update the new token to be used for all future requests across the app
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Update the current request header with new token
        return API(originalRequest); // Retry the original request
      } catch (err) {
        console.error('Failed to refresh token:', err);
        // Optionally, handle logout or redirection here
        // window.location.reload(); // or redirect to login
      }
    }

    return Promise.reject(error); // If it's not a 401 or another error occurs
  }
);