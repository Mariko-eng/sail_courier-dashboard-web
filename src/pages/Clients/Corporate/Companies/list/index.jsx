import { useEffect, useState, useCallback } from 'react';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../../../components/SideNav';
import UiLoadingOverlay from '../../../../../components/overlay';
import MainCard from '../../../../../ui-component/cards/MainCard';
import CorporateCompanniesTable from './table';
import CorporateCompaniesNew from './../new';
import { fetch_corporate_companies } from '../../../../../services/clients';


const CorporateCompaniesList = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
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
      const { count, results } = await fetch_corporate_companies(queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setCompanies(results);
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
          title="Corporate Companies"
          secondary={
            <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
              New
            </Button>
          }
        >
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>

              <CorporateCompanniesTable
                companies={companies}
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
        <CorporateCompaniesNew onRefresh={fetchData} />
      </SideNav>
    </>
  );
};

export default CorporateCompaniesList;


