import { useState } from 'react';
import useScriptRef from '../../../../hooks/useScriptRef';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import ImageDropZoneBase64 from '../../../../components/input/ImageDropZoneBase64';

import { useDispatch, useSelector } from 'react-redux';
import { addCorporateCompany } from './../../store/extra_reducers';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Marker, GoogleMap } from '@react-google-maps/api';

const CorporateCompaniesNew = () => {
  const [companyForm20FileBase64, setCompanyForm20FileBase64] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyAddressPlaceId, setCompanyAddressPlaceId] = useState('');
  const [companyAddressCordinates, setCompanyAddressCordinates] = useState({});
  const [companyAddressError, setCompanyAddressError] = useState('');

  const handleChangeCompanyAddress = (newAddress) => {
    setCompanyAddress(newAddress);
  };

  const handleSelectCompanyAddress = async (selectedAddress, placeId) => {
    setCompanyAddress(selectedAddress);
    setCompanyAddressPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      // console.log('Selected Location:', selectedAddress);
      // console.log('Lat, Lng:', latLng);
      setCompanyAddressCordinates(latLng);
      setCompanyAddressError('');
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const searchOptions = {
    // Restrict autocomplete suggestions to a specific country
    componentRestrictions: { country: 'UG' } // Replace 'US' with the desired country code
  };

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const clientsStore = useSelector((store) => store.clients);

  return (
    <div>
      <Box display={'flex'} color={'blue'} justifyContent={'center'} my={'10px'}>
        Add New Corporate Company
      </Box>

      <Formik
        initialValues={{
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          companyWebsite: '',
          companyTinNumber: '',
          contactPersonName: '',
          contactPersonEmail: '',
          contactPersonPhone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          companyName: Yup.string().min(5).max(25).required('Company Name is required'),
          companyEmail: Yup.string().email('Invalid email').required('Company Email Address is required'),
          companyPhone: Yup.string().max(25).required('Company Telephone is required'),
          companyWebsite: Yup.string(),
          companyTinNumber: Yup.string(),
          contactPersonName: Yup.string().min(2).max(25).required('Contact Person Name is required'),
          contactPersonPhone: Yup.string().min(10).max(25).required('Contact Person PhoneNumber is required'),
          contactPersonEmail: Yup.string().email('Invalid email').required('Contact Person Email Address is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (Object.keys(companyAddressCordinates).length === 0) {
              setCompanyAddressError('Error');
              return;
            } else {
              setCompanyAddressError('');
            }
            let data = {
              ...values,
              companyAddressPlaceId: companyAddressPlaceId,
              companyAddressPlaceName: companyAddress,
              companyAddressCordinatesLat : companyAddressCordinates.lat,
              companyAddressCordinatesLng : companyAddressCordinates.lng,
            };

            if (scriptedRef.current) {
              let companyForm20ImageFormat = "";
              let companyForm20ImageBase64 = "";

              // let companyForm20 = {
              //   imageFormat: '',
              //   imageBase64: ''
              // };
              if (companyForm20FileBase64 === '') {
                data = {
                  ...data,
                  companyForm20ImageFormat,
                  companyForm20ImageBase64,

                  // companyForm20: companyForm20
                };
                // console.log(data);
                dispatch(addCorporateCompany(data));
                setStatus({ success: true });
                setSubmitting(false);
                setCompanyAddress('');
                setCompanyAddressPlaceId('');
                setCompanyAddressCordinates({});
                setCompanyForm20FileBase64('');
                resetForm();
              } else {
                const list = companyForm20FileBase64.split(',');
                if (list.length >= 2) {
                  companyForm20ImageFormat = list[0];
                  companyForm20ImageBase64 = list[1];

                  // companyForm20 = {
                  //   imageFormat: list[0],
                  //   imageBase64: list[1]
                  // };

                  data = {
                    ...data,
                    companyForm20ImageFormat,
                    companyForm20ImageBase64,

                    // companyForm20: companyForm20
                  };
                  //   console.log(data);
                  dispatch(addCorporateCompany(data));
                  setStatus({ success: true });
                  setSubmitting(false);
                  setCompanyAddress('');
                  setCompanyAddressPlaceId('');
                  setCompanyAddressCordinates({});
                  setCompanyForm20FileBase64('');
                  resetForm();
                }
              }
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
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.companyName && errors.companyName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-companyName">Company Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyName"
                type="text"
                value={values.companyName}
                name="companyName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company Name"
                inputProps={{}}
              />
              {touched.companyName && errors.companyName && (
                <FormHelperText error id="standard-weight-helper-text-companyName-login">
                  {errors.companyName}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.companyEmail && errors.companyEmail)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-companyEmail">Company Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyEmail"
                type="email"
                value={values.companyEmail}
                name="companyEmail"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company Email"
                inputProps={{}}
              />
              {touched.companyEmail && errors.companyEmail && (
                <FormHelperText error id="standard-weight-helper-text-companyEmail-login">
                  {errors.companyEmail}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.companyPhone && errors.companyPhone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-companyPhone">Company Phone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyPhone"
                type="text"
                value={values.companyPhone}
                name="companyPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company Telephone"
                inputProps={{}}
              />
              {touched.companyPhone && errors.companyPhone && (
                <FormHelperText error id="standard-weight-helper-text-companyPhone-login">
                  {errors.companyPhone}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.companyWebsite && errors.companyWebsite)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-companyWebsite">Company Website</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyWebsite"
                type="text"
                value={values.companyWebsite}
                name="companyWebsite"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company companyWebsite"
                inputProps={{}}
              />
              {touched.companyWebsite && errors.companyWebsite && (
                <FormHelperText error id="standard-weight-helper-text-companyWebsite-login">
                  {errors.companyWebsite}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.companyTinNumber && errors.companyTinNumber)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-companyTinNumber">Company Tin Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyTinNumber"
                type="text"
                value={values.companyTinNumber}
                name="companyTinNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company companyTinNumber"
                inputProps={{}}
              />
              {touched.companyTinNumber && errors.companyTinNumber && (
                <FormHelperText error id="standard-weight-helper-text-companyTinNumber-login">
                  {errors.companyTinNumber}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.contactPersonName && errors.contactPersonName)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-contactPersonName">Contact Person Name/s</InputLabel>
              <OutlinedInput
                id="outlined-adornment-contactPersonName"
                type="text"
                value={values.contactPersonName}
                name="contactPersonName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Names"
                inputProps={{}}
              />
              {touched.contactPersonName && errors.contactPersonName && (
                <FormHelperText error id="standard-weight-helper-text-contactPersonName-login">
                  {errors.contactPersonName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.contactPersonEmail && errors.contactPersonEmail)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-contactPersonEmail">Contact Person Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-contactPersonEmail"
                type="email"
                value={values.contactPersonEmail}
                name="contactPersonEmail"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Phone Number"
                inputProps={{}}
              />
              {touched.contactPersonEmail && errors.contactPersonEmail && (
                <FormHelperText error id="standard-weight-helper-text-contactPersonEmail-login">
                  {errors.contactPersonEmail}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.contactPersonPhone && errors.contactPersonPhone)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-contactPersonPhone">Contact Person Phone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-contactPersonPhone"
                type="text"
                value={values.contactPersonPhone}
                name="contactPersonPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Phone Number"
                inputProps={{}}
              />
              {touched.contactPersonPhone && errors.contactPersonPhone && (
                <FormHelperText error id="standard-weight-helper-text-contactPersonPhone-login">
                  {errors.contactPersonPhone}
                </FormHelperText>
              )}
            </FormControl>

            <Box mb={'20px'} mt={'10px'}>
              <PlacesAutocomplete
                value={companyAddress}
                onChange={handleChangeCompanyAddress}
                onSelect={handleSelectCompanyAddress}
                searchOptions={searchOptions} // Pass the search options here
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Company Location"
                      {...getInputProps({ placeholder: 'Enter Company Location Address' })}
                    />
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
              {Boolean(companyAddressError) && <Box color={'red'}> Please Select Company Address </Box>}
            </Box>

            {Object.keys(companyAddressCordinates).length !== 0 && (
              <GoogleMap center={companyAddressCordinates} zoom={14} mapContainerStyle={{ height: '200px', width: '100%', marginBottom:"10px" }}>
                <Marker position={companyAddressCordinates} label={'Location'} />
              </GoogleMap>
            )}

            <Box>
              <Box mb={'5px'}>Upload Company Form20 *(Photo) </Box>
              <Box py={2} border={'1px solid grey'} borderRadius={'5px'}>
                <ImageDropZoneBase64 fileBase64={companyForm20FileBase64} setFileBase64={setCompanyForm20FileBase64} />
              </Box>
            </Box>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  loading={clientsStore.loading}
                  disabled={clientsStore.loading}
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
    </div>
  );
};

export default CorporateCompaniesNew;
