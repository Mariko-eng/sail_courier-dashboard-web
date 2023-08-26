import { useState, useEffect } from 'react';
import { AddCircle } from '@mui/icons-material';
import { Grid, Button, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import SideNav from '../../../../components/sidenav/SideNav';
import MainCard from '../../../../ui-component/cards/MainCard';
import { capitalize } from '../../../../utils/app-functions';
import LaundryItemsNew from './new';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaundryItems } from './store';
// import { deleteLaundryItem } from './store';

const LaundryItems = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();

  const store = useSelector((store) => store.laundryItems);

  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.orders);

  // console.log(store);

  useEffect(() => {
    dispatch(fetchLaundryItems());
  }, [dispatch]);

  // const orders = store.orders;

  // const newLoadList = structuredClone(orders);

  return (
    <>
      <MainCard
        title="Laundry Items"
        secondary={
          <Button variant="outlined" onClick={openSidebar} startIcon={<AddCircle />}>
            New
          </Button>
        }
      >
        <Card sx={{ overflow: 'hidden' }}>
          <Grid container spacing={2}>
            {store.data.map((obj) => (
              <Grid key={obj.id} item xs={4}>
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={obj.imageFormat + ',' + obj.imageBase64}
                    // image={'data:image/png;base64,' + obj.imageBase64}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {capitalize(obj.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {capitalize(obj.category.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SHS {obj.priceWash}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SHS {obj.priceDry}
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
        <LaundryItemsNew />
      </SideNav>
    </>
  );
};

export default LaundryItems;
