import axios from "axios";
import { checkAuthState } from "../pages/Auth/store/extra_reducers";

const devBaseUrl = 'http://127.0.0.1:3000';

const stagingBaseUrl = 'http://127.0.0.1:5001/sail-courier/us-central1/api';

const prodBaseUrl = 'https://api.sailcourier.com/api';
// const prodBaseUrl = 'https://us-central1-sail-courier.cloudfunctions.net/api';

const baseUrl = import.meta.env.VITE_ENV === "DEV" ? devBaseUrl :
  import.meta.env.VITE_ENV === "STAGING" ? stagingBaseUrl : prodBaseUrl;

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
    try {
      // Check if user is authenticated and get the token
      const user = await checkAuthState(); // Wait until Firebase restores the user state

      // console.log("checkAuthState")
      // console.log("user", user)

      if (user) {
        const userToken = await user.getIdToken(true); // Get a fresh token

        config.headers.Authorization = `Bearer ${userToken}`;
      } else {
        console.log("User Token not Found!");
        // Log the user out if the token is missing
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login page
      }
    } catch (error) {
      console.error("Error getting user token: ", error);
      // Handle error fetching token
      localStorage.clear();
      window.location.href = '/login'; // Redirect to login page if token fetch fails
    }
    
    console.log(config)
    return config;
  },
  function (error) {
    // Handle any error before the request is sent
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    // If the response is successful, simply return it
    console.log(response)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // if (error.response && error.response.status === 401) {
    //   try {
    //     console.log("Not Authorized");

    //     const newAccessToken = await refreshAccessToken(); // Get a new token

    //     // console.log("newAccessToken" , newAccessToken);

    //     API.defaults.headers.Authorization = `Bearer ${newAccessToken}`; // Update the new token to be used for all future requests across the app
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Update the current request header with new token
    //     return API(originalRequest); // Retry the original request
    //   } catch (err) {
    //     console.error('Failed to refresh token:', err);
    //     // Optionally, handle logout or redirection here
    //     // window.location.reload(); // or redirect to login
    //   }
    // }

    return Promise.reject(error); // If it's not a 401 or another error occurs
  }
);