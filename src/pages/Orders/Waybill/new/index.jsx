import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik } from 'formik';

import toast from "react-hot-toast";

import { FormControl, FormHelperText, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { Box, Typography, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AddCircle } from '@mui/icons-material';

import AnimateButton from '../../../../ui-component/extended/AnimateButton';

import { fetch_corporate_company_delivery_points } from '../../../../services/clients';
import { add_waybill_order } from '../../../../services/orders';


const NewWaybillOrderFormModal = ({companyId}) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [warehouses, setWarehouses] = React.useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    // Memoize fetchData function to prevent unnecessary rerenders
    const fetchWarehouses = useCallback(async () => {
        try {
            setLoading(true);
            const { count, results } = await fetch_corporate_company_delivery_points(companyId);
            setLoading(false);
            setWarehouses(results);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchWarehouses();
    }, [fetchWarehouses]);

    return (
        <>
            <Button startIcon={<AddCircle />} onClick={handleOpen}>Create Order</Button>
            <Dialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <Typography variant='h3' mb={"20px"} >New Waybill Order</Typography>

                    {loading ?
                        <Box display={"flex"} justifyContent={"center"} py={2}>
                            <CircularProgress />
                        </Box>
                        :
                        <Formik
                            initialValues={{
                                warehouseId: '',
                                additionalNotes: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                warehouseId: Yup.string().required('Warehouse is required'),
                                additionalNotes: Yup.string(),
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                try {
                                    setSubmitting(true);

                                    let data = {
                                        waybill_corporate_company: companyId,
                                        waybill_pick_up_point: values.warehouseId,
                                        additional_notes: values.additionalNotes,
                                    };

                                    // console.log(data); 

                                    const response = await add_waybill_order(data);

                                    const { id } = response;  // Get the ID of the newly created order

                                    // Navigate to the order edit page
                                    navigate(`/orders/waybill/detail/${id}`);
                                } catch (err) {
                                    console.error(err);
                                    toast.error(`Failed : ${err.message}`, { position: 'bottom-right' });
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>

                                    <FormControl fullWidth error={Boolean(touched.warehouseId && errors.warehouseId)} sx={{ marginBottom: "10px" }}>
                                        <InputLabel style={{ width: "100%", marginBottom: "5px" }}>Warehouse (Pickup point)?</InputLabel>
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder='Select pickup point'
                                            id="outlined-warehouseId"
                                            value={values.warehouseId}
                                            name="warehouseId"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Warehouse"
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

                                    <FormControl fullWidth error={Boolean(touched.additionalNotes && errors.additionalNotes)} sx={{ marginBottom: "10px" }}>
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
                                                Create Order
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewWaybillOrderFormModal