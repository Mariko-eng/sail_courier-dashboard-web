import { useEffect, useState, useCallback } from 'react';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../../../components/SideNav';
import MainCard from '../../../../../ui-component/cards/MainCard';

import UiLoadingOverlay from '../../../../../components/overlay';
import ClientsCorporateTable from './table';
import { fetch_clients_corporate } from '../../../../../services/clients';
import ClientsCorporateNew from './../new';


const ClientsCorporate = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState([]);
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
    try {
      const queryParams = new URLSearchParams({
        page: currentPageNo.toString(),
        page_size: currentPageSize.toString(),
      });
      
      setLoading(true);
      const { count, results } = await fetch_clients_corporate(queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setClients(results);
      // setOrderData(results.entries);
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
          title="Clients - Corporate"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <ClientsCorporateTable 
                clients={clients}
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
        <ClientsCorporateNew onRefresh={fetchData} />
      </SideNav>
    </>
  );
};

export default ClientsCorporate;
