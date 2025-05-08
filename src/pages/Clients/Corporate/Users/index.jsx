import { useEffect, useState, useCallback } from 'react';
import MainCard from '../../../../ui-component/cards/MainCard';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../../components/sidenav/SideNav';
import CorporateNew from './new';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsCorporate } from '../../store/reducers/extra_reducers';
import UiLoadingOverlay from '../../../../components/overlay';
import ClientsCorporateTable from './table';
import { fetch_clients_corporate } from '../../../../services/clients';

const ClientsCorporate = () => {
  const [showSidebar, setShowSidebar] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(50);
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
        const {results} = await fetch_clients_corporate();
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
          title="Clients - Corporate"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
            <ClientsCorporateTable clients={data} />
            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CorporateNew />
      </SideNav>
    </>
  );
};

export default ClientsCorporate;
