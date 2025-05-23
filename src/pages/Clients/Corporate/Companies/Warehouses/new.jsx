import { useState } from 'react';

import * as Yup from 'yup';
import { Formik } from 'formik';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// material-ui
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../../../ui-component/extended/AnimateButton';

import useScriptRef from '../../../../../utils/hooks/useScriptRef';

import { add_corporate_company_delivery_point } from '../../../../../services/clients';


const WarehouseNew = ({ companyId, onRefresh }) => {
    const scriptedRef = useScriptRef();

    const [warehouseAddress, setwarehouseAddress] = useState('');
    const [warehouseAddressPlaceId, setwarehouseAddressPlaceId] = useState('');
    const [warehouseAddressCordinates, setwarehouseAddressCordinates] = useState({});
    const [warehouseAddressError, setwarehouseAddressError] = useState('');

    const handleChangewarehouseAddress = (newAddress) => {
        setwarehouseAddress(newAddress);
    };

    const handleSelectwarehouseAddress = async (selectedAddress, placeId) => {
        setwarehouseAddress(selectedAddress);
        setwarehouseAddressPlaceId(placeId);
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            // console.log('Selected Location:', selectedAddress);
            // console.log('Lat, Lng:', latLng);
            setwarehouseAddressCordinates(latLng);
            setwarehouseAddressError('');
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const searchOptions = {
        // Restrict autocomplete suggestions to a specific country
        componentRestrictions: { country: 'UG' } // Replace 'US' with the desired country code
    };

    return (
        <>
            <Box>
                {/* <p className='bg-primary py-2 text-white text-center'>{loggedInUser.company.companyName ?? "Not Available"}</p> */}
                <p className='text-center p-0 text-primary'>Add Warehouse - Pickup Point</p>
                <hr />
                <Formik
                    initialValues={{
                        name: '',
                        contact_person_name: '',
                        contact_person_phone: '',
                        contact_person_email: '',
                        district: '',
                        village: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().min(3).max(25).required('Name is required'),
                        contact_person_name: Yup.string().min(3).max(25).required('Contact Person is required'),
                        contact_person_phone: Yup.string().min(7).max(25).required('Contact Phone is required'),
                        contact_person_email: Yup.string().email('Invalid email').required('Contact Email is required'),
                        district: Yup.string(),
                        village: Yup.string()
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                            if (scriptedRef.current) {
                                if (Object.keys(warehouseAddressCordinates).length === 0) {
                                    setwarehouseAddressError('Error');
                                    return;
                                } else {
                                    setwarehouseAddressError('');
                                }
                                let data = {
                                    company: companyId,

                                    name: values.name,
                                    google_place_id: warehouseAddressPlaceId,
                                    google_place_name: warehouseAddress,
                                    google_place_lat: warehouseAddressCordinates.lat,
                                    google_place_lng: warehouseAddressCordinates.lng,

                                    contact_person_name: values.contact_person_name,
                                    contact_person_phone: values.contact_person_phone,
                                    contact_person_email: values.contact_person_email,

                                    district: values.district,
                                    village: values.village,
                                };

                                setSubmitting(true);

                                const response = await add_corporate_company_delivery_point(data)

                                onRefresh()

                                setStatus({ success: true });
                                setSubmitting(false);
                                setwarehouseAddress('');
                                setwarehouseAddressPlaceId('');
                                setwarehouseAddressCordinates({});
                                resetForm();
                            }
                        } catch (err) {
                            console.error(err);
                            if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }
                    }}
                >
                    {({ isSubmitting, errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    type="text"
                                    value={values.name}
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Name"
                                    inputProps={{}}
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="helper-text-name-login">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Box sx={{ marginBottom: "10px" }}>
                                <PlacesAutocomplete
                                    value={warehouseAddress}
                                    onChange={handleChangewarehouseAddress}
                                    onSelect={handleSelectwarehouseAddress}
                                    searchOptions={searchOptions} // Pass the search options here
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-address">Pickup point address</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                type="text"
                                                label="Address"
                                                {...getInputProps({ 
                                                    placeholder: "Select Location Cordinnates" })}
                                            />
                                            </FormControl>
                                            <div>
                                                {loading ? <div>Loading...</div> : null}
                                                {suggestions.map((suggestion, index) => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                                                    };
                                                    return (
                                                        <div {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                                            {suggestion.description}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                {Boolean(warehouseAddressError) && <Box color={'red'}> Please Select Company Address </Box>}
                            </Box>

                            <FormControl fullWidth error={Boolean(touched.district && errors.district)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-district">District</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-district"
                                    type="text"
                                    value={values.district}
                                    name="district"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="District"
                                    inputProps={{}}
                                />
                                {touched.district && errors.district && (
                                    <FormHelperText error id="helper-text-district">
                                        {errors.district}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={Boolean(touched.village && errors.village)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-village">Village</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-village"
                                    type="text"
                                    value={values.village}
                                    name="village"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Village"
                                    inputProps={{}}
                                />
                                {touched.disvillagetrict && errors.village && (
                                    <FormHelperText error id="helper-text-village">
                                        {errors.village}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <br />

                            <FormControl fullWidth error={Boolean(touched.contact_person_name && errors.contact_person_name)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-contact_person_name">Contact Person Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-contact_person_name"
                                    type="text"
                                    value={values.contact_person_name}
                                    name="contact_person_name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Name"
                                    inputProps={{}}
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="helper-contact_person_name">
                                        {errors.contact_person_name}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={Boolean(touched.contact_person_phone && errors.contact_person_phone)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-contact_person_phone">Contact Phone Number</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-contact_person_phone"
                                    type="text"
                                    value={values.contact_person_phone}
                                    name="contact_person_phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Phone Number"
                                    inputProps={{}}
                                />
                                {touched.phone && errors.phone && (
                                    <FormHelperText error id="helper-contact_person_phone">
                                        {errors.contact_person_phone}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth error={Boolean(touched.contact_person_email && errors.contact_person_email)} sx={{ marginBottom: "10px" }}>
                                <InputLabel htmlFor="outlined-adornment-contact_person_email">Contact Email Address</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-contact_person_email"
                                    type="contact_person_email"
                                    value={values.contact_person_email}
                                    name="contact_person_email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Email Address"
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="helper-text-contact_person_email">
                                        {errors.contact_person_email}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}
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
                                        color="secondary"
                                    >
                                        ADD
                                    </LoadingButton>
                                </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default WarehouseNew;
