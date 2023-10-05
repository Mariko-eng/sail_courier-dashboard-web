import { useState, useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Marker, Polyline, GoogleMap } from '@react-google-maps/api';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const RegularOrderNew = () => {
  const [addressOrigin, setAddressOrigin] = useState('');
  const [addressOriginPlaceId, setAddressOriginPlaceId] = useState('');
  const [originCordinates, setOriginCordinates] = useState({});
  const [addressDestination, setAddressDestination] = useState('');
  const [addressDestinationPlaceId, setAddressDestinationPlaceId] = useState('');
  const [destCordinates, setDestCordinates] = useState({});
  const [pathCoordinates, setPathCoordinates] = useState([]);

  const theme = useTheme()


  const handleChangeOrigin = (newAddress) => {
    setAddressOrigin(newAddress);
  };

  const handleChangeDestination = (newAddress) => {
    setAddressDestination(newAddress);
  };

  const handleSelectOrigin = async (selectedAddress, placeId) => {
    setAddressOrigin(selectedAddress);
    setAddressOriginPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', selectedAddress);
      console.log('Lat, Lng:', latLng);
      setOriginCordinates(latLng);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  const handleSelectDestination = async (selectedAddress, placeId) => {
    setAddressDestination(selectedAddress);
    setAddressDestinationPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', selectedAddress);
      console.log('Lat, Lng:', latLng);
      setDestCordinates(latLng);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

    useEffect(() => {
      if (Object.keys(originCordinates).length !== 0 && Object.keys(destCordinates).length !== 0) {
        const directionsService = new window.google.maps.DirectionsService();

        const request = {
          origin: originCordinates,
          destination: destCordinates,
          travelMode: window.google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0].overview_path;
            // console.log(result);
            // console.log(route);
            console.log(result.routes[0].legs[0].distance);
            console.log(result.routes[0].legs[0].duration);
            console.log(result.routes[0].overview_polyline);
            const coordinates = route.map((point) => ({
              lat: point.lat(),
              lng: point.lng()
            }));
            setPathCoordinates(coordinates);
          }
        });
      }
    }, [originCordinates, destCordinates]);



  const searchOptions = {
    // Restrict autocomplete suggestions to a specific country
    componentRestrictions: { country: 'UG' } // Replace 'US' with the desired country code
  };


  return (
    <div>
      <p>Add New Order</p>

      <Formik
        initialValues={{
          itemName: '',
          parcelDesc: '',
          parcelWeight: 0,
          parcelRisk: '',
          parcelSenderName: '',
          parcelSenderPhone: '',
          parcelReceiverName: '',
          parcelReceiverPhone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(25).required('Name is required'),
          category: Yup.string().max(25).required('Category is required'),
          manufacturer: Yup.string().max(25).required('Manufacturer is required'),
          capacity: Yup.string().max(25).required('Capacity is required'),
          price: Yup.number().min(5000).required('Price Should Be Greater Than 5000')
        })}
        // eslint-disable-next-line no-unused-vars
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            console.log(values);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <h4> Parcel Description </h4>
            <FormControl fullWidth error={Boolean(touched.itemName && errors.itemName)} sx={{ marginTop: 2 }}>
              <InputLabel htmlFor="outlined-adornment-itemName">Parcel Type</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-itemName"
                name="itemName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemName}
                input={<OutlinedInput label="Parcel Type" />}
              >
                <MenuItem value="">
                  <em>Select an item</em>
                </MenuItem>
                <MenuItem value={'Documents'}>Documents</MenuItem>
                <MenuItem value={'Parcel'}>Parcel</MenuItem>
              </Field>
              {touched.itemName && errors.itemName && <FormHelperText error>{errors.itemName}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.parcelDesc && errors.parcelDesc)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-parcelDesc">Parcel Description</InputLabel>
              <OutlinedInput
                id="outlined-adornment-parcelDesc"
                type="text"
                value={values.parcelDesc}
                name="parcelDesc"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Parcel Description"
                inputProps={{}}
              />
              {touched.parcelDesc && errors.parcelDesc && (
                <FormHelperText error id="standard-weight-helper-text-parcelDesc-login">
                  {errors.parcelDesc}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.parcelWeight && errors.parcelWeight)} sx={{ marginTop: 2 }}>
              <InputLabel htmlFor="outlined-adornment-parcelWeight">Parcel Weight</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-parcelWeight"
                name="parcelWeight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.parcelWeight}
                input={<OutlinedInput label="Parcel Weight" />}
              >
                <MenuItem value={0}>
                  <em>Select Item Weight</em>
                </MenuItem>
                <MenuItem value={5}>Up To 5kg</MenuItem>
                <MenuItem value={10}>Up To 10kg</MenuItem>
              </Field>
              {touched.parcelWeight && errors.parcelWeight && <FormHelperText error>{errors.parcelWeight}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.parcelRisk && errors.parcelRisk)} sx={{ marginTop: 2 }}>
              <InputLabel htmlFor="outlined-adornment-parcelRisk">Parcel Risk</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-parcelRisk"
                name="parcelRisk"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.parcelRisk}
                input={<OutlinedInput label="Parcel Risk" />}
              >
                <MenuItem value={''}>
                  <em>Select Item Risk</em>
                </MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Field>
              {touched.parcelRisk && errors.parcelRisk && <FormHelperText error>{errors.parcelRisk}</FormHelperText>}
            </FormControl>

            <h4 style={{ marginTop: '10px' }}> Sender & Receiver Information </h4>

            <FormControl
              fullWidth
              error={Boolean(touched.parcelSenderName && errors.parcelSenderName)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-parcelSenderName">Parcel Sender Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-parcelSenderName"
                type="text"
                value={values.parcelSenderName}
                name="parcelSenderName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Parcel Sender Name"
                inputProps={{}}
              />
              {touched.parcelSenderName && errors.parcelSenderName && (
                <FormHelperText error id="standard-weight-helper-text-parcelSenderName-login">
                  {errors.parcelSenderName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.parcelSenderPhone && errors.parcelSenderPhone)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-parcelSenderPhone">Parcel Sender Phone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-parcelSenderPhone"
                type="text"
                value={values.parcelSenderPhone}
                name="parcelSenderPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Parcel Sender Phone"
                inputProps={{}}
              />
              {touched.parcelSenderPhone && errors.parcelSenderPhone && (
                <FormHelperText error id="standard-weight-helper-text-parcelSenderPhone-login">
                  {errors.parcelSenderPhone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.parcelReceiverName && errors.parcelReceiverName)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-parcelReceiverName">Parcel Receiver Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-parcelReceiverName"
                type="text"
                value={values.parcelReceiverName}
                name="parcelReceiverName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Parcel Receiver Name"
                inputProps={{}}
              />
              {touched.parcelReceiverName && errors.parcelReceiverName && (
                <FormHelperText error id="standard-weight-helper-text-parcelReceiverName-login">
                  {errors.parcelReceiverName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.parcelReceiverPhone && errors.parcelReceiverPhone)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-parcelReceiverPhone">Parcel Receiver Phone</InputLabel>
              <OutlinedInput
                id="outlined-adornment-parcelReceiverPhone"
                type="text"
                value={values.parcelReceiverPhone}
                name="parcelReceiverPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Parcel Receiver Phone"
                inputProps={{}}
              />
              {touched.parcelReceiverPhone && errors.parcelReceiverPhone && (
                <FormHelperText error id="standard-weight-helper-text-parcelReceiverPhone-login">
                  {errors.parcelReceiverPhone}
                </FormHelperText>
              )}
            </FormControl>

            <h4 style={{ marginTop: '10px' }}> Pickup & Dropoff Location </h4>

            <Box mb={'20px'}>
              <PlacesAutocomplete
                value={addressOrigin}
                onChange={handleChangeOrigin}
                onSelect={handleSelectOrigin}
                searchOptions={searchOptions} // Pass the search options here
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Pick up point"
                      {...getInputProps({ placeholder: 'Enter Pickup Address' })}
                    />
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
            </Box>

            <Box mb={'20px'}>
              <PlacesAutocomplete
                value={addressDestination}
                onChange={handleChangeDestination}
                onSelect={handleSelectDestination}
                searchOptions={searchOptions} // Pass the search options here
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      placeholder="Drop off point"
                      {...getInputProps({ placeholder: 'Enter Drop Off Address' })}
                    />
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
            </Box>

            {Object.keys(originCordinates).length !== 0 && Object.keys(destCordinates).length !== 0 && (
              <GoogleMap center={originCordinates} zoom={14} mapContainerStyle={{ height: '300px', width: '100%' }}>
                <Marker position={originCordinates} label={'Pick up'} />
                <Marker position={destCordinates} label={'Drop off'} />
                <Polyline
                  path={pathCoordinates}
                  options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                  }}
                />
              </GoogleMap>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            {/* 
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  loading={shoppingItemsStore.loading}
                  disabled={shoppingItemsStore.loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  ADD
                </LoadingButton>
              </AnimateButton>
            </Box> */}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegularOrderNew
