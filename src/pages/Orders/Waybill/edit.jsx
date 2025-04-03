// CustomerForm to edit customer details
import React, { useState, useEffect, useCallback } from 'react';

// material-ui
import { Box, Button, Paper } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { useParams } from 'react-router-dom';

// third party
import { API } from '../../../utils/api';
import { formatError } from '../../../utils/axios-error';
import { auth } from '../../../config/firebase';
import OrderItemsForm from './_components/order_items_form';
import { prettyDate } from '../../../utils/app-functions';

const WaybillOrdersEdit = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const fetchData = useCallback(async () => {
        console.log("Fetching Data")
        try {
            const order = await getOrderDetail(id);
            setOrderData(order); // Store the fetched data
            setLoading(false); // Set loading to false once the data is fetched
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            console.log("Error fetching data: ", error);
        }
    }, [id]);

    // Effect to fetch data on mount and when `id` changes
    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        fetchData();
    }, [id, fetchData]);

    // Function to manually trigger data fetching (e.g., on refresh)
    const handleRefresh = async () => {
        setLoading(true); // Set loading to true on refresh
        await fetchData(); // Fetch the latest data
    };


    if (loading && orderData === null) {
        return <p>Loading...</p>; // Show loading while data is being fetched
    }

    if (!loading && orderData === null) {
        return <p>No Data Found</p>;
    }

    // console.log("orderData", orderData)

    return (
        <div>
            {loading && <>Loading...</>}
            
            <OrderForm orderDetails={orderData} onRefresh={handleRefresh} />

            <OrderItemsForm orderDetails={orderData} onRefresh={handleRefresh} />

            {
                orderData?.isPublished === false && orderData?.orderItems?.length >= 1 && (
                    <Box my={4} display={"flex"} justifyContent={"space-between"}>

                        <DownloadPdfButton orderId={id} />

                        <div style={{marginLeft: "10px", width: "200px" }}>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    // loading={isSubmitting}
                                    // disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Publish
                                </LoadingButton>
                            </AnimateButton>
                        </div>
                    </Box>
                )
            }
        </div>
    )
}

export default WaybillOrdersEdit;


const OrderForm = ({ orderDetails, onRefresh }) => {

    // const [isEditing, setIsEditing] = useState(false);

    // const userStore = useSelector((store) => store.auth);

    return (
        <div>
            <Box display={"flex"} paddingX={2} my={1} flexDirection={"row"} justifyContent="space-between">
                <h4>Waybill Order</h4>
                <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
                    <h4 style={{ color: 'blue' }}>No : {orderDetails?.orderTrackerNo}</h4>
                    <h6>{orderDetails?.createdAt ? prettyDate(orderDetails?.createdAt) : "N/A"}</h6>
                </Box>
            </Box>

            <Paper sx={{ p: 2 }}>
                <Box display={"flex"} justifyContent="space-between">
                    <h3>Delivery Info</h3>
                    {/* <Button onClick={() => setIsEditing((prev) => !prev)}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button> */}
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                    <div><strong>Pickup Point:</strong></div>
                    <div>{orderDetails?.warehouse?.name || "N/A"}</div>
                    <div>{orderDetails?.warehouse?.warehouseAddressPlaceName || "N/A"}</div>
                </Box>
                <Box display={"flex"} mt={"10px"} flexDirection={"column"}>
                    <div><strong>Additional Notes:</strong></div>
                    <div>{orderDetails?.additionalNotes || "N/A"}</div>
                </Box>
            </Paper>
        </div>
    );
};

const getOrderDetail = async (id) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/detail/${id}/?host=admin&env=${env}`;

        const response = await API.get(url);

        // console.log("response.data", response.data);

        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        // console.log(customAxiosError);
        throw error;
    }
};

const printPdf = async (id) => {
    try {
        console.log("Printing PDF ...");

        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/waybill/download-pdf/${id}/?host=admin&env=${env}`;

        await API.get(url);
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError);
        throw error;
    }
};

const updateWaybillOrder = async (prevData, newData) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/waybill/update/${prevData.id}/?host=admin&env=${env}`;

        const { id, createdAt, createdBy, ...restPrevData } = prevData;

        const payload = {
            ...restPrevData,

            companyId: newData.company.id,
            warehouseId: newData.warehouseId,
            additionalNotes: newData.additionalNotes,  // Corrected the typo here
            createdBy: auth.currentUser.uid,
            updatedBy: auth.currentUser.uid,

        };

        console.log("payload", payload);

        const response = await API.put(url, payload);

        console.log("response", response);

        // return {
        //     ...response.data,
        //     ...payload,
        // };
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError);
        throw error;
    }
};


const DownloadPdfButton = ({ orderId }) => {
    const devBaseUrl = 'http://127.0.0.1:3000';
    const prodBaseUrl = 'https://us-central1-sail-courier.cloudfunctions.net/api';
  
    // Determine the environment dynamically
    const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
    const baseUrl = import.meta.env.VITE_ENV === "DEV" ? devBaseUrl : prodBaseUrl;
  
    // Construct the full URL to the download endpoint
    const link = `${baseUrl}/extra/orders/waybill/download-pdf/${orderId}?host=admin&env=${env}`;
  
    return (
      <div>
        <Button variant="outlined" color="primary" href={link} target="_blank" >Download PDF</Button>
      </div>
    );
};
  
