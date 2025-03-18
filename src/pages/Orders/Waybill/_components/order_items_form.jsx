import React, { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { v4 as uuidv4 } from 'uuid';

import { API } from '../../../../utils/api';
import { useSelector } from 'react-redux';
import { auth } from '../../../../config/firebase';
import { formatError } from '../../../../utils/axios-error';
import OrderItemTable from './order_items_table';
import NewWaybillOrderItemFormModal from './new_order_items_form_modal';


const OrderItemsForm = ({ orderDetails, onRefresh }) => {
    const [isEditing, setIsEditing] = useState(false); // Define the isEditing state

    const userStore = useSelector((store) => store.auth);

    const loggedInUser = userStore.user;

    return (
        <Box my={3}>
            <Paper sx={{ padding: "10px", marginBottom: "10px" }}>
                <Box display={"flex"} justifyContent="space-between">
                    <h3>Delivery Items</h3>

                    {/* <NewWaybillOrderItemFormModal orderDetails={orderDetails} onRefresh={onRefresh} /> */}
                </Box>

                {orderDetails?.orderItems.length < 1 && (
                    <Box mt={2}>
                        <hr />
                        <p>No Items Found!</p>
                    </Box>
                )}
            </Paper>

            <OrderItemTable orderDetails={orderDetails} onRefresh={onRefresh} />

            {/* {isEditing && (
                <Formik
                    initialValues={{
                        name: '',
                        deliveryLocation: '',
                        receiverName: '',
                        receiverPhone: '',
                        totalPackageWeight: 0,
                        itemsPerPackageCount: 1,
                        totalPackagesCount: 1,
                    }}

                    validationSchema={Yup.object().shape({
                        name: Yup.string().min(3).max(25).required('Name is required'),
                        deliveryLocation: Yup.string().min(3).max(25).required('Delivery Location is required'),
                        receiverName: Yup.string().min(3).max(25).required('Receiver name is required'),
                        receiverPhone: Yup.string().min(3).max(25).required('Receiver Phone is required'),
                        totalPackageWeight: Yup.number().min(0).required('Total Package Weight is required'),
                        itemsPerPackageCount: Yup.number().min(1).required('Number of items per package count is required'),
                        totalPackagesCount: Yup.number().min(1).required('Total packages count is required')
                    })}

                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                            setSubmitting(true);

                            const newOrderItem = addItemToOrder(values);  // Generate new order item with a unique ID
                            const updatedOrderItems = [...orderDetails.orderItems, newOrderItem];

                            // Now update the orderDetails with the new orderItems list
                            let data = {
                                company: loggedInUser.company,
                                warehouseId: orderDetails.warehouseId,
                                additionalNotes: orderDetails.additionalNotes,
                                orderItems: updatedOrderItems
                            };

                            console.log(data);

                            await updateWaybillOrderItems(orderDetails, data);

                            onRefresh();

                        } catch (err) {
                            console.error(err);
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }}

                >

                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Paper style={{ marginTop: "10px" }}>
                                <Box display="flex" flexDirection="column" p={"20px"}>
                                    <Typography style={{ marginBottom: "10px" }}>Add New Order item</Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                                                <InputLabel htmlFor="outlined-name">Name of item</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-name"
                                                    type="text"
                                                    value={values.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Name"
                                                    inputProps={{}}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id="helper-text-name">
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                                            <FormControl fullWidth error={Boolean(touched.deliveryLocation && errors.deliveryLocation)}>
                                                <InputLabel htmlFor="outlined-deliveryLocation">Delivery Location</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-deliveryLocation"
                                                    type="text"
                                                    value={values.deliveryLocation}
                                                    name="deliveryLocation"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Delivery Location"
                                                    inputProps={{}}
                                                />
                                                {touched.deliveryLocation && errors.deliveryLocation && (
                                                    <FormHelperText error id="helper-text-deliveryLocation">
                                                        {errors.deliveryLocation}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 6, md: 6 }}>
                                            <FormControl fullWidth error={Boolean(touched.receiverName && errors.locationName)}>
                                                <InputLabel htmlFor="outlined-receiverName">Receiver's Name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-receiverName"
                                                    type="text"
                                                    value={values.receiverName}
                                                    name="receiverName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Receiver Name"
                                                    inputProps={{}}
                                                />
                                                {touched.receiverName && errors.receiverName && (
                                                    <FormHelperText error id="helper-text-receiverName">
                                                        {errors.receiverName}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 6, md: 6 }}>
                                            <FormControl fullWidth error={Boolean(touched.receiverPhone && errors.receiverPhone)}>
                                                <InputLabel htmlFor="outlined-receiverPhone">Receiver's Phone</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-receiverPhone"
                                                    type="text"
                                                    value={values.receiverPhone}
                                                    name="receiverPhone"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Receiver Phone"
                                                    inputProps={{}}
                                                />
                                                {touched.receiverPhone && errors.receiverPhone && (
                                                    <FormHelperText error id="helper-text-receiverPhone">
                                                        {errors.receiverPhone}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                            <FormControl fullWidth error={Boolean(touched.totalPackageWeight && errors.totalPackageWeight)}>
                                                <InputLabel htmlFor="outlined-totalPackageWeight">Total Package Weight</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-totalPackageWeight"
                                                    type="number"
                                                    value={values.totalPackageWeight}
                                                    name="totalPackageWeight"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Total Package Weight"
                                                    inputProps={{}}
                                                />
                                                {touched.totalPackageWeight && errors.totalPackageWeight && (
                                                    <FormHelperText error id="helper-text-totalPackageWeight">
                                                        {errors.totalPackageWeight}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                            <FormControl fullWidth error={Boolean(touched.itemsPerPackageCount && errors.itemsPerPackageCount)}>
                                                <InputLabel htmlFor="outlined-itemsPerPackageCount">items Per Package Count</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-itemsPerPackageCount"
                                                    type="number"
                                                    value={values.itemsPerPackageCount}
                                                    name="itemsPerPackageCount"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="items Per Package Count"
                                                    inputProps={{}}
                                                />
                                                {touched.itemsPerPackageCount && errors.itemsPerPackageCount && (
                                                    <FormHelperText error id="helper-text-itemsPerPackageCount">
                                                        {errors.itemsPerPackageCount}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                            <FormControl fullWidth error={Boolean(touched.totalPackagesCount && errors.totalPackagesCount)}>
                                                <InputLabel htmlFor="outlined-totalPackagesCount">Total Packages Count</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-totalPackagesCount"
                                                    type="number"
                                                    value={values.totalPackagesCount}
                                                    name="totalPackagesCount"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Total Package Count"
                                                    inputProps={{}}
                                                />
                                                {touched.totalPackagesCount && errors.totalPackagesCount && (
                                                    <FormHelperText error id="helper-text-totalPackagesCount">
                                                        {errors.totalPackagesCount}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                loading={isSubmitting}
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Item
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </form>
                    )}
                </Formik>
            )} */}

        </Box>
    )
}

export default OrderItemsForm;


const addItemToOrder = (values) => {
    return {
        id: uuidv4(),  // Generates a unique ID for the item
        name: values.name,
        deliveryLocation: values.deliveryLocation,
        receiverName: values.receiverName,
        receiverPhone: values.receiverPhone,
        totalPackageWeight: values.totalPackageWeight,
        itemsPerPackageCount: values.itemsPerPackageCount,
        totalPackagesCount: values.totalPackagesCount,
        additionalNotes: values.additionalNotes,
    };
};


export const updateWaybillOrderItems = async (prevData, newData) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/waybill/update/${prevData.id}/?host=admin&env=${env}`;

        const { id, createdAt, createdBy, ...restPrevData } = prevData;

        const payload = {
            ...restPrevData,

            companyId: newData.company.id,
            warehouseId: newData.warehouseId,
            orderItems: newData.orderItems,
            createdBy: auth.currentUser.uid,
            updatedBy: auth.currentUser.uid,

        };

        // console.log("payload", payload);

        const response = await API.put(url, payload);

        // console.log("response", response);

    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError);
        throw error;
    }
};