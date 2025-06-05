import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ** Store & Actions
import { Button, Card } from '@mui/material';

import UiLoadingOverlay from '../../../../../components/overlay';
import MainCard from '../../../../../ui-component/cards/MainCard';
import WarehousesTable from './table';
import { fetch_corporate_company_delivery_points } from '../../../../../services/clients';
import WarehouseNew from './new';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../../../components/SideNav';

const CorporateCompanyWarehousesList = () => {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
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
      const { count, results } = await fetch_corporate_company_delivery_points(id, queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setWarehouses(results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, [id, currentPageNo, currentPageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <>
      <UiLoadingOverlay loading={loading}>
        <MainCard
          title="Warehouses/Pickup Points"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <WarehousesTable
                warehouses={warehouses}
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
        <WarehouseNew companyId={id} onRefresh={fetchData} />
      </SideNav>
    </>
  );
};


export default CorporateCompanyWarehousesList;



