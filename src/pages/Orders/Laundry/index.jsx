import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import UiLoadingOverlay from '../../../components/overlay';
import { fetchLaundryOrders } from '../store/reducers/extra_reducers';
import LaundryOrdersTable from './table';

// Utility function to format date in YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Laundry = () => {
  const today = new Date();
  const [status, setStatus] = useState('all');
  const [timePeriod, setTimePeriod] = useState('today');
  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [queryStr, setQueryStr] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.laundryOrders);

  const orders = store.orders;

  const newLoadList = orders;
  // const newLoadList = structuredClone(orders);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    queryParams.append('limit', rowsPerPage);

    if (status !== 'all') {
      queryParams.append('status', status);
    }

    if (startDate) {
      const selectedDate = new Date(startDate);
      const startDateIsoDateString = selectedDate.toISOString();

      queryParams.append('startDate', startDateIsoDateString);
    }

    if (endDate) {
      const selectedDate = new Date(endDate);
      const endDateIsoDateString = selectedDate.toISOString();

      queryParams.append('endDate', endDateIsoDateString);
    }

    setQueryStr(queryParams)

    if (queryStr !== "") {
      dispatch(fetchRegularOrders(queryStr));
    }

  }, [rowsPerPage, status, startDate, endDate, setQueryStr]);


  // Function to handle the filter change
  const handleFilter = (event) => {
    const { name, value } = event.target;

    if (name === 'timePeriod') {
      setTimePeriod(value);
      updateDates(value);
    } else {
      // Handle date changes or other filters if necessary
      if (name === 'startDate') setStartDate(value);
      if (name === 'endDate') setEndDate(value);
      if (name === 'status') setStatus(value);
    }
  };

  // Function to update dates based on the selected time period
  const updateDates = (period) => {
    // Create a new Date object to avoid mutating the original today object
    const today = new Date();
    let start, end;

    switch (period) {
      case 'today':
        start = end = new Date(today); // Create a new Date object for both start and end
        break;
      case 'yesterday':
        start = end = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'last7days':
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date(); // New Date object for end
        break;
      case 'last14days':
        start = new Date(today.setDate(today.getDate() - 14));
        end = new Date(); // New Date object for end
        break;
      case 'last30days':
        start = new Date(today.setDate(today.getDate() - 30));
        end = new Date(); // New Date object for end
        break;
      case 'last3months':
        start = new Date(today.setMonth(today.getMonth() - 3));
        end = new Date(); // New Date object for end
        break;
      case 'last6months':
        start = new Date(today.setMonth(today.getMonth() - 6));
        end = new Date(); // New Date object for end
        break;
      case 'last12months':
        start = new Date(today.setFullYear(today.getFullYear() - 1));
        end = new Date(); // New Date object for end
        break;
      default:
        start = end = new Date(today); // Default case
    }

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
  };


  useEffect(() => {
    if (queryStr !== "") {
      dispatch(fetchLaundryOrders(queryStr));
    }
  }, [queryStr, dispatch]);


  return (
    <>
      <UiLoadingOverlay>
        <Box px={'10px'} py={'20px'} display={'flex'} justifyContent={'space-between'}>
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="status-label">Order Status</InputLabel>
            <Select labelId="status-label" label="Order Status" defaultValue="all" name="status" onChange={handleFilter}>
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
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                placeholder: ''
              }}
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
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                placeholder: ''
              }}
            />
          </Box>
        </Box>

        <div style={{ overflowX: 'auto' }}>
          <LaundryOrdersTable
            orders={newLoadList}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </div>
      </UiLoadingOverlay>
    </>
  );
};

export default Laundry