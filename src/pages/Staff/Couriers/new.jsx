import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, MenuItem, Select } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageDropZoneBase64 from '../../../components/input/ImageDropZoneBase64';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { addCourier } from './store';

const CouriersNew = () => {
  const [fileBase64, setFileBase64] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch();
  const couriersStore = useSelector((store) => store.couriers);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      courierType: 'COMPANY',
      surName: '',
      firstName: '',
      gender: 'Male',
      phone: '',
      IDType: '',
      IDNumber: '',
      homeDistrict: '',
      homeVillage: '',
      email: '',
      password: 'SGC@1234',
      submit: null
    },
    validationSchema: Yup.object().shape({
      courierType: Yup.string().max(25).required('Select Courier Type'),
      surName: Yup.string().max(25).required('Required'),
      firstName: Yup.string().max(25).required('Required'),
      gender: Yup.string().max(25).required('Required'),
      phone: Yup.string().min(10).max(25).required('Required'),
      IDType: Yup.string().max(25),
      IDNumber: Yup.string().min(10).max(25),
      homeDistrict: Yup.string().max(25),
      homeVillage: Yup.string().max(25),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().max(25).required('Password is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        let imageFormat = '';
        let imageBase64 = '';
        if (fileBase64 !== "") {
          const list = fileBase64.split(',');
          if (list.length >= 2) {
            imageFormat = list[0];
            imageBase64 = list[1];
          }
        }

        const data = {
          ...values,
          imageFormat,
          imageBase64
        };

        // console.log(data);
        dispatch(addCourier(data));

        // // If successful, reset the form
        // setStatus({ success: true });
        // setSubmitting(false);
        // setFileBase64("");
      } catch (err) {
        console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (!couriersStore.loading && couriersStore.submitted && couriersStore.error === null) {
      formik.setStatus({ success: true });
      formik.setSubmitting(false);
      setFileBase64("");
      formik.resetForm();
    }
    if (!couriersStore.loading || !couriersStore.submitted || couriersStore.error !== null) {
      formik.setStatus({ success: false });
      formik.setErrors({submit: couriersStore.error})
      formik.setSubmitting(false);
    }
  }, [couriersStore.loading, couriersStore.submitted, couriersStore.error, formik]);


  return (
    <div>
      <p>Add New Courier</p>

      <form noValidate onSubmit={formik.handleSubmit}>
        {/* Your form fields here */}

        <FormControl fullWidth error={Boolean(formik.touched.firstName && formik.errors.firstName)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-firstName">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-firstName"
            type="text"
            value={formik.values.firstName}
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="First Name"
            inputProps={{}}
          />
          {formik.touched.firstName && formik.errors.name && (
            <FormHelperText error id="standard-weight-helper-text-firstName-login">
              {formik.errors.firstName}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.surName && formik.errors.surName)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-surName">Full Names</InputLabel>
          <OutlinedInput
            id="outlined-adornment-surName"
            type="text"
            value={formik.values.surName}
            name="surName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Sur Name"
            inputProps={{}}
          />
          {formik.touched.surName && formik.errors.surName && (
            <FormHelperText error id="standard-weight-helper-text-surName-login">
              {formik.errors.surName}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.gender && formik.errors.gender)} sx={{ marginTop: '5px', marginBottom: '1px' }}>
          <InputLabel htmlFor="outlined-adornment-gender">Gender</InputLabel>
          <Select
            id="outlined-adornment-gender"
            name="gender"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.gender}
            input={<OutlinedInput label="Gender" />}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          {formik.touched.gender && formik.errors.gender && (
            <FormHelperText error>{formik.errors.gender}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.phone && formik.errors.phone)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>
          <OutlinedInput
            id="outlined-adornment-phone"
            type="phone"
            value={formik.values.phone}
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Phone Number"
            inputProps={{}}
          />
          {formik.touched.phone && formik.errors.phone && (
            <FormHelperText error id="standard-weight-helper-text-phone-login">
              {formik.errors.phone}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.IDType && formik.errors.IDType)} sx={{ marginTop: '5px', marginBottom: '1px' }}>
          <InputLabel htmlFor="outlined-adornment-IDType">ID Type</InputLabel>
          <Select
            id="outlined-adornment-IDType"
            name="IDType"
            value={formik.values.IDType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput label="ID Type" />}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="National ID">National ID</MenuItem>
            <MenuItem value="Passport ID">Passport ID</MenuItem>
            <MenuItem value="Driving License">Driving License</MenuItem>
          </Select>
          {formik.touched.IDType && formik.errors.IDType && (
            <FormHelperText error>{formik.errors.IDType}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.IDNumber && formik.errors.IDNumber)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-IDNumber">ID Number</InputLabel>
          <OutlinedInput
            id="outlined-adornment-IDNumber"
            type="text"
            value={formik.values.IDNumber}
            name="IDNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="ID Number"
            inputProps={{}}
          />
          {formik.touched.IDNumber && formik.errors.IDNumber && (
            <FormHelperText error id="standard-weight-helper-text-IDNumber-login">
              {formik.errors.IDNumber}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.homeDistrict && formik.errors.homeDistrict)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-homeDistrict">Home District</InputLabel>
          <OutlinedInput
            id="outlined-adornment-homeDistrict"
            type="text"
            value={formik.values.homeDistrict}
            name="homeDistrict"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Home District"
            inputProps={{}}
          />
          {formik.touched.homeDistrict && formik.errors.homeDistrict && (
            <FormHelperText error id="standard-weight-helper-text-homeDistrict-login">
              {formik.errors.homeDistrict}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.homeVillage && formik.errors.homeVillage)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-homeVillage">Home Village</InputLabel>
          <OutlinedInput
            id="outlined-adornment-homeVillage"
            type="text"
            value={formik.values.homeVillage}
            name="homeVillage"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Home Village"
            inputProps={{}}
          />
          {formik.touched.homeVillage && formik.errors.homeVillage && (
            <FormHelperText error id="standard-weight-helper-text-homeVillage-login">
              {formik.errors.homeVillage}
            </FormHelperText>
          )}
        </FormControl>

        <Box mt={2}>
          <Box>Upload Courier Passport Photo </Box>
          <Box py={2} border={'1px solid grey'} borderRadius={'5px'}>
            <ImageDropZoneBase64 fileBase64={fileBase64} setFileBase64={setFileBase64} />
          </Box>
        </Box>

        <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Email"
            inputProps={{}}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            readOnly
            type="text"
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="password"
            inputProps={{}}
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>

        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
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
    </div>
  );
};

export default CouriersNew;
