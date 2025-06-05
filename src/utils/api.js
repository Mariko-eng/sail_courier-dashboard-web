import axios from "axios";
import { checkAuthState } from "../pages/Auth/store/extra_reducers";
import { clearStoredToken } from "./auth";

export const API = axios.create({ 
  headers: { 
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 50000 // 5 minutes  
});


// API.interceptors.request.use(
//   async function (config) {
//     try {
//       // Check if user is authenticated and get the token
//       const user = await checkAuthState(); // Wait until Firebase restores the user state

//       if (user) {
//         const userToken = await user.getIdToken(true); // Get a fresh token

//         config.headers.Authorization = `Bearer ${userToken}`;
//       } else {
//         console.log("User Token not Found!");
//         // Log the user out if the token is missing
//         localStorage.clear();
//         window.location.href = '/login'; // Redirect to login page
//       }
//     } catch (error) {
//       console.error("Error getting user token: ", error);
//       // Handle error fetching token
//       localStorage.clear();
//       window.location.href = '/login'; // Redirect to login page if token fetch fails
//     }
    
//     // console.log(config)
//     return config;
//   },
//   function (error) {
//     // Handle any error before the request is sent
//     return Promise.reject(error);
//   }
// );


// API.interceptors.response.use(
//   (response) => {
//     // If the response is successful, simply return it
//     // console.log(response)
//     return response;
//   },
//   async (error) => {
//     return Promise.reject(error); // If not a 401 or after retries
//   }
// );


let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token) {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
}

API.interceptors.request.use(
  async function (config) {
    try {
      const user = await checkAuthState();

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = await checkAuthState();

        if (!user) {
          throw new Error("User not authenticated");
        }

        // If refresh is already in progress, queue this request
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(API(originalRequest));
            });
          });
        }

        isRefreshing = true;

        const newToken = await user.getIdToken(true);
        const decodedToken = await user.getIdTokenResult();
        storeToken(newToken, decodedToken.claims.exp - decodedToken.claims.iat);

        onRefreshed(newToken); // Resume queued requests

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clearStoredToken();
        window.location.href = '/login'; // Redirect ONLY if refresh fails
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
