import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Typography, FormControl, FormHelperText } from '@mui/material';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { AddCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCorporateCompanyWarehouses } from '../../../general/store/reducers/extra_reducers';
import { auth } from '../../../../config/firebase';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { formatError } from '../../../../utils/axios-error';
import { API } from '../../../../utils/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NewWaybillOrderFormModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((store) => store.auth);

    const loggedInUser = userStore.user;

    const warehousesStore = useSelector((store) => store.generalWarehouses);

    useEffect(() => {
        dispatch(fetchCorporateCompanyWarehouses());
    }, [dispatch])

    return (
        <>
            <Button startIcon={<AddCircle />} onClick={handleOpen}>Create Order</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h3' mb={"20px"} >New Order</Typography>
                    <Formik
                        initialValues={{
                            warehouseId: '',
                            additionalNotes: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            warehouseId: Yup.string().min(3).max(25).required('Warehouse is required'),
                            additionalNotes: Yup.string(),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            try {
                                setSubmitting(true);

                                let data = {
                                    company: loggedInUser.company,
                                    warehouseId: values.warehouseId,
                                    additionalNotes: values.additionalNotes,
                                };

                                // console.log(data); 

                                const response = await addWaybillOrder(data);

                                const { id } = response;  // Get the ID of the newly created order

                                // Navigate to the order edit page
                                navigate(`/orders/waybill/edit/${id}`);

                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>

                                <FormControl fullWidth error={Boolean(touched.warehouseId && errors.warehouseId)} sx={{ marginBottom: "10px" }}>
                                    <InputLabel style={{ width: "100%", marginBottom: "5px" }}>Where are you delivering from?</InputLabel>
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
                                            warehousesStore.data.map((item, index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
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
                </Box>

            </Modal>
        </>
    )
}

export default NewWaybillOrderFormModal


const addWaybillOrder = async (data) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/waybill/new/?env=${env}`;

        const payload = {
            companyId: data.company.id,
            warehouseId: data.warehouseId,
            additionalNotes: data.additionalNotes,  // Corrected the typo here
            createdBy: auth.currentUser.uid,
            updatedBy: auth.currentUser.uid,
        };

        console.log("payload", payload);

        const response = await API.post(url, payload);

        console.log("response", response);

        return {
            ...response.data,
            ...payload,
        };
    } catch (error) {
        const customAxiosError = formatError(error);
        console.log(customAxiosError);
        throw error;
    }
};