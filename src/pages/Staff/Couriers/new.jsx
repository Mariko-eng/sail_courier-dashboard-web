import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { add_courier_user } from '../../../services/couriers';

const CouriersNew = ({onRefresh}) => {
  const theme = useTheme();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      courierType: 'company',
      username: '',
      phone: '',
      email: '',
      password: 'SGC@1234',
      submit: null
    },
    validationSchema: Yup.object().shape({
      courierType: Yup.string().max(25).required('Select Courier Type'),
      username: Yup.string().max(25).required('Required'),
      phone: Yup.string().min(10).max(25).required('Required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().max(25).required('Password is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
      try {

        const data = {
          ...values,
        };

        const response = await add_courier_user(data)

        console.log("response", response)

        onRefresh()

        // console.log(data);
        // // If successful, reset the form
        resetForm()
        setStatus({ success: true });
        setSubmitting(false);
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  return (
    <div>
      <p>Add New Courier</p>

      <form noValidate onSubmit={formik.handleSubmit}>
        {/* Your form fields here */}

        <FormControl fullWidth error={Boolean(formik.touched.username && formik.errors.username)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            type="text"
            value={formik.values.username}
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Username"
            inputProps={{}}
          />
          {formik.touched.username && formik.errors.username && (
            <FormHelperText error id="helper-text-username">
              {formik.errors.username}
            </FormHelperText>
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
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
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
