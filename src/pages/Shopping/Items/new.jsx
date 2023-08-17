import { useEffect, useState } from 'react';
import useScriptRef from '../../../hooks/useScriptRef';

import { fetchShoppingCategories } from '../Categories/store';
import { addShoppingItem } from './store';
import { useDispatch, useSelector } from 'react-redux';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AnimateButton from '../../../ui-component/extended/AnimateButton';
import ImageDropZone from '../../../components/input/ImageDropZone';

const ShoppingItemsNew = () => {
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();

  const shoppingCategoriesStore = useSelector((store) => store.shoppingCategories);
  const shoppingItemsStore = useSelector((store) => store.shoppingItems);

  useEffect(() => {
      dispatch(fetchShoppingCategories());
  }, [dispatch]);

  return (
    <div>
      <p>Add New Item</p>
      {shoppingCategoriesStore.data.length >= 1 ? (
        <Formik
          initialValues={{
            name: '',
            category: '',
            manufacturer: '',
            capacity: '',
            price: 0,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(25).required('Name is required'),
            category: Yup.string().max(25).required('Category is required'),
            manufacturer: Yup.string().max(25).required('Manufacturer is required'),
            capacity: Yup.string().max(25).required('Capacity is required'),
            price: Yup.number().min(5000).required('Price Should Be Greater Than 5000')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              if (scriptedRef.current) {
                if (files.length < 1) {
                  setFileError('Select Item Image!');
                  return;
                } else {
                  setFileError('');
                  const reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = (e) => {
                    const result = e.target.result;
                    const list = result.split(',');
                    if (list.length >= 2) {
                      // console.log('0 ', list[0]);
                      // console.log('1 ', list[1]);
                      const category_obj = shoppingCategoriesStore.data.find((itm) => itm.id == values.category);
                      const data = {
                        name: values.name,
                        category: category_obj,
                        manufacturer: values.manufacturer,
                        capacity: values.capacity,
                        price: values.price,
                        imageFormat: list[0],
                        imageBase64: list[1]
                      };
                      // console.log(data);
                      dispatch(addShoppingItem(data));
                      setStatus({ success: true });
                      setSubmitting(false);
                      setFiles([]);
                      resetForm();
                    }else{
                      console.log("fileBase64 Empty");
                    }
                  };
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
              <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-name">Item Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Item Name"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-name-login">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.category && errors.category)} sx={{ marginTop: 2 }}>
                <InputLabel htmlFor="outlined-adornment-category">Category</InputLabel>
                <Field
                  as={Select}
                  id="outlined-adornment-category"
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  input={<OutlinedInput label="Category" />}
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {shoppingCategoriesStore.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>
                {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
              </FormControl>

              <Box mt={2} py={2} border={'1px solid grey'} borderRadius={'5px'}>
                <ImageDropZone files={files} setFiles={setFiles} />
                { fileError !== "" && <p style={{color: "red"}} >Select An Image Of The Item</p>}
              </Box>

              <FormControl fullWidth error={Boolean(touched.manufacturer && errors.manufacturer)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-manufacturer">Manufacturer</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-manufacturer"
                  type="text"
                  value={values.manufacturer}
                  name="manufacturer"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Item manufacturer"
                  inputProps={{}}
                />
                {touched.manufacturer && errors.manufacturer && (
                  <FormHelperText error id="standard-weight-helper-text-manufacturer-login">
                    {errors.manufacturer}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.capacity && errors.capacity)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-capacity">Capacity Kgs/Ltrs/etc</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-capacity"
                  type="text"
                  value={values.capacity}
                  name="capacity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Item Name"
                  inputProps={{}}
                />
                {touched.capacity && errors.capacity && (
                  <FormHelperText error id="standard-weight-helper-text-capacity-login">
                    {errors.capacity}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-price">Item Price(SHS)</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  type="number"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Prcie Tag"
                  inputProps={{}}
                />
                {touched.price && errors.price && (
                  <FormHelperText error id="standard-weight-helper-text-price-login">
                    {errors.price}
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
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <p>Loading Categories</p>
      )}
    </div>
  );
};

export default ShoppingItemsNew;
