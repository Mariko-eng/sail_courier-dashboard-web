import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ** Store & Actions
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { API } from '../../../../../utils/api';
import { formatError } from '../../../../../utils/axios-error';
import UiLoadingOverlay from '../../../../../components/overlay';
import MainCard from '../../../../../ui-component/cards/MainCard';
import ClientsCorporateTable from './../../../Corporate/Users/table';
import CorporateNew from './../../../Corporate/Users/new';

import SideNav from '../../../../../components/SideNav';


const CorporateCompanyUserAccountsList = () => {
    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

      const [showSidebar, setShowSidebar] = useState(false);
    
      const openSidebar = () => {
        setShowSidebar(true);
      };
    
      const closeSidebar = () => {
        setShowSidebar(false);
      };


    // Memoize fetchData function to prevent unnecessary rerenders
    const fetchData = useCallback(async () => {
        const queryParams = new URLSearchParams();
        queryParams.append('companyId', id);
        try {
            setLoading(true);
            const results = await getData(queryParams.toString());
            setLoading(false);
            setResults(results);
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
                <ClientsCorporateTable clients={results} />
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


const getData = async (query) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/users/clients/corporate/?${query}&env=${env}`;

        const response = await API.get(url);

        // console.log(response)

        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        // console.log(customAxiosError);
        throw customAxiosError;
    }
};
