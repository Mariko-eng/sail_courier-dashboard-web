import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ** Store & Actions
import { Card } from '@mui/material';

import { API } from '../../../../../utils/api';
import { formatError } from '../../../../../utils/axios-error';
import UiLoadingOverlay from '../../../../../components/overlay';
import MainCard from '../../../../../ui-component/cards/MainCard';
import WarehousesTable from './table';

const CorporateCompanyWarehousesList = () => {
    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
              title="Corporate Company Warehouses"
              >
              <Card sx={{ overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                <WarehousesTable warehouses={results} />
                </div>
              </Card>
            </MainCard>
          </UiLoadingOverlay>
        </>
      );
};


export default CorporateCompanyWarehousesList;


const getData = async (query) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/users/client-corporate-companies/warehouses/?${query}&env=${env}`;

        const response = await API.get(url);

        // console.log(response)

        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        // console.log(customAxiosError);
        throw customAxiosError;
    }
};
