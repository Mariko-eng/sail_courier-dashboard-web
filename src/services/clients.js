import { auth } from '../config/firebase';
import { API } from '../utils/api';
import { formatError } from '../utils/axios-error';

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
  backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
  backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
}


export const fetch_clients_personal = async (queryString) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-personal/?${queryString}`

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};

export const fetch_clients_corporate = async (queryString) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/?${queryString}`

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const fetch_corporate_company_user_accounts = async (company_id, queryString) => {
  try {
    let url = `${backendUrl}/api/accounts/clients-corporate/?company_id=${company_id}`;

    if (queryString) {
      url += `&${queryString}`; // Safely append query parameters like page, search, etc.
    }

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const fetch_corporate_companies = async (queryString) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/companies/?${queryString}` 

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const add_corporate_company = async (data) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/companies/create/`

    const requestData = {
      name: data.companyName,
      email: data.companyEmail,
      phone: data.companyPhone,
      phone2: "",
      website: data.companyWebsite,
      tin_no: data.companyTinNumber,
      address_place_name: data.companyAddressPlaceName,
      address_place_id: data.companyAddressPlaceId,
      address_place_lat: data.companyAddressCordinatesLat,
      address_place_lng: data.companyAddressCordinatesLng,
      form_20_base64: data.companyForm20ImageBase64,
      contact_person_name: data.contactPersonName,
      contact_person_email: data.contactPersonEmail,
      contact_person_phone: data.contactPersonPhone,
      billing_email: data.billingEmail
    };

    const response = await API.post(url, requestData);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};


export const add_client_corporate = async (data) => {
  try {
    const url = `${backendUrl}/api/accounts/clients-corporate/create/`

    const requestData = {
      company_id: data.company_id,
      account_type: data.corporate_account_type,
      username: data.username,
      phone : data.phone,
      email : data.email,
      password : data.password,
    };

    const response = await API.post(url, requestData);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};

