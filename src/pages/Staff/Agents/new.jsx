import { useState } from 'react';
import useScriptRef from '../../../hooks/useScriptRef';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Input, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../ui-component/extended/AnimateButton';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Marker, GoogleMap } from '@react-google-maps/api';

import { useDispatch, useSelector } from 'react-redux';
import { addAgent } from './store';

const AgentsNew = () => {
  const [address, setAddress] = useState('');
  const [addressPlaceId, setAddressPlaceId] = useState('');
  const [addressCordinates, setAddressCordinates] = useState({});
  const [agentLocationError, setAgentLocationError] = useState('');

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const agentsStore = useSelector((store) => store.agents);

  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelectAddress = async (selectedAddress, placeId) => {
    setAddress(selectedAddress);
    setAddressPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', selectedAddress);
      console.log('Lat, Lng:', latLng);
      setAddressCordinates(latLng);
      setAgentLocationError('')
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const searchOptions = {
    // Restrict autocomplete suggestions to a specific country
    componentRestrictions: { country: 'UG' } // Replace 'US' with the desired country code
  };

  return (
    <div>
      <p>Add New Agent</p>

      <Formik
        initialValues={{
          username: '',
          phone: '',
          phone2: '',
          IDType: 'National ID',
          IDNumber: '',
          email: '',
          password: 'SGC@1234',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(25).required('Username is required'),
          phone: Yup.string().max(25).required('Primary Phone Number is required'),
          phone2: Yup.string().max(25).required('Secondary Phone Number is required'),
          IDType: Yup.string().max(25).required('Select ID Type'),
          IDNumber: Yup.string(),
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().max(25).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (scriptedRef.current) {
              if (addressPlaceId === '') {
                setAgentLocationError('Select Agent Location!');
                return;
              } else {
                setAgentLocationError('');
              }

              const data = {
                ...values,
                locationName: address,
                locationId: addressPlaceId,
                locationLat: addressCordinates.lat,
                locationLng: addressCordinates.lng
              };

              dispatch(addAgent(data));
              setStatus({ success: true });
              setSubmitting(false);
              setAddress('');
              setAddressPlaceId('');
              setAddressCordinates({});
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
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone">Primary Phone Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone"
                type="text"
                value={values.phone}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Phone Number"
                inputProps={{}}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error id="standard-weight-helper-text-phone-login">
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.phone2 && errors.phone2)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone2">Secondary Phone Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone2"
                type="text"
                value={values.phone2}
                name="phone2"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Phone Number"
                inputProps={{}}
              />
              {touched.phone2 && errors.phone2 && (
                <FormHelperText error id="standard-weight-helper-text-phone2-login">
                  {errors.phone2}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.IDType && errors.IDType)} sx={{ marginTop: '5px', marginBottom: '1px' }}>
              <InputLabel htmlFor="outlined-adornment-IDType">ID Type</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-IDType"
                name="IDType"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.IDType}
                input={<OutlinedInput label="IDType" />}
              >
                <MenuItem key={1} value={'National ID'}>
                  National ID
                </MenuItem>
                <MenuItem key={2} value={'Passport ID'}>
                  Passport
                </MenuItem>
                <MenuItem key={3} value={'Driving License'}>
                  Driving License
                </MenuItem>
              </Field>
              {touched.IDType && errors.IDType && <FormHelperText error>{errors.IDType}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.IDNumber && errors.IDNumber)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-IDNumber">ID Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-IDNumber"
                type="text"
                value={values.IDNumber}
                name="IDNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                label="ID Number"
                inputProps={{}}
              />
              {touched.IDNumber && errors.IDNumber && (
                <FormHelperText error id="standard-weight-helper-text-IDNumber-login">
                  {errors.IDNumber}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                readOnly
                type="text"
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <Box mb={'20px'}>
              <PlacesAutocomplete
                value={address}
                onChange={handleChangeAddress}
                onSelect={handleSelectAddress}
                searchOptions={searchOptions} // Pass the search options here
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <Input fullWidth type="text" placeholder="Agent Location" {...getInputProps({ placeholder: 'Enter Agent Location' })} />
                    <div>
                      {loading ? <div>Loading...</div> : null}
                      {suggestions.map((suggestion, index) => {
                        const style = {
                          backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                        };
                        return (
                          <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {agentLocationError !== '' && <p style={{ color: 'red' }}>Select Agent Location</p>}
            </Box>

            {Object.keys(addressCordinates).length !== 0 && (
              <GoogleMap center={addressCordinates} zoom={20.4} mapContainerStyle={{ height: '200px', width: '100%' }}>
                <Marker position={addressCordinates} label={'Location'} />
              </GoogleMap>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  loading={agentsStore.loading}
                  disabled={agentsStore.loading}
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

export default AgentsNew;
