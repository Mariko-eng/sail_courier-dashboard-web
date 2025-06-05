import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../../../../../ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { useSelector } from 'react-redux';
import { add_waybill_order_items } from '../../../../../../../../services/orders';

export default function EditWaybillOrderItemsFormModal({orderDetails, onRefresh }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Item
            </Button>
            <Dialog
                fullWidth
                maxWidth={"lg"}
                open={open}
                onClose={handleClose} 
            >
                <DialogTitle>Add New Order item</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText> */}

                    <Formik
                        initialValues={{
                            item_name: '',
                            item_description: '',
                            drop_off_point_name: '',
                            drop_off_point_city: '',
                            drop_off_point_district: '',
                            drop_off_point_county: '',
                            drop_off_point_village: '',
                            parcel_receiver_name: '', 
                            parcel_receiver_phone: '',
                            parcel_receiver_email: '',
                            total_package_weight: 0,
                            items_per_package: 1,
                            no_of_packages: 1,
                        }}

                        validationSchema={Yup.object().shape({
                            item_name: Yup.string().required('Item name is required'),
                            item_description: Yup.string().required('Item description is required'),
                            drop_off_point_name: Yup.string().min(3).max(25).required('Delivery Location is required'),
                            drop_off_point_city: Yup.string(),
                            drop_off_point_district: Yup.string(),
                            drop_off_point_county: Yup.string(),
                            drop_off_point_village: Yup.string(),
                            parcel_receiver_name: Yup.string().min(3).max(25).required('Receiver name is required'),
                            parcel_receiver_phone: Yup.string().min(3).max(25).required('Receiver Phone is required'),
                            parcel_receiver_email: Yup.string().email('Invalid email'),
                            total_package_weight: Yup.number().min(0).required('Total Package Weight is required'),
                            items_per_package: Yup.number().min(1).required('Number of items per package count is required'),
                            no_of_packages: Yup.number().min(1).required('No of packages count is required')
                        })}

                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            try {
                                setSubmitting(true);

                                const order_items = [
                                    {
                                        item_name: values.item_name,
                                        item_description: values.item_description,
                                        parcel_image_base64: "",
                                        no_of_packages: values.no_of_packages,
                                        items_per_package: values.items_per_package,
                                        total_package_weight: values.total_package_weight,
                                        parcel_receiver_name: values.parcel_receiver_name,
                                        parcel_receiver_phone: values.parcel_receiver_phone,
                                        parcel_receiver_email: values.parcel_receiver_email,
                                        drop_off_point: {
                                            name : values.drop_off_point_name,
                                            google_place_id: "",
                                            google_place_name: values.drop_off_point_name,
                                            google_place_lat: 0,
                                            google_place_lng: 0,
                                            location_type: "other",
                                            country: "Uganda",
                                            city: values.drop_off_point_city,
                                            district: values.drop_off_point_district,
                                            county: values.drop_off_point_county,
                                            village: values.drop_off_point_village,
                                            contact_person_name: values.parcel_receiver_name,
                                            contact_person_phone: values.parcel_receiver_phone,
                                            contact_person_email: values.parcel_receiver_email,
                                        }
                                        
                                    }
                                ]

                                const payloadData = {
                                    id : orderDetails.id,
                                    order_items: order_items
                                }

                                console.log("payloadData", payloadData);

                                await add_waybill_order_items(payloadData);

                                handleClose()
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
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12 }}>
                                                <FormControl fullWidth error={Boolean(touched.item_name && errors.item_name)}>
                                                    <InputLabel htmlFor="outlined-name">Name of item</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-item_name"
                                                        type="text"
                                                        value={values.item_name}
                                                        name="item_name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Name"
                                                        inputProps={{}}
                                                    />
                                                    {touched.item_name && errors.item_name && (
                                                        <FormHelperText error id="helper-text-item_name">
                                                            {errors.item_name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12 }}>
                                                <FormControl fullWidth error={Boolean(touched.item_description && errors.item_description)}>
                                                    <InputLabel htmlFor="outlined-item_description">Description of item</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-item_description"
                                                        type="text"
                                                        value={values.item_description}
                                                        name="item_description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Description"
                                                        inputProps={{}}
                                                        minRows={3}
                                                        multiline
                                                    />
                                                    {touched.item_description && errors.item_description && (
                                                        <FormHelperText error id="helper-text-item_description">
                                                            {errors.item_description}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.drop_off_point_name && errors.drop_off_point_name)}>
                                                    <InputLabel htmlFor="outlined-drop_off_point_name">Dropoff Address Name</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-drop_off_point_name"
                                                        type="text"
                                                        value={values.drop_off_point_name}
                                                        name="drop_off_point_name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Dropoff Address Location"
                                                        inputProps={{}}
                                                    />
                                                    {touched.drop_off_point_name && errors.drop_off_point_name && (
                                                        <FormHelperText error id="helper-text-drop_off_point_name">
                                                            {errors.drop_off_point_name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.drop_off_point_district && errors.drop_off_point_district)}>
                                                    <InputLabel htmlFor="outlined-drop_off_point_district">Dropoff Address District</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-drop_off_point_district"
                                                        type="text"
                                                        value={values.drop_off_point_district}
                                                        name="drop_off_point_district"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Dropoff Address District"
                                                        inputProps={{}}
                                                    />
                                                    {touched.drop_off_point_district && errors.drop_off_point_district && (
                                                        <FormHelperText error id="helper-text-drop_off_point_name">
                                                            {errors.drop_off_point_district}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.drop_off_point_county && errors.drop_off_point_county)}>
                                                    <InputLabel htmlFor="outlined-drop_off_point_county">Dropoff Address County</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-drop_off_point_county"
                                                        type="text"
                                                        value={values.drop_off_point_county}
                                                        name="drop_off_point_county"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Dropoff Address County"
                                                        inputProps={{}}
                                                    />
                                                    {touched.drop_off_point_county && errors.drop_off_point_county && (
                                                        <FormHelperText error id="helper-text-drop_off_point_county">
                                                            {errors.drop_off_point_county}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.drop_off_point_village && errors.drop_off_point_village)}>
                                                    <InputLabel htmlFor="outlined-drop_off_point_village">Dropoff Address Village</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-drop_off_point_village"
                                                        type="text"
                                                        value={values.drop_off_point_village}
                                                        name="drop_off_point_village"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Dropoff Address Village"
                                                        inputProps={{}}
                                                    />
                                                    {touched.drop_off_point_village && errors.drop_off_point_village && (
                                                        <FormHelperText error id="helper-text-drop_off_point_name">
                                                            {errors.drop_off_point_village}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.parcel_receiver_name && errors.parcel_receiver_name)}>
                                                    <InputLabel htmlFor="outlined-parcel_receiver_name">Receiver's Name</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-parcel_receiver_name"
                                                        type="text"
                                                        value={values.parcel_receiver_name}
                                                        name="parcel_receiver_name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Receiver Name"
                                                        inputProps={{}}
                                                    />
                                                    {touched.parcel_receiver_name && errors.parcel_receiver_name && (
                                                        <FormHelperText error id="helper-text-parcel_receiver_name">
                                                            {errors.parcel_receiver_name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 6, md: 6 }}>
                                                <FormControl fullWidth error={Boolean(touched.parcel_receiver_phone && errors.parcel_receiver_phone)}>
                                                    <InputLabel htmlFor="outlined-parcel_receiver_phone">Receiver's Phone</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-parcel_receiver_phone"
                                                        type="text"
                                                        value={values.parcel_receiver_phone}
                                                        name="parcel_receiver_phone"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Receiver Phone"
                                                        inputProps={{}}
                                                    />
                                                    {touched.parcel_receiver_phone && errors.parcel_receiver_phone && (
                                                        <FormHelperText error id="helper-text-parcel_receiver_phone">
                                                            {errors.parcel_receiver_phone}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12 }}>
                                                <FormControl fullWidth error={Boolean(touched.parcel_receiver_email && errors.parcel_receiver_email)}>
                                                    <InputLabel htmlFor="outlined-parcel_receiver_email">Receiver's Email</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-parcel_receiver_email"
                                                        type="email"
                                                        value={values.parcel_receiver_email}
                                                        name="parcel_receiver_email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Receiver Email"
                                                        inputProps={{}}
                                                    />
                                                    {touched.parcel_receiver_email && errors.parcel_receiver_email && (
                                                        <FormHelperText error id="helper-text-parcel_receiver_email">
                                                            {errors.parcel_receiver_email}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                                <FormControl fullWidth error={Boolean(touched.total_package_weight && errors.total_package_weight)}>
                                                    <InputLabel htmlFor="outlined-total_package_weight">Total Package Weight</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-total_package_weight"
                                                        type="number"
                                                        value={values.total_package_weight}
                                                        name="total_package_weight"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Total Package Weight"
                                                        inputProps={{}}
                                                    />
                                                    {touched.total_package_weight && errors.total_package_weight && (
                                                        <FormHelperText error id="helper-text-total_package_weight">
                                                            {errors.total_package_weight}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                                <FormControl fullWidth error={Boolean(touched.items_per_package && errors.items_per_package)}>
                                                    <InputLabel htmlFor="outlined-items_per_package">items Per Package Count</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-items_per_package"
                                                        type="number"
                                                        value={values.items_per_package}
                                                        name="items_per_package"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="items Per Package Count"
                                                        inputProps={{}}
                                                    />
                                                    {touched.items_per_package && errors.items_per_package && (
                                                        <FormHelperText error id="helper-text-items_per_package">
                                                            {errors.items_per_package}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                                                <FormControl fullWidth error={Boolean(touched.no_of_packages && errors.no_of_packages)}>
                                                    <InputLabel htmlFor="outlined-no_of_packages">Total Packages Count</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-no_of_packages"
                                                        type="number"
                                                        value={values.no_of_packages}
                                                        name="no_of_packages"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Total Package Count"
                                                        inputProps={{}}
                                                    />
                                                    {touched.no_of_packages && errors.no_of_packages && (
                                                        <FormHelperText error id="helper-text-no_of_packages">
                                                            {errors.no_of_packages}
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
