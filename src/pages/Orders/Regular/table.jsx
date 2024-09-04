import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { Chip, IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { capitalize, prettyDate } from '../../../utils/app-functions';
import AlertConfrimationDialog from '../../../components/dailog/confirmDialog';
import { useDispatch } from 'react-redux';
import { approveOrder, cancelOrder, confirmOrderdelivery, confirmRegularOrderPickUp, rejectOrder, toggleOrderPaymentStatus } from '../store/reducers/reducers';


const columns = [
  { id: 'orderNo', label: 'N0', minWidth: 100 },
  { id: 'orderTrackerNo', label: 'Tracker ID', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'parcelSenderName', label: 'Sender Name', minWidth: 100 },
  { id: 'parcelSenderPhone', label: 'Sender Phone', minWidth: 100 },
  { id: 'parcelReceiverName', label: 'Receiver Name', minWidth: 100 },
  { id: 'parcelReceiverPhone', label: 'Receiver Phone', minWidth: 100 },
  { id: 'clientAccountType', label: 'Client Type', minWidth: 100 },
  { id: 'totalCharges', label: 'Total Cost', minWidth: 100 },
  { id: 'isFullyPaid', label: 'is Fully Paid', minWidth: 100 },

  {
    id: 'createdAt', label: 'Created At', minWidth: 100,
    format: (value) => prettyDate(value),
  },
  { id: 'actions', label: 'Actions', minWidth: 100 }, // Add action column
];


function processData(dataList, query) {
  let newData = [];
  for (var i = 0; i < dataList.length; i++) {
    var cords = `${dataList[i].companyAddressCordinatesLat} , ${dataList[i].companyAddressCordinatesLng}`;
    newData.push({
      ...dataList[i],
      companyAddressCordinates: cords,
      action: 'Actions' // Example value for action button
    })
  }

  if (!query) return newData;

  return newData.filter(item => {
    return Object.values(item).some(val =>
      val.toString().toLowerCase().includes(query.toLowerCase())
    );
  });
}

export default function RegularOrdersTable({ orders, rowsPerPage, setRowsPerPage }) {
  const [page, setPage] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState(null);
  const [message, setMessage] = React.useState('Are You Sure that you want To Continue?');

  const dispatch = useDispatch()

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenuActions = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleOpenDialog = (action, desc) => {
    setIsDialogOpen(true);
    setActionType(action);
    setMessage(desc);
  };

  const handleCloseDialog = () => {
    handleCloseMenuActions();
    setIsDialogOpen(false);
  };

  // const handleAction = (action) => {
  //   if (selectedRow) {
  //     // Perform action based on the selectedRow
  //     console.log(`Performing ${action} on row`, selectedRow);
  //     handleCloseMenuActions();
  //   }
  // };

  const open = Boolean(anchorEl);

  const rows = processData(orders, searchQuery);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2, p: 2 }}
      />

      <TableContainer sx={{ minHeight: 240 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} handleClick={handleClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100, 150]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedRow !== null &&
        <>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenuActions}
          >

            {selectedRow.status === 'cancelled' || selectedRow.status === 'delivered' ? (
              <div>
                {selectedRow.isFullyPaid === false ? (
                  <MenuItem onClick={() => handleOpenDialog('confirm_payment', 'Are You sure You Want To Confirm Payment Of This Order')}>
                    Confirm Payment
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => handleOpenDialog('cancel_payment', 'Are You sure You Want To Cancel Payment Of This Order')}>
                    Cancel Payment
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    // console.log("tracking")
                    //   handleCloseMenuActions();
                    //   openSidebar('track');
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
                {selectedRow.isFullyPaid === false ? (
                  <MenuItem onClick={() => handleOpenDialog('confirm_payment', 'Are You sure You Want To Confirm Payment Of This Order')}>
                    Confirm Payment
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => handleOpenDialog('cancel_payment', 'Are You sure You Want To Cancel Payment Of This Order')}>
                    Cancel Payment
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    //   handleCloseMenuActions();
                    //   openSidebar('track');
                  }}
                >
                  Track Order
                </MenuItem>
              </div>
            ) : selectedRow.status === 'pending' ? (
              <div>
                <MenuItem onClick={() => handleOpenDialog('approve', 'Are You sure You Want To Approve This Order')}>Approve Order</MenuItem>
                <MenuItem onClick={() => handleOpenDialog('reject', 'Are You sure You Want To Reject This Order')}>Reject Order </MenuItem>
                {selectedRow.isFullyPaid === false ? (
                  <MenuItem onClick={() => handleOpenDialog('confirm_payment', 'Are You sure You Want To Confirm Payment Of This Order')}>
                    Confirm Payment
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => handleOpenDialog('cancel_payment', 'Are You sure You Want To Cancel Payment Of This Order')}>
                    Cancel Payment
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    //   handleCloseMenuActions();
                    //   openSidebar('track');
                  }}
                >
                  Track Order
                </MenuItem>
              </div>
            ) : (
              <div>
                {selectedRow.status === 'approved' ? (
                  <MenuItem
                    onClick={() => {
                      // handleCloseMenuActions();
                      // openSidebar('courier');
                    }}
                  >
                    Assign Courier
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      // handleCloseMenuActions();
                      // openSidebar('courier');
                    }}
                  >
                    Re-Assign Courier
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleOpenDialog('confirm_pickup', 'Are You sure You Want To Confirm Pickup Of This Order')}>
                  Confirm Pickup
                </MenuItem>
                <MenuItem onClick={() => handleOpenDialog('confirm_delivery', 'Are You sure You Want To Confirm Delivery Of This Order')}>
                  Confirm Delivery
                </MenuItem>
                <MenuItem onClick={() => handleOpenDialog('cancel', 'Are You sure You Want To Cancel This Order')}>Cancel Order</MenuItem>
                {selectedRow.isFullyPaid === false ? (
                  <MenuItem onClick={() => handleOpenDialog('confirm_payment', 'Are You sure You Want To Confirm Payment Of This Order')}>
                    Confirm Payment
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => handleOpenDialog('cancel_payment', 'Are You sure You Want To Cancel Payment Of This Order')}>
                    Cancel Payment
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    //   handleCloseMenuActions();
                    //   openSidebar('track');
                  }}
                >
                  Track Order
                </MenuItem>
              </div>
            )}

            {/* <MenuItem onClick={() => handleAction('Approve')}>Approve</MenuItem>
                <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem> */}
          </Menu>
        </>}

      {actionType !== null && (
        <AlertConfrimationDialog
          open={isDialogOpen}
          handleClose={handleCloseDialog}
          message={message}
          onConfirm={() => {
            handleCloseMenuActions();
            if (actionType === 'approve') {
              handleCloseDialog();
              dispatch(approveOrder({ id: selectedRow.id }));
            }
            if (actionType === 'assign_courier') {
              handleCloseDialog();
              // dispatch(
              //   assignCourierToRegularOrder({
              //     id: selectedRow.id,
              //     courierId: selectedCourier.id,
              //     courierName: selectedCourier.firstName,
              //     courierPhone: selectedCourier.phone
              //   })
              // );
              closeSidebar();
            }
            if (actionType === 'confirm_pickup') {
              handleCloseDialog();
              dispatch(confirmRegularOrderPickUp({ id: selectedRow.id }));
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
            if (actionType === 'confirm_payment') {
              handleCloseDialog();
              dispatch(toggleOrderPaymentStatus({ id: selectedRow.id, isFullyPaid: true }));
            }
            if (actionType === 'cancel_payment') {
              handleCloseDialog();
              dispatch(toggleOrderPaymentStatus({ id: selectedRow.id, isFullyPaid: false }));
            }
            if (actionType === 're-publish') {
              handleCloseDialog();
              dispatch(approveOrder({ id: selectedRow.id }));
            }
          }}
        />
      )}
    </Paper>
  );
}

// Define PropTypes for the Table component
RegularOrdersTable.propTypes = {
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      orderNo: PropTypes.string.isRequired,
      orderTrackerNo: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      parcelSenderName: PropTypes.string.isRequired,
      parcelSenderPhone: PropTypes.string.isRequired,
      clientAccountType: PropTypes.string.isRequired,
      parcelReceiverName: PropTypes.string.isRequired,
      parcelReceiverPhone: PropTypes.string.isRequired,
      totalCharges: PropTypes.number.isRequired,
      isFullyPaid: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};


const Row = (props) => {
  const { row, handleClick } = props;
  const [openDetail, setOpenDetail] = React.useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenDetail(!openDetail)}
          >
            {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.id === 'actions' ?
                <IconButton onClick={(event) => handleClick(event, row)}>
                  <MoreVertIcon />
                </IconButton>
                : column.id === 'status' ? <>
                  {value === 'pending' ? (
                    <Chip label="Pending" color="primary" variant="outlined" />
                  ) : value === 'approved' ? (
                    <Chip label="Approved" color="primary" variant="contained" />
                  ) : value === 'assigned' ? (
                    <Chip label="Assigned" color="secondary" variant="outlined" />
                  ) : value === 'pickedUp' ? (
                    <Chip label="PickedUp" color="secondary" variant="contained" />
                  ) : value === 'delivered' ? (
                    <Chip label="Delivered" color="success" variant="contained" />
                  ) : value === 'cancelled' || value === 'rejected' ? (
                    <Chip label={capitalize(value)} color="error" variant="contained" />
                  ) : (
                    <Chip label={capitalize(value)} variant="outlined" />
                  )}
                </> : column.id === 'isFullyPaid' ? <>
                  {value ? (
                    <Chip label="Fully Paid" color="success" variant="contained" />
                  ) : (
                    <Chip label="Not Paid" color="secondary" variant="outlined" />
                  )}
                </> : column.id === 'clientAccountType' ? <>
                {value === "corporate" ? (
                    <Chip label="Corporate" color="warning" variant="contained" />
                  ) : (
                    <Chip label="Personal" color="primary" variant="outlined" />
                  )}
                </> :
                  (<>
                    {column.format ? column.format(value) : value}
                  </>)}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openDetail} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
