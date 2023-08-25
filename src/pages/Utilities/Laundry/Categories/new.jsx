// import React from 'react'

import useScriptRef from '../../../hooks/useScriptRef';

import { addLaundryCategory } from './store';
import { useDispatch , useSelector } from 'react-redux';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../ui-component/extended/AnimateButton';

const LaundryCategoriesNew = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch()

  const store = useSelector((store) => store.LaundryCategories);

  return (
    <div>
      <p>Add New Category</p>
      <Formik
        initialValues={{
          name: '',
          // email: 'info@codedthemes.com',
          // password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          name: Yup.string().max(25).required('Name is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (scriptedRef.current) {
              dispatch(addLaundryCategory({ name: values.name }));
              setStatus({ success: true });
              setSubmitting(false);
              resetForm()
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
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name">Category Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Category Name"
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name-login">
                  {errors.name}
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
                  loading={store.loading}
                  disabled={store.loading}
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

export default LaundryCategoriesNew