import { auth } from '../config/firebase';
import { API } from "../utils/api";
import { formatError } from "../utils/axios-error";

const env = import.meta.env.VITE_ENV === "PROD" ? 'prod' : 'dev';

//// Order History
export const fetch_order_history = async (data) => {
    try {
        const id = data.id;

        const url = `/main/orders/history/list/${id}/?env=${env}`;

        const response = await API.get(url);
        // console.log(response);
        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError)

        throw customAxiosError;
    }
};

export const add_order_history = async (data) => {
    try {
        const url = `/main/orders/history/add/?env=${env}`;

        const payload = {
            order: data.order,
            description: data.description,
            createdBy: auth.currentUser.uid,
            createdAt: new Date().toISOString()
        };

        const response = await API.post(url, payload);
        return {
            id: response.data.id,
            description: data.description,
            createdBy: auth.currentUser.uid,
            createdAt: new Date().toISOString()
        };
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError)

        throw customAxiosError;
    }
};