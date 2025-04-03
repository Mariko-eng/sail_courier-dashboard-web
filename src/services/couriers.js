import { auth } from '../config/firebase';
import { API } from "../utils/api";
import { formatError } from "../utils/axios-error";

export const fetch_couriers = async () => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/users/couriers/?host=admin&env=${env}`;

    const response = await API.get(url);

    return response.data;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    throw customAxiosError;
  }
};

export const add_courier = async (data) => {
  try {
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/users/couriers/new/?host=admin&env=${env}`;

    const timestamp = Date.now().toString();
    const uniqueNo = timestamp.substring(4, 12);
    const uniqueNumber = 'SC' + uniqueNo;

    const courierData = {
      applied: false,
      applicationID: '',
      courierNo: uniqueNumber,
      firstName: data.firstName,
      userName: data.firstName,
      surName: data.surName,
      fullNames: data.surName,
      imageFormat: data.imageFormat,
      imageBase64: data.imageBase64,
      phone: data.phone,
      homeDistrict: data.homeDistrict,
      homeVillage: data.homeVillage,
      email: data.email,
      password: data.password,
      IDType: data.IDType,
      IDNumber: data.IDNumber,
      courierType: data.courierType,
      positionLat: 0.34759,
      positionLng: 32.5825,
      isOnline: false,
      isActive: true,
      plate: '',
      vehicle: 'Motor Bike',
      rating: 0.0,
      trips: 0.0,
      token: '',
      topic: 'courier',
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };

    const response = await API.post(url, courierData);

    return {
      id: response.data.id,
      ...courierData
    };
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    throw customAxiosError;
  }
};

export const delete_courier = async (id) => {
  try {    
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    
    const url = `/users/couriers/delete/${id}/?host=admin&env=${env}`;

    await API.delete(url)
    return id;
  } catch (error) {
    // Format and reject with the formatted error
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    throw customAxiosError;
  }
};