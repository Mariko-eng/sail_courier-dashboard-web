import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { capitalize } from '../../../utils/app-functions';
import SideNav from '../../../components/sidenav/SideNav';
import MainCard from '../../../ui-component/cards/MainCard';
import ShoppingCategoriesNew from './new';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingCategories, deleteShoppingCategory } from './store';

// import { useDispatch, useSelector } from 'react-redux';

const ShoppingCategories = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

    const dispatch = useDispatch();

    const store = useSelector((store) => store.shoppingCategories);

  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.orders);

  // console.log(store);


  useEffect(() => {
    dispatch(fetchShoppingCategories());
  }, [dispatch]);

  // const orders = store.orders;

  // const newLoadList = structuredClone(orders);

  return (
    <>
      <MainCard
        title="Shopping Categories"
        secondary={
          <Button variant="outlined" component={Link} to="" onClick={openSidebar} startIcon={<AddCircle />}>
            New
          </Button>
        }
      >
        <Card sx={{ overflow: 'hidden' }}>
          <Box>
            {store.data.map((item) => (
              <Box display={'flex'} mb={2} justifyContent={'space-between'} key={item.id}>
                <Box display={'flex'}>
                  <ArrowCircleRightIcon />
                  <Box>{capitalize(item.name)}</Box>
                </Box>
                <Box>
                  <IconButton onClick={() => dispatch(deleteShoppingCategory(item.id))}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      </MainCard>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <ShoppingCategoriesNew />
      </SideNav>
    </>
  );
};

export default ShoppingCategories;
