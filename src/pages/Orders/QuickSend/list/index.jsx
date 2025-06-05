import React, { useState, useEffect, useCallback } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { fetch_regular_orders } from '../../../../services/orders';
import UiLoadingOverlay from '../../../../components/overlay';
import MainCard from '../../../../ui-component/cards/MainCard';
import QuickSendOrdersTable from './table';
import { useSearchParams } from 'react-router-dom';

// Utility to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const QuickSendOrdersList = () => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const [searchParams] = useSearchParams();
  // console.log("searchParams", searchParams)

  const company = searchParams.get('company')

  console.log("company", company)

  const [status, setStatus] = useState('all');
  const [timePeriod, setTimePeriod] = useState('last7days');
  const [startDate, setStartDate] = useState(formatDate(lastWeek));
  const [endDate, setEndDate] = useState(formatDate(today));

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);

  const updateDates = (period) => {
    const today = new Date();
    let start, end = new Date();

    switch (period) {
      case 'today':
        start = new Date();
        break;
      case 'yesterday':
        start = new Date(today.setDate(today.getDate() - 1));
        end = new Date(start);
        break;
      case 'last7days':
        start = new Date();
        start.setDate(today.getDate() - 7);
        break;
      case 'last14days':
        start = new Date();
        start.setDate(today.getDate() - 14);
        break;
      case 'last30days':
        start = new Date();
        start.setDate(today.getDate() - 30);
        break;
      case 'last3months':
        start = new Date();
        start.setMonth(today.getMonth() - 3);
        break;
      case 'last6months':
        start = new Date();
        start.setMonth(today.getMonth() - 6);
        break;
      case 'last12months':
        start = new Date();
        start.setFullYear(today.getFullYear() - 1);
        break;
      default:
        start = new Date();
        break;
    }

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;

    if (name === 'timePeriod') {
      setTimePeriod(value);
      updateDates(value);
    } else if (name === 'status') {
      setStatus(value);
    } else if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const fetchData = useCallback(async () => {
    // Format as "YYYY-MM-DD"
    const startDateStr = new Date(startDate).toISOString().split("T")[0];
    // Format as "YYYY-MM-DD"
    const endDateStr = new Date(endDate).toISOString().split("T")[0];

    const queryParams = new URLSearchParams({
      page: currentPageNo.toString(),
      page_size: currentPageSize.toString(),
      startDate: startDateStr,
      endDate: endDateStr,
      status,
    });

    // Add extra params dynamically
    if (company) {
      queryParams.set("corporate_company", company);
    }

    try {
      setLoading(true);
      const { count, results } = await fetch_regular_orders(queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setOrders(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  },
    [currentPageNo, currentPageSize, status, startDate, endDate]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <UiLoadingOverlay loading={loading}>
      <MainCard title="QuickSend Orders">
        <Box px={2} py={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
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
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="picked_up">PickedUp</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="period-label">Period</InputLabel>
            <Select
              labelId="period-label"
              label="Period"
              value={timePeriod}
              name="timePeriod"
              onChange={handleFilter}
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

          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleFilter}
            InputLabelProps={{ shrink: true }}
            style={{ minWidth: 150 }}
          />

          <TextField
            id="end-date"
            label="End Date"
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleFilter}
            InputLabelProps={{ shrink: true }}
            style={{ minWidth: 150 }}
          />
        </Box>

        <Box style={{ overflowX: 'auto' }}>
          <QuickSendOrdersTable
            orders={orders}
            totalCount={totalCount}
            currentPageSize={currentPageSize}
            setCurrentPageSize={setCurrentPageSize}
            currentPageNo={currentPageNo}
            setCurrentPageNo={setCurrentPageNo}
          />
        </Box>
      </MainCard>
    </UiLoadingOverlay>
  );
};

export default QuickSendOrdersList;
