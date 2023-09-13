import { useState } from 'react';
import useScriptRef from '../../../hooks/useScriptRef';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../ui-component/extended/AnimateButton';
import ImageDropZoneBase64 from '../../../components/input/ImageDropZoneBase64';

import { useDispatch, useSelector } from 'react-redux';
import { addCourier } from './store';


const CouriersNew = () => {
  const [fileBase64, setFileBase64] = useState('');

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const dispatch = useDispatch();

    const couriersStore = useSelector((store) => store.couriers);

  return (
    <div>
      <p>Add New Courier</p>

      <Formik
        initialValues={{
          courierType: 'COMPANY',
          surName: '',
          firstName: '',
          gender: 'Male',
          phone: '',
          IDType: 'National ID',
          IDNumber: '',
          homeDistrict: '',
          homeVillage: '',
          email: '',
          password: 'SGC@1234',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          courierType: Yup.string().max(25).required('Select Courier Type'),
          surName: Yup.string().max(25).required('Sur Name is required'),
          firstName: Yup.string().max(25).required('First Name is required'),
          gender: Yup.string().max(25).required('Gender is required'),
          phone: Yup.string().min(10).max(25).required('Phone Number is required'),
          IDType: Yup.string().max(25).required('Select ID Type'),
          IDNumber: Yup.string().min(10).max(25).required('ID Number is required'),
          homeDistrict: Yup.string().max(25).required('Home District is required'),
          homeVillage: Yup.string().max(25).required('Home Village is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().max(25).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (scriptedRef.current) {
              let imageFormat;
              let imageBase64;
              if (fileBase64 === "") {
                imageFormat = '';
                imageBase64 = '';

                const data = {
                  ...values,
                  imageFormat: imageFormat,
                  imageBase64: imageBase64
                };
                // console.log(data);
                dispatch(addCourier(data));
                setStatus({ success: true });
                setSubmitting(false);
                setFileBase64("");
                resetForm();
              } else {
                  const list = fileBase64.split(',');
                  if (list.length >= 2) {
                    imageFormat = list[0];
                    imageBase64 = list[1];

                    const data = {
                      ...values,
                      imageFormat: imageFormat,
                      imageBase64: imageBase64
                    };
                    // console.log(data);
                    dispatch(addCourier(data));
                    setStatus({ success: true });
                    setSubmitting(false);
                    setFileBase64("");
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
            <FormControl
              fullWidth
              error={Boolean(touched.courierType && errors.courierType)}
              sx={{ marginTop: '5px', marginBottom: '1px' }}
            >
              <InputLabel htmlFor="outlined-adornment-courierType">Courier Type</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-courierType"
                name="courierType"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.courierType}
                input={<OutlinedInput label="courierType" />}
              >
                <MenuItem key={1} value={'COMPANY'}>
                  COMPANY
                </MenuItem>
                <MenuItem key={2} value={'GUEST'}>
                  GUEST
                </MenuItem>
              </Field>
              {touched.courierType && errors.courierType && <FormHelperText error>{errors.courierType}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.surName && errors.surName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-surName">Sur Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-surName"
                type="text"
                value={values.surName}
                name="surName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Sur Name"
                inputProps={{}}
              />
              {touched.surName && errors.surName && (
                <FormHelperText error id="standard-weight-helper-text-surName-login">
                  {errors.surName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-firstName">First Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-firstName"
                type="text"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="First Name"
                inputProps={{}}
              />
              {touched.firstName && errors.name && (
                <FormHelperText error id="standard-weight-helper-text-firstName-login">
                  {errors.firstName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.gender && errors.gender)} sx={{ marginTop: '5px', marginBottom: '1px' }}>
              <InputLabel htmlFor="outlined-adornment-gender">Gender</InputLabel>
              <Field
                as={Select}
                id="outlined-adornment-gender"
                name="gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                input={<OutlinedInput label="Gender" />}
              >
                <MenuItem key={1} value={'Male'}>
                  Male
                </MenuItem>
                <MenuItem key={2} value={'Female'}>
                  Female
                </MenuItem>
              </Field>
              {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone"
                type="phone"
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

            <FormControl fullWidth error={Boolean(touched.homeDistrict && errors.homeDistrict)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-homeDistrict">Home District</InputLabel>
              <OutlinedInput
                id="outlined-adornment-homeDistrict"
                type="text"
                value={values.homeDistrict}
                name="homeDistrict"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Home District"
                inputProps={{}}
              />
              {touched.homeDistrict && errors.homeDistrict && (
                <FormHelperText error id="standard-weight-helper-text-homeDistrict-login">
                  {errors.homeDistrict}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.homeVillage && errors.homeVillage)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-homeVillage">Home Village</InputLabel>
              <OutlinedInput
                id="outlined-adornment-homeVillage"
                type="text"
                value={values.homeVillage}
                name="homeVillage"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Home Village"
                inputProps={{}}
              />
              {touched.homeVillage && errors.homeVillage && (
                <FormHelperText error id="standard-weight-helper-text-homeVillage-login">
                  {errors.homeVillage}
                </FormHelperText>
              )}
            </FormControl>

            <Box mt={2}>
              <Box> Select Courier Passport Photo </Box>
              <Box py={2} border={'1px solid grey'} borderRadius={'5px'}>
                <ImageDropZoneBase64 fileBase64={fileBase64} setFileBase64={setFileBase64} />
              </Box>
            </Box>

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

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  loading={couriersStore.loading}
                  disabled={couriersStore.loading}
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
}

export default CouriersNew