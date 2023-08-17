import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../components/sidenav/SideNav';
import ShoppingItemsNew from './new';
import {Grid, Button, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
// import { IconButton } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { capitalize } from '../../../utils/app-functions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingItems } from './store';
// import { deleteShoppingItem } from './store';

const ShoppingItems = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();

  const store = useSelector((store) => store.shoppingItems);

  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.orders);

  // console.log(store);

  useEffect(() => {
    dispatch(fetchShoppingItems());
  }, [dispatch]);

  // const orders = store.orders;

  // const newLoadList = structuredClone(orders);

  return (
    <>
      <MainCard
        title="Shopping Items"
        secondary={
          <Button variant="outlined" component={Link} to="" onClick={openSidebar} startIcon={<AddCircle />}>
            New
          </Button>
        }
      >
        <Card sx={{ overflow: 'hidden' }}>
          <Grid container spacing={2}>
            {store.data.map((obj) => (
              <Grid key={obj.id} item xs={4}>
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" alt="green iguana" height="140" image={'data:image/png;base64,' + obj.imageBase64} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {capitalize(obj.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {capitalize(obj.category.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SHS {obj.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </MainCard>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <ShoppingItemsNew />
      </SideNav>
    </>
  );
};

export default ShoppingItems;
