import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebase';
import { formatError } from '../../../../utils/axios-error';
import { API } from '../../../../utils/api';

// Corporate Companies

export const fetchCorporateCompanies = createAsyncThunk('client/corporate/companies/fetch/all', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/users/corporate/companies/?host=admin&env=${env}`;
    
    const response = await API.get(url);

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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/corporate/companies/new/?host=admin&env=${env}`;

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

    const response = await API.post(url, companyData);

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
  }
});

export const deleteCorporateCompany = createAsyncThunk('client/corporate/companies/delete', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/corporate/companies/delete/${id}/?host=admin&env=${env}`;

    await API.delete(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});


// Clients - Corporate

export const fetchClientsCorporate = createAsyncThunk('client/corporate/fetch/all', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/corporate/?host=admin&env=${env}`;

    const response = await API.get(url);

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
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/corporate/new/?host=admin&env=${env}`;

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


    const response = await API.post(url, clientData);

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
  }
});

// Clients - Personal

export const fetchClientsPersonal = createAsyncThunk('client/personal/fetch/all', async (_, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/personal/?host=admin&env=${env}`;

    const response = await API.get(url);

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

// Clients - All

export const activateClient = createAsyncThunk('client/activateClient', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/activate/${id}/?host=admin&env=${env}`;

    await API.put(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const deactivateClient = createAsyncThunk('client/deactivateClient', async (id, thunkAPI) => {
  try {    
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/deactivate/${id}/?host=admin&env=${env}`;

    await API.put(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});

export const deleteClient = createAsyncThunk('client/delete', async (id, thunkAPI) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';

    const url = `/users/clients/delete/${id}/?host=admin&env=${env}`;

    await API.delete(url);
    return id;
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    return thunkAPI.rejectWithValue(customAxiosError.errorMessage);
  }
});
