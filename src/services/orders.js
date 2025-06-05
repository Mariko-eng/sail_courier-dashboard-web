import { auth } from '../config/firebase';
import { API } from '../utils/api';
import { formatError } from '../utils/axios-error';

let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

if (import.meta.env.VITE_ENV === "STAGING") {
  backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
} else if (import.meta.env.VITE_ENV === "PROD") {
  backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
} 

export const fetch_regular_orders = async (queryString) => {
  try {
    const url = `${backendUrl}/api/main/order-items-regular/?${queryString}`

    console.log("Request Url : " , url)

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};

export const fetch_regular_order_detail = async (id) => {
  try {
    const url = `${backendUrl}/api/main/order-items-regular/${id}/`

    const response = await API.get(url);

    // console.log("response.data", response.data);

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw error;
  }
};

export const approve_regular_order = async (data) => {
  try {
    const id = data.id;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "approved",
      pickedup_by: null,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const assign_courier_to_regular_order = async (data) => {
  try {
    const id = data.id;
    const courierId = data.courierId;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "assigned",
      pickedup_by: courierId,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const re_assign_courier_to_regular_order = async (data) => {
  try {
    const id = data.id;
    const courierId = data.courierId;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "assigned",
      pickedup_by: courierId,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const confirm_regular_order_pickup = async (data) => {
  try {
    const id = data.id;
    const courierId = data.courierId;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "picked_up",
      pickedup_by: courierId,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const confirm_regular_order_delivery = async (data) => {
  try {
    const id = data.id;
    const courierId = data.courierId;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "delivered",
      pickedup_by: null,
      delivered_by: courierId
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const reject_regular_order = async (data) => {
  try {
    const id = data.id;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "rejected",
      pickedup_by: null,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const cancel_regular_order = async (data) => {
  try {
    const id = data.id;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/status/update/`

    const requestData = {
      status: "cancelled",
      pickedup_by: null,
      delivered_by: null
    };

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

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

export const delete_regular_order = async (data) => {
  try {
    const id = data.id;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/delete/`

    // console.log("requestData" , requestData)

    const response = await API.delete(url, requestData);

    return {
      id: id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};

export const reorder_regular_order = async (data) => {
  try {
    const id = data.id;

    const url = `${backendUrl}/api/main/order-items-regular/${id}/clone/`

    const response = await API.post(url);

    return {
      ...response.data
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};


// waybill orders
export const fetch_waybill_orders = async (queryString) => {
  try {
    const url = `${backendUrl}/api/main/orders-waybill/?${queryString}`

    console.log("Request Url : " , url)

    const response = await API.get(url);

    // console.log("response.data", response.data)

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw customAxiosError;
  }
};

export const fetch_waybill_order_detail = async (id) => {
  try {
    const url = `${backendUrl}/api/main/orders-waybill/${id}/`

    const response = await API.get(url);

    // console.log("response.data", response.data);

    return response.data;
  } catch (error) {
    const customAxiosError = formatError(error);
    // console.log(customAxiosError);
    throw error;
  }
};

export const add_waybill_order = async (data) => {
  try {

    const requestData = {
      waybill_corporate_company: data.waybill_corporate_company,
      waybill_pick_up_point: data.waybill_pick_up_point,
      additional_notes: data.additional_notes,
      scheduled_pickup_datetime: null,
    }

    const url = `${backendUrl}/api/main/orders-waybill-create/`

    // console.log("requestData" , requestData)

    const response = await API.post(url, requestData);

    console.log(response)

    return {
      id: response.data.id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};

export const edit_waybill_order = async (data) => {
  try {
    const order_id = data.id;

    const requestData = {
      waybill_pick_up_point: data.waybill_pick_up_point,
      additional_notes: data.additional_notes,
    }

    // console.log("requestData", requestData)

    const url = `${backendUrl}/api/main/orders-waybill/${order_id}/update/`

    const response = await API.patch(url, requestData);

    // console.log(response)

    return {
      id: response.data.id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};

export const add_waybill_order_items = async (data) => {
  try {
    const order_id = data.id;

    const requestData = {
      order_items: data.order_items,
    }

    const url = `${backendUrl}/api/main/orders-waybill/${order_id}/items/create/`

    // console.log("requestData" , requestData)

    const response = await API.put(url, requestData);

    return {
      id: response.data.id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};

export const delete_waybill_order = async (data) => {
  try {
    const order_id = data.id;

    const url = `${backendUrl}/api/main/orders-waybill/${order_id}/delete/`

    // console.log("requestData" , requestData)

    const response = await API.delete(url, requestData);

    return {
      id: id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};

export const delete_waybill_order_item = async (data) => {
  try {
    const order_item_id = data.id;

    const url = `${backendUrl}/api/main/orders-waybill/items/${order_item_id}/delete/`

    // console.log("requestData" , requestData)

    const response = await API.delete(url, requestData);

    return {
      id: id,
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)
    throw customAxiosError;
  }
};



const ordersurl = `/main/orders`;


// export const assign_courier_to_laundry_Order = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       courierId: data.courierId,
//       courierName: data.courierName,
//       courierPhone: data.courierPhone,
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/laundry/update/courier/assign/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'assigned',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const re_assign_courier_to_order = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       courierId: data.courierId,
//       courierName: data.courierName,
//       courierPhone: data.courierPhone,
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/update/courier/re-assign/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_regular_Order_pickup = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/regular/update/confirm-pickup/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'pickedUp',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_laundry_order_pickup = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/laundry/update/confirm-pickup/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'pickedUp',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_shopping_order_pickup = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       courierId: data.courierId,
//       courierName: data.courierName,
//       courierPhone: data.courierPhone,
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/shopping/update/confirm-pickup/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'pickedUp',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_laundry_order_servicing = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/laundry/update/servicing/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'servicing',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_laundry_order_dropping_off = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/laundry/update/dropping-off/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'droppingOff',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const confirm_order_delivery = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/update/confirm-delivery/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'delivered',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const reject_order = async (data) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/update/reject/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'rejected',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const cancel_order = async (data,) => {
//   try {
//     const id = data.id;
//     const orderData = {
//       updatedBy: auth.currentUser.uid,
//       updatedAt: new Date().toISOString()
//     };
//     await API.put(`${ordersurl}/update/cancel/${id}/?env=${env}`, orderData);
//     return {
//       id: data.id,
//       status: 'cancelled',
//       ...orderData
//     };
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

// export const delete_order = async (data) => {
//   try {
//     const id = data.id;

//     await API.delete(`${ordersurl}/delete/${id}/?env=${env}`);
//     return id;
//   } catch (error) {
//     const customAxiosError = formatError(error);
//     console.log(customAxiosError)

//     throw customAxiosError;
//   }
// };

export const toggle_order_payment_status = async (data) => {
  try {
    const id = data.id;
    const isFullyPaid = data.isFullyPaid;
    const orderData = {
      isFullyPaid: isFullyPaid,
      updatedBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    };
    await API.put(`${ordersurl}/payment-status/toggle/${id}/?env=${env}`, orderData);
    return {
      id: data.id,
      isFullyPaid: isFullyPaid,
      ...orderData
    };
  } catch (error) {
    const customAxiosError = formatError(error);
    console.log(customAxiosError)

    throw customAxiosError;
  }
};

