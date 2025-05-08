import { auth } from '../config/firebase';
import { API } from '../utils/api';
import { formatError } from '../utils/axios-error';

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
  backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
  backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
}


export const fetch_clients_personal = async () => {
  try {
    const url = `${backendUrl}/api/accounts/clients-personal/`

    const response = await API.get(url);

    console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};

export const fetch_clients_corporate = async () => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/`

    const response = await API.get(url);

    console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const fetch_corporate_companies = async () => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/companies/`

    const response = await API.get(url);

    console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const fetch_corporate_company_user_accounts = async (company_id) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/?company_id=${company_id}`

    const response = await API.get(url);

    console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};