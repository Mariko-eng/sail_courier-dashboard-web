import { useState, useEffect, useCallback } from 'react';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import MainCard from '../../../../ui-component/cards/MainCard';
import SideNav from '../../../../components/SideNav';

// ** Store & Actions
import UiLoadingOverlay from '../../../../components/overlay';
import { fetch_courier_users } from '../../../../services/couriers';
import CouriersTable from './table';
import CouriersNew from './../new';

const CouriersList = () => {
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [couriers, setCouriers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // Memoize fetchData function to prevent unnecessary rerenders
  const fetchData = useCallback(async () => {
    const queryParams = new URLSearchParams({
      page: currentPageNo.toString(),
      page_size: currentPageSize.toString(),
    });

    try {
      setLoading(true);
      const { count, results } = await fetch_courier_users(queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setCouriers(results);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  }, 
  [currentPageNo, currentPageSize]
);


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
                couriers={couriers}
                totalCount={totalCount}
                currentPageSize={currentPageSize}
                setCurrentPageSize={setCurrentPageSize}
                currentPageNo={currentPageNo}
                setCurrentPageNo={setCurrentPageNo}
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

export default CouriersList;
