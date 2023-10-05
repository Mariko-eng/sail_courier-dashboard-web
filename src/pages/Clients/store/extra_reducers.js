import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../../firebase/config';
import { baseUrl } from '../../../config/axios';

// Corporate Companies

export const fetchCorporateCompanies = createAsyncThunk('client/corporate/companies/fetch/all', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/corporate/companies`;
    // const url = '${baseUrl}/users/corporate/companies';
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addCorporateCompany = createAsyncThunk('client/corporate/companies/add/new', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/corporate/companies/new'`;

    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);

    const companyData = {
      companyNo: uniqueNo,
      companyAddress: data.companyAddress,
      companyAddressCordinates: data.companyAddressCordinates,
      companyAddressPlaceId: data.companyAddressPlaceId,
      companyEmail: data.companyEmail,
      companyForm20: data.companyForm20,
      companyName: data.companyName,
      companyTele: data.companyTele,
      companyTinNumber: data.companyTinNumber,
      companyWebsite: data.companyWebsite,
      contactPersonEmail: data.contactPersonEmail,
      contactPersonName: data.contactPersonName,
      contactPersonPhone: data.contactPersonPhone,
      isActive: true,
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    const response = await axios.post(url, companyData);
    return {
      id: response.id,
      ...companyData
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    if (error.response.status == 400) {
      if (error.response.data.message) {
        return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
      }
    } else {
      return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    }

    return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

export const deleteCorporateCompany = createAsyncThunk('client/corporate/companies/delete', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/corporate/companies/delete/${id}`;
    await axios.delete(url);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


// Clients - Corporate

export const fetchClientsCorporate = createAsyncThunk('client/corporate/fetch/all', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/clients/corporate`;
    const response = await axios.get(url);
    // console.log(response.data)

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addClientCorporate = createAsyncThunk('client/corporate/add/new', async (data, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/clients/corporate/new`;
    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);

    const clientData = {
      accountType: 'corporate',
      company: data.company,
      username: data.username + uniqueNo,
      phone: data.phone,
      email: data.email,
      password: data.password,
      isActive: true,
      isPhoneVerified: false,
      token: '',
      topic: 'client',
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    // console.log(clientData);

    const response = await axios.post(url, clientData);

    return {
      id: response.id,
      ...clientData
    };
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);

    if (error.response.status == 400) {
      if (error.response.data.message) {
        return thunkAPI.rejectWithValue(`Error creating user: ${error.response.data.message}`);
      }
    } else {
      return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
    }

    return thunkAPI.rejectWithValue(`Error creating user: ${error.message}`);
  }
});

// Clients - Personal

export const fetchClientsPersonal = createAsyncThunk('client/personal/fetch/all', async (_, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/clients/personal`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Clients - All

export const deleteClient = createAsyncThunk('client/delete', async (id, thunkAPI) => {
  try {
    const url = `${baseUrl}/users/clients/delete/${id}`;
    await axios.delete(url);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
