// CustomerForm to edit customer details
import React, { useState, useEffect, useCallback } from 'react';

// material-ui
import { Box, Button, FormControl, TextField, FormHelperText } from '@mui/material';
import { InputLabel, Select, MenuItem, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../../../../ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { fetch_corporate_company_delivery_points } from '../../../../../../../services/clients';
import { edit_waybill_order } from '../../../../../../../services/orders';


const WaybillOrderDetailsEditForm = ({ orderDetails, onRefresh }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [warehouses, setWarehouses] = React.useState([])

    // Memoize fetchData function to prevent unnecessary rerenders
    const fetchWarehouses = useCallback(async () => {
        try {
            setLoading(true);
            const { count, results } = await fetch_corporate_company_delivery_points(orderDetails?.corporate_company?.id);
            setLoading(false);
            setWarehouses(results);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    }, [orderDetails]);

    useEffect(() => {
        fetchWarehouses();
    }, [fetchWarehouses]);

    return (
        <div>
            {/* <Box display={"flex"} paddingX={2} my={1} flexDirection={"row"} justifyContent="space-between">
                <h4>Waybill Order</h4>
                <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
                    <h4 style={{ color: 'blue' }}>No : {orderDetails?.orderTrackerNo}</h4>
                    <h6>{prettyDate(orderDetails?.createdAt)}</h6>
                </Box>
            </Box> */}

            {!isEditing ? (
                <Paper sx={{ p: 2 }}>
                    <Box display={"flex"} justifyContent="space-between">
                        <h3>Delivery Info</h3>
                        <Button onClick={() => setIsEditing((prev) => !prev)}>
                            {isEditing ? "Cancel" : "Edit"}
                        </Button>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"}>
                        <div><strong>Pickup Point:</strong></div>
                        <div>{orderDetails?.pick_up_point?.name || "N/A"}</div>
                        <div>{orderDetails?.pick_up_point?.google_place_name || "N/A"}</div>
                    </Box>
                    <Box display={"flex"} mt={"10px"} flexDirection={"column"}>
                        <div><strong>Additional Notes:</strong></div>
                        <div>{orderDetails?.additional_notes || "N/A"}</div>
                    </Box>
                </Paper>
            ) : (
                <>
                    {(loading && warehouses.length === 0) ? <></> :
                        <Formik
                            initialValues={{
                                warehouseId: orderDetails?.pick_up_point.id || '',
                                additionalNotes: orderDetails?.additional_notes || '',
                            }}

                            validationSchema={Yup.object().shape({
                                warehouseId: Yup.string().required('Pickup point is required'),
                                additionalNotes: Yup.string(),
                            })}
                            enableReinitialize={true} // Enable reinitialization when initialValues change
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                try {
                                    setSubmitting(true);

                                    let data = {
                                        id: orderDetails.id,
                                        waybill_pick_up_point: values.warehouseId,
                                        additional_notes: values.additionalNotes,
                                    };

                                    // console.log("data", data); 

                                    await edit_waybill_order(data);

                                    onRefresh();
                                    setIsEditing(false)
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
                                    <Paper sx={{ p: 2 }}>
                                        <Box display={"flex"} justifyContent="space-between">
                                            <h3>Delivery Info</h3>
                                            <Button onClick={() => setIsEditing((prev) => !prev)}>
                                                {isEditing ? "Cancel" : "Edit"}
                                            </Button>
                                        </Box>
                                        <Box display="flex" flexDirection="column" p={"20px"}>
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 12 }}>
                                                    <FormControl fullWidth error={Boolean(touched.warehouseId && errors.warehouseId)}>
                                                        <InputLabel htmlFor="outlined-warehouseId">Pickup Point</InputLabel>
                                                        <Select
                                                            id="outlined-warehouseId"
                                                            value={values.warehouseId}
                                                            name="warehouseId"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Pickup Point"
                                                            inputProps={{}}
                                                        >
                                                            {
                                                                warehouses.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                                                            }
                                                        </Select>

                                                        {touched.warehouseId && errors.warehouseId && (
                                                            <FormHelperText error id="helper-text-warehouseId">
                                                                {errors.warehouseId}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 12 }}>
                                                    <FormControl fullWidth error={Boolean(touched.additionalNotes && errors.additionalNotes)}>
                                                        <TextField
                                                            id="outlined-additionalNotes"
                                                            name="additionalNotes"
                                                            label="Additional Notes"
                                                            value={values.additionalNotes}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            multiline
                                                            rows={4} // You can adjust the number of rows (height) of the textarea
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                        {touched.additionalNotes && errors.additionalNotes && (
                                                            <FormHelperText error id="helper-text-additionalNotes">
                                                                {errors.additionalNotes}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>

                                            </Grid>

                                            <br />

                                            <Box sx={{ mt: 1 }}>
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
                                                        Update
                                                    </LoadingButton>
                                                </AnimateButton>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </form>
                            )}

                        </Formik>}
                </>
            )}
        </div>
    );
};

export default WaybillOrderDetailsEditForm