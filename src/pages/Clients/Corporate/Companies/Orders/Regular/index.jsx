import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ** Store & Actions
import { Box, FormControl, InputLabel, MenuItem, Card, Select, TextField } from '@mui/material';

import { API } from '../../../../../../utils/api';
import { formatError } from '../../../../../../utils/axios-error';
import UiLoadingOverlay from '../../../../../../components/overlay';
import MainCard from '../../../../../../ui-component/cards/MainCard';
import OrdersTable from './../../../../../Orders/Regular/table';

// Utility function to format date in YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CorporateCompanyRegularOrdersList = () => {
    const { id } = useParams();

    const today = new Date();
    const now = new Date();
    const start_date = new Date(now.setDate(now.getDate() - 7));

    const [status, setStatus] = useState('all');
    const [timePeriod, setTimePeriod] = useState('last7days');
    const [startDate, setStartDate] = useState(formatDate(start_date));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [orders, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle filter changes
    const handleFilter = (event) => {
        const { name, value } = event.target;
        if (name === 'timePeriod') {
            setTimePeriod(value);
            updateDates(value);  // Update dates when time period changes
        } else {
            if (name === 'startDate') setStartDate(value);
            if (name === 'endDate') setEndDate(value);
            if (name === 'status') setStatus(value);
        }
    };

    // Function to update startDate and endDate based on time period
    const updateDates = (period) => {
        const today = new Date();
        let start, end;
        switch (period) {
            case 'today':
                start = end = new Date(today);
                break;
            case 'yesterday':
                start = end = new Date(today.setDate(today.getDate() - 1));
                break;
            case 'last7days':
                start = new Date(today.setDate(today.getDate() - 7));
                end = new Date();
                break;
            case 'last14days':
                start = new Date(today.setDate(today.getDate() - 14));
                end = new Date();
                break;
            case 'last30days':
                start = new Date(today.setDate(today.getDate() - 30));
                end = new Date();
                break;
            case 'last3months':
                start = new Date(today.setMonth(today.getMonth() - 3));
                end = new Date();
                break;
            case 'last6months':
                start = new Date(today.setMonth(today.getMonth() - 6));
                end = new Date();
                break;
            case 'last12months':
                start = new Date(today.setFullYear(today.getFullYear() - 1));
                end = new Date();
                break;
            default:
                start = end = new Date(today);
        }
        setStartDate(formatDate(start));
        setEndDate(formatDate(end));
    };

    // Memoize fetchData function to prevent unnecessary rerenders
    const fetchData = useCallback(async () => {
        const queryParams = new URLSearchParams();
        queryParams.append('companyId', id);
        queryParams.append('limit', rowsPerPage);
        if (status !== 'all') queryParams.append('status', status);
        if (startDate) queryParams.append('startDate', new Date(startDate).toISOString());
        if (endDate) queryParams.append('endDate', new Date(endDate).toISOString());

        try {
            setLoading(true);
            const results = await fetchOrders(queryParams.toString());
            setLoading(false);
            setOrderData(results.entries);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data: ', error);
        }
    }, [id,rowsPerPage, status, startDate, endDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <UiLoadingOverlay loading={loading}>
            <MainCard title="Regular Orders"            >
                <Card sx={{ overflow: 'hidden' }}>
                    <Box px={'10px'} py={'20px'} display={'flex'} justifyContent={'space-between'}>
                        <FormControl style={{ minWidth: 150 }}>
                            <InputLabel id="status-label">Order Status</InputLabel>
                            <Select
                                labelId="status-label"
                                label="Order Status"
                                value={status}
                                name="status"
                                onChange={handleFilter}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="pickedUp">PickedUp</MenuItem>
                                <MenuItem value="delivered">Delivered</MenuItem>
                            </Select>
                        </FormControl>

                        <Box ml={'20px'} display={'flex'}>
                            <FormControl style={{ minWidth: 150 }}>
                                <InputLabel id="period-label">Period</InputLabel>
                                <Select
                                    labelId="period-label"
                                    label="Period"
                                    value={timePeriod}
                                    name="timePeriod"
                                    onChange={handleFilter}
                                    style={{ minWidth: 120 }}
                                >
                                    <MenuItem value="today">Today</MenuItem>
                                    <MenuItem value="yesterday">Yesterday</MenuItem>
                                    <MenuItem value="last7days">Last 7 Days</MenuItem>
                                    <MenuItem value="last14days">Last 14 Days</MenuItem>
                                    <MenuItem value="last30days">Last 30 Days</MenuItem>
                                    <MenuItem value="last3months">Last 3 Months</MenuItem>
                                    <MenuItem value="last6months">Last 6 Months</MenuItem>
                                    <MenuItem value="last12months">Last 12 Months</MenuItem>
                                </Select>
                            </FormControl>
                            <Box width={'20px'} />
                            <TextField
                                id="start-date"
                                label="Start Date"
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={handleFilter}
                                style={{ minWidth: 120 }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Box width={'20px'} />
                            <TextField
                                id="end-date"
                                label="End Date"
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={handleFilter}
                                style={{ minWidth: 120 }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                    </Box>
                    <div style={{ overflowX: 'auto' }}>
                        <OrdersTable orders={orders} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    </div>
                </Card>
            </MainCard>
        </UiLoadingOverlay>
    );
};


export default CorporateCompanyRegularOrdersList;


const fetchOrders = async (query) => {
    try {
        const env = import.meta.env.VITE_ENV === "DEV" ? 'dev' : 'prod';
        const url = `/main/orders/regular?${query}&env=${env}`;

        const response = await API.get(url);

        return response.data;
    } catch (error) {
        const customAxiosError = formatError(error);
        // console.log(customAxiosError);
        throw customAxiosError;
    }
};
