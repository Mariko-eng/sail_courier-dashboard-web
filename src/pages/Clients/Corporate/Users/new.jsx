import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useScriptRef from '../../../../hooks/useScriptRef';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';
import { addClientCorporate } from './../../store/reducers/extra_reducers';
import { fetchCorporateCompanies } from './../../store/reducers/extra_reducers';

const CorporateNew = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const store = useSelector((store) => store.corporateCompanies);

  const companies = store.data;

  useEffect(() => {
    dispatch(fetchCorporateCompanies());
  }, [dispatch]);

  return (
    <>
      {store.loading && companies.length === 0 ? (
        <Box>
          <p>Loading Companies</p>
        </Box>
      ) : companies.length === 0 ? (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <p>No Registered Companies</p>
          <p>
            <Link to={'/clients/corporate/companies'}>Add Company</Link>
          </p>
        </Box>
      ) : (
        <Box>
          <p>Add New Corporate Client</p>
          <Formik
            initialValues={{
              company: '',
              username: '',
              phone: '',
              email: '',
              password: 'SailCourier@1234',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              company: Yup.string().required('Select a company'),
              username: Yup.string().min(3).max(25).required('Username is required'),
              phone: Yup.string().min(3).max(25).required('Phone Number is required'),
              email: Yup.string().email('Invalid email').required('Email is required'),
              password: Yup.string().min(6).max(25).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
              try {
                if (scriptedRef.current) {
                  const company_obj = companies.find((itm) => itm.id == values.company);
                  const data = {
                    company: company_obj,
                    username: values.username,
                    phone: values.phone,
                    email: values.email,
                    password: values.password
                  };
                  // console.log(data);
                  dispatch(addClientCorporate(data));
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
                <FormControl fullWidth error={Boolean(touched.company && errors.company)} sx={{ marginTop: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-company">Company</InputLabel>
                  <Field
                    as={Select}
                    id="outlined-adornment-company"
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.company}
                    input={<OutlinedInput label="Company" />}
                  >
                    <MenuItem value="">
                      <em>Select a company</em>
                    </MenuItem>
                    {companies.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.companyName}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.company && errors.company && <FormHelperText error>{errors.company}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-username">User Name</InputLabel>
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
                  <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email Address"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
        </Box>
      )}
    </>
  );
};

export default CorporateNew;
