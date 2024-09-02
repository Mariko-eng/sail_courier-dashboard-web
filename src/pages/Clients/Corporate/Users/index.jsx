import { useEffect, useState } from 'react';
import MainCard from '../../../../ui-component/cards/MainCard';

import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../../components/sidenav/SideNav';
import CorporateNew from './new';
import Edit from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { materialTableIcons } from '../../../../utils/material-table-icons';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsCorporate, deleteClient } from '../../store/extra_reducers';
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
    const store = useSelector((state) => state.clients);

    const data = store.data;

    const newLoadList = structuredClone(data);

    // console.log(newLoadList);

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
