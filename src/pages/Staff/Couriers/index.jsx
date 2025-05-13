import { useState, useEffect, useCallback } from 'react';
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
import { fetch_courier_users } from '../../../services/couriers';

const Couriers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // Memoize fetchData function to prevent unnecessary rerenders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { results } = await fetch_courier_users();
      // const results = await fetchRegularOrders(queryParams.toString());
      setLoading(false);
      setData(results);
      // setOrderData(results.entries);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  }, [rowsPerPage]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <UiLoadingOverlay loading={loading}>
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
              <CouriersTable
                couriers={data}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CouriersNew onRefresh={fetchData} />
      </SideNav>
    </>
  );
};

export default Couriers;
