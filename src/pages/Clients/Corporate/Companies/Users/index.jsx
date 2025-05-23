import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ** Store & Actions
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { API } from '../../../../../utils/api';
import { formatError } from '../../../../../utils/axios-error';
import UiLoadingOverlay from '../../../../../components/overlay';
import MainCard from '../../../../../ui-component/cards/MainCard';
import ClientsCorporateTable from './../../../Corporate/Users/list/table';
import CorporateNew from './../../../Corporate/Users/new';

import SideNav from '../../../../../components/SideNav';
import { fetch_corporate_company_user_accounts } from '../../../../../services/clients';


const CorporateCompanyUserAccountsList = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);

  const [showSidebar, setShowSidebar] = useState(false);

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
      const { count, results } = await fetch_corporate_company_user_accounts(id, queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setClients(results);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <UiLoadingOverlay loading={loading}>
        <MainCard
          title="Corporate User Accounts"
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
        <CorporateNew />
      </SideNav>
    </>
  );
};


export default CorporateCompanyUserAccountsList;



