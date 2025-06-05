import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../../../../../ui-component/extended/AnimateButton';

import CsvDropZone from '../../../../../../../../components/input/CsvDropZone';

// third party
import * as Yup from 'yup';

import { add_waybill_order_items } from '../../../../../../../../services/orders';


export default function EditWaybillOrderItemsCsvFormModal({ orderDetails, onRefresh }) {
    const [open, setOpen] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [jsonData, setJsonData] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleClickOpen = () => {
        // Reset all relevant state before opening the modal
        setJsonData([]);
        setValidationErrors([]);
        setSubmitting(false);
        setOpen(true);
    };

    const handleClose = () => {
        setJsonData([]);
        setValidationErrors([]);
        setSubmitting(false);
        setOpen(false);
    };

    const validationSchema = Yup.array().of(
        Yup.object().shape({
            item_name: Yup.string().required('Item name is required'),
            item_description: Yup.string().required('Item description is required'),
            drop_off_point_name: Yup.string().min(3).max(25).required('Delivery Location is required'),
            total_package_weight: Yup.number().min(0).required('Total Package Weight is required'),
            items_per_package: Yup.number().min(1).required('Number of items per package count is required'),
            no_of_packages: Yup.number().min(1).required('No of packages count is required'),
            drop_off_point_city: Yup.string(),
            drop_off_point_district: Yup.string(),
            drop_off_point_county: Yup.string(),
            drop_off_point_village: Yup.string(),
            parcel_receiver_name: Yup.string().min(3).max(25).required('Receiver name is required'),
            parcel_receiver_phone: Yup.string().min(3).max(25).required('Receiver Phone is required'),
            parcel_receiver_email: Yup.string().email('Invalid email'),
        })
    );

    const validateData = async () => {
        if (jsonData.length < 1) {
            setValidationErrors(["Select a csv file with data"]);
            return false;
        }
        try {
            // Validate the array of data
            await validationSchema.validate(jsonData, { abortEarly: false });

            // If validation passes
            console.log('Validation successful');
            setValidationErrors([]); // Clear previous errors if validation is successful
            return true;
        } catch (error) {
            // Handle validation errors
            if (error instanceof Yup.ValidationError) {
                console.error('Validation Errors:', error.errors);
                // Update the state to display the errors
                setValidationErrors(error.errors);
            }

            return false;
        }
    };


    const handleAddItems = async () => {
        try {
            const isValid = await validateData();
            if (!isValid) return;

            setSubmitting(true);

            const payloadData = {
                id: orderDetails.id,
                order_items: jsonData.map(item => ({
                    ...item,
                    // Ensure numeric fields are numbers
                    total_package_weight: Number(item.total_package_weight),
                    items_per_package: Number(item.items_per_package),
                    no_of_packages: Number(item.no_of_packages),
                    // Add any default values or transformations here
                    parcel_image_base64: item.parcel_image_base64 || "",
                    drop_off_point: {
                        name: item.drop_off_point_name,
                        google_place_id: "",
                        google_place_name: item.drop_off_point_name,
                        google_place_lat: 0,
                        google_place_lng: 0,
                        location_type: "other",
                        country: "Uganda",
                        region: item.drop_off_point_region,
                        city: item.drop_off_point_city,
                        district: item.drop_off_point_district,
                        county: item.drop_off_point_county,
                        village: item.drop_off_point_village,
                        contact_person_name: item.parcel_receiver_name,
                        contact_person_phone: item.parcel_receiver_phone,
                        contact_person_email: item.parcel_receiver_email,
                    }
                }))
            };

            console.log("payloadData", payloadData);

            await add_waybill_order_items(payloadData);

            setTimeout(() => {
                setSubmitting(false);
                handleClose();
                onRefresh();
            }, 1500);
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Import CSV
            </Button>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            Import Order Items From CSV
                        </Box>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText> */}

                    <CsvDropZone setJsonData={setJsonData} />

                    {validationErrors.length >= 1 && (
                        <Box maxHeight={"300px"} overflow={"auto"} p={2} sx={{ mb: 2 }}>
                            {validationErrors.map((err, index) => (
                                <Typography key={index} color="error" variant="body2">
                                    {". "}{err}
                                </Typography>
                            ))}
                        </Box>
                    )}

                    <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                loading={submitting}
                                disabled={submitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleAddItems()
                                }}
                            >
                                Add Items To List
                            </LoadingButton>
                        </AnimateButton>
                    </Box>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
