import { auth } from '../config/firebase';
import { API } from '../utils/api';
import { formatError } from '../utils/axios-error';

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
  backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
  backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
}

export const fetch_courier_users = async (queryString) => {
  try {
    const url = `${backendUrl}/api/accounts/couriers/?${queryString}`

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};



export const add_courier_user = async (data) => {
  try {    
    const url = `${backendUrl}/api/accounts/couriers/create/`

    const requestData = {
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
      courier_type: data.courierType,
      vehicle_number: "",
    }

    const response = await API.post(url, requestData);

    return {
      id: response.data.id,
      ...requestData
    };
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    throw customAxiosError;
  }
};

