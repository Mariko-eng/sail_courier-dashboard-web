import { useEffect, useState, useCallback } from 'react';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import CorporateCompaniesNew from './new';
import SideNav from '../../../../components/sidenav/SideNav';
import UiLoadingOverlay from '../../../../components/overlay';
import MainCard from '../../../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCorporateCompanies } from './../../store/reducers/extra_reducers';
import CorporateCompanniesTable from './table';
import CustomGoogleMap from '../../../../components/google-maps';
import { fetch_corporate_companies } from '../../../../services/clients';


const CorporateCompanies = () => {
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
      const { results } = await fetch_corporate_companies();
      setLoading(false);
      setData(results);
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
          title="Corporate Companies"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>

              <CorporateCompanniesTable companies={data} />

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


