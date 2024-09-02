import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingOrders } from '../store/reducers/extra_reducers';
import { approveOrder, confirmShoppingOrderPickUp } from '../store/reducers/reducers';
import { confirmOrderdelivery } from '../store/reducers/reducers';
import { rejectOrder, cancelOrder } from '../store/reducers/reducers';
import UiLoadingOverlay from '../../../components/overlay';
import AlertConfrimationDialog from '../../../components/dailog/confirmDialog';
import SideNav from '../../../components/sidenav/SideNav';
import SelectCourier from '../actions/SelectCourier';
import OrderHistory from '../history';
import ShoppingOrdersTable from './table';

// Utility function to format date in YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const Shopping = () => {
  const [actionType, setActionType] = useState(null);
  const [[anchorEl, selectedRow], setAnchorEl] = useState([null, undefined]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('Are You Sure that you want To Continue?');
  const [sidebarType, setSidebarType] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState({});

  const today = new Date();
  const [status, setStatus] = useState('all');
  const [timePeriod, setTimePeriod] = useState('today');
  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [queryStr, setQueryStr] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleCloseMenuActions = () => {
    setAnchorEl([null, undefined]);
  };

  const handleOpenDialog = (action, desc) => {
    setIsDialogOpen(true);
    setActionType(action);
    setMessage(desc);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseMenuActionsSideBar = () => {
    setAnchorEl((prev) => [null, prev[1]]);
  };

  const openSidebar = (type) => {
    setSidebarType(type);
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.shoppingOrders);

  const orders = store.orders;

  const newLoadList = structuredClone(orders);

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
      dispatch(fetchShoppingOrders(queryStr));
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
        <ShoppingOrdersTable
          orders={newLoadList} 
          rowsPerPage={rowsPerPage} 
          setRowsPerPage={setRowsPerPage}
          />
        </div>
      </UiLoadingOverlay>
      {anchorEl !== null && (
        <Menu id="more-menu" anchorEl={anchorEl} keepMounted={true} open={Boolean(anchorEl)} onClose={handleCloseMenuActions}>
          {selectedRow.status === 'cancelled' || selectedRow.status === 'delivered' ? (
            <div>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : selectedRow.status === 'rejected' ? (
            <div>
              <MenuItem onClick={() => handleOpenDialog('re-publish', 'Are You sure You Want To Re-publish Of This Order')}>
                Republish Order
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : selectedRow.status === 'pending' ? (
            <div>
              <MenuItem onClick={() => handleOpenDialog('approve', 'Are You sure You Want To Approve This Order')}>Approve Order</MenuItem>
              <MenuItem onClick={() => handleOpenDialog('reject', 'Are You sure You Want To Reject This Order')}>Reject Order </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('courier');
                }}
              >
                Confirm Pickup
              </MenuItem>
              <MenuItem onClick={() => handleOpenDialog('confirm_delivery', 'Are You sure You Want To Confirm Delivery Of This Order')}>
                Confirm Delivery
              </MenuItem>
              <MenuItem onClick={() => handleOpenDialog('cancel', 'Are You sure You Want To Cancel This Order')}>Cancel Order </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          )}
        </Menu>
      )}
      {actionType !== null && (
        <AlertConfrimationDialog
          open={isDialogOpen}
          handleClose={handleCloseDialog}
          message={message}
          onConfirm={() => {
            handleCloseMenuActionsSideBar();
            if (actionType === 'approve') {
              handleCloseDialog();
              dispatch(approveOrder({ id: selectedRow.id }));
            }
            if (actionType === 'confirm_pickup') {
              handleCloseDialog();
              dispatch(
                confirmShoppingOrderPickUp({
                  id: selectedRow.id,
                  courierId: selectedCourier.id,
                  courierName: selectedCourier.firstName,
                  courierPhone: selectedCourier.phone
                })
              );
              closeSidebar();
            }
            if (actionType === 'confirm_delivery') {
              handleCloseDialog();
              dispatch(confirmOrderdelivery({ id: selectedRow.id }));
            }
            if (actionType === 'reject') {
              handleCloseDialog();
              dispatch(rejectOrder({ id: selectedRow.id }));
            }
            if (actionType === 'cancel') {
              handleCloseDialog();
              dispatch(cancelOrder({ id: selectedRow.id }));
            }
            if (actionType === 're-publish') {
              handleCloseDialog();
              // dispatch(approveOrder1({ id: selectedRow.id }));
            }
          }}
        />
      )}
      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        {sidebarType === 'courier' ? (
          <SelectCourier
            selectedCourier={selectedCourier}
            setSelectedCourier={setSelectedCourier}
            onSelect={() => {
              handleOpenDialog('confirm_pickup', 'Are You sure You Want To Confirm Assign This Courier To This Order');
            }}
          />
        ) : (
          <OrderHistory order={selectedRow} />
        )}
      </SideNav>
    </>
  );
};

export default Shopping