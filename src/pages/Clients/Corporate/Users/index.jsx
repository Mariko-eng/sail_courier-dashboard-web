import { useEffect, useState } from 'react';
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

const ClientsCorporate = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

    const dispatch = useDispatch();
    const store = useSelector((state) => state.corporateClients);

    const data = store.data;

    console.log(data);

    const newLoadList = data;
    // const newLoadList = structuredClone(data);

    useEffect(() => {
      dispatch(fetchClientsCorporate());
    }, [dispatch]);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
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
            <ClientsCorporateTable clients={newLoadList} />
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
