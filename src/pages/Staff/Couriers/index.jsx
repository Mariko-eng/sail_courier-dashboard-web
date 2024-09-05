import { useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Card } from '@mui/material';
import SideNav from '../../../components/sidenav/SideNav';
import { AddCircle } from '@mui/icons-material';
import CouriersNew from './new';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouriers, deleteCourier } from './store';
// import MaterialTable from 'material-table';
import UiLoadingOverlay from '../../../components/overlay';
import CouriersTable from './table';

const Couriers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.couriers);

  const data = store.data;

  // console.log(data)

  const newLoadList = structuredClone(data);

  // console.log(newLoadList);

  useEffect(() => {
    dispatch(fetchCouriers());
  }, [dispatch]);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
        <MainCard
          title="Staff - Couriers"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
              <CouriersTable clients={newLoadList}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CouriersNew />
      </SideNav>
    </>
  );
};

export default Couriers;
