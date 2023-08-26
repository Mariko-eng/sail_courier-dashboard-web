import useScriptRef from '../../../hooks/useScriptRef';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from './store';

const AdminsNew = () => {

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const adminsStore = useSelector((store) => store.admins);


  return (
    <div>
      <p>Add New Admin</p>

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
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().max(25).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (scriptedRef.current) {

              const data = {
                ...values,
              };

              dispatch(addAdmin(data));
              setStatus({ success: true });
              setSubmitting(false);
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
              <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>
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

            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  loading={adminsStore.loading}
                  disabled={adminsStore.loading}
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


export default AdminsNew