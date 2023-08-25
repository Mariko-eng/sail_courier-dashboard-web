import { useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../components/sidenav/SideNav';
import AdminsNew from './new';

const Admins = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const openSidebar = () => {
      setShowSidebar(true);
    };

    const closeSidebar = () => {
      setShowSidebar(false);
    };

  return (
    <>
      <MainCard
        title="Staff - Admins"
        secondary={
          <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
            New
          </Button>
        }
      >
        <Card sx={{ overflow: 'hidden' }}></Card>
      </MainCard>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <AdminsNew />
      </SideNav>
    </>
  );
}

export default Admins