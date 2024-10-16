import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { baseUrl } from '../../../../config/axios';
import { formatError } from '../../../../utils/axios-error';

// Corporate Companies

export const fetchCorporateCompanies = createAsyncThunk('client/corporate/companies/fetch/all', async (_, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/corporate/companies/?env=dev`;
    const prodUrl = `${baseUrl}/users/corporate/companies/?env=prod`;

    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;
    
    // const url = '${baseUrl}/users/corporate/companies';
    const response = await axios.get(url);

    // console.log(response.data);

    return response.data;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


export const addCorporateCompany = createAsyncThunk('client/corporate/companies/add/new', async (data, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/corporate/companies/new/?env=dev`;
    const prodUrl = `${baseUrl}/users/corporate/companies/new/?env=prod`;

    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    const companyData = {
      companyName: data.companyName,
      companyPhone: data.companyPhone,
      companyEmail: data.companyEmail,
      // companyTele: data.companyTele,
      // companyAddress: data.companyAddress,
      // companyAddressCordinates: data.companyAddressCordinates,
      companyAddressPlaceId: data.companyAddressPlaceId,
      companyAddressPlaceName: data.companyAddressPlaceName,
      companyAddressCordinatesLat: data.companyAddressCordinatesLat,
      companyAddressCordinatesLng: data.companyAddressCordinatesLng,
      companyForm20ImageFormat : data.companyForm20ImageFormat,
      companyForm20ImageBase64 : data.companyForm20ImageBase64,
      companyTinNumber: data.companyTinNumber,
      companyWebsite: data.companyWebsite,
      contactPersonEmail: data.contactPersonEmail,
      contactPersonName: data.contactPersonName,
      contactPersonPhone: data.contactPersonPhone,
      isActive: true,
      createdBy: auth.currentUser.uid,
      // createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      // updatedAt: new Date().toISOString()
    };

    const response = await axios.post(url, companyData);

    // console.log({
    //   ...response.data,
    //   ...companyData
    // })

    return {
      // id: response.data.id,
      ...response.data,
      ...companyData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // if (error.response.status == 400) {
    //   if (error.response.data.message) {
    //     return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
    //   }
    // } else {
    //   return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    // }

    // return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

export const deleteCorporateCompany = createAsyncThunk('client/corporate/companies/delete', async (id, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/corporate/companies/delete/${id}/?env=dev`;
    const prodUrl = `${baseUrl}/users/corporate/companies/delete/${id}/?env=prod`;

    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    await axios.delete(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});


// Clients - Corporate

export const fetchClientsCorporate = createAsyncThunk('client/corporate/fetch/all', async (_, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/corporate/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/corporate/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    const response = await axios.get(url);
    // console.log(response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});

export const addClientCorporate = createAsyncThunk('client/corporate/add/new', async (data, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/corporate/new/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/corporate/new/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    const clientData = {
      companyId: data.company.id,
      corporate_account_type: data.corporate_account_type,
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
      createdBy: auth.currentUser.uid,
      // createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      // updatedAt: new Date().toISOString()
    };


    const response = await axios.post(url, clientData);

    return {
      // id: response.data.id,
      ...response.data,
      company: data.company,
      ...clientData,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // if (error.response.status == 400) {
    //   if (error.response.data.message) {
    //     return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
    //   }
    // } else {
    //   return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    // }

    // return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

// Clients - Personal

export const fetchClientsPersonal = createAsyncThunk('client/personal/fetch/all', async (_, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/personal/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/personal/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    const response = await axios.get(prodUrl);

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});

// Clients - All

export const activateClient = createAsyncThunk('client/activateClient', async (id, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/activate/${id}/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/activate/${id}/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    await axios.put(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});

export const deactivateClient = createAsyncThunk('client/deactivateClient', async (id, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/deactivate/${id}/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/deactivate/${id}/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    await axios.put(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});

export const deleteClient = createAsyncThunk('client/delete', async (id, thunkAPI) => {
  try {
    const devUrl = `${baseUrl}/users/clients/delete/${id}/?env=dev`;
    const prodUrl = `${baseUrl}/users/clients/delete/${id}/?env=prod`;
    
    const url = import.meta.env.VITE_ENV === "DEV" ? devUrl : prodUrl;

    await axios.delete(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);

    // return thunkAPI.rejectWithValue(error);
  }
});
