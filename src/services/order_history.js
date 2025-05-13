import { auth } from '../config/firebase';
import { API } from "../utils/api";
import { formatError } from "../utils/axios-error";

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
    backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
    backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
}

export const fetch_order_history = async (data) => {
    try {
        const id = data.id;

        const url = `${backendUrl}/api/main/order-items-regular/history/list/?order_item_id=${id}`

        const response = await API.get(url);

        console.log("response.data", response.data)

        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        // console.log(customAxiosError);
        throw customAxiosError;
    }
};


export const add_order_history = async (data) => {
    try {
        const id = data.order.id;
        const description = data.description;

        const url = `${backendUrl}/api/main/order-items-regular/history/create/`

        const requestData = {
            order_item: id,
            description: description,
        };

        // console.log("requestData" , requestData)

        const response = await API.post(url, requestData);

        return {
            id: response.data.id,
            ...requestData
        };
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError)
        throw customAxiosError;
    }
};

