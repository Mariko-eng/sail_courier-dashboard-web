import { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import CorporateCompaniesNew from './new';
import SideNav from '../../../../components/sidenav/SideNav';
import UiLoadingOverlay from '../../../../components/overlay';
import MainCard from '../../../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCorporateCompanies } from './../../store/reducers/extra_reducers';
import StickyHeadTable from './table';


const CorporateCompanies = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.corporateCompanies);

    const data = store.data;

    const newLoadList = data;
    // const newLoadList = structuredClone(data);

    useEffect(() => {
      dispatch(fetchCorporateCompanies());
    }, [dispatch]);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
        <MainCard
          title="Corporate Companies"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>

            <StickyHeadTable companies={newLoadList} />

            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CorporateCompaniesNew />
      </SideNav>
    </>
  );
};

export default CorporateCompanies;


