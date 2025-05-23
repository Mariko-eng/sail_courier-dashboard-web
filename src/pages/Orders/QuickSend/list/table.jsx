import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Button, Chip, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { capitalize, prettyDate } from '../../../../utils/app-functions';

// Column definitions
const columns = [
  { id: 'createdAt', label: 'Date', align: 'left', minWidth: 170, format: prettyDate },
  { id: 'orderNo', label: 'No', align: 'center', minWidth: 100 },
  { id: 'orderTrackerNo', label: 'Tracker ID', align: 'center', minWidth: 170 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 },
  { id: 'parcelSenderName', label: 'Sender Name', align: 'center', minWidth: 150 },
  { id: 'parcelSenderPhone', label: 'Sender Phone', align: 'center', minWidth: 150 },
  { id: 'totalCharges', label: 'Total Cost', align: 'center', minWidth: 100 },
  { id: 'isFullyPaid', label: 'Fully Paid', align: 'center', minWidth: 100 },
  { id: 'action', label: 'Action', align: 'center', minWidth: 100 },
];

// Transform nested structure into flat table row
function processData(dataList, query) {
  const newData = dataList.map(order => {
    const core = order.QuickSend_order?.order || {};
    const createdAt = core.created_at || order.created_at;
    const isFullyPaid = parseFloat(order.amount_paid || 0) >= parseFloat(order.total_charges || 0);

    return {
      id: order.id,
      createdAt,
      orderNo: core.order_no || '',
      orderTrackerNo: core.order_tracker_no || order.tracker_no,
      status: order.status || core.status,
      parcelSenderName: order.parcel_sender_name,
      parcelSenderPhone: order.parcel_sender_phone,
      totalCharges: `UGX ${Number(order.total_charges || 0).toLocaleString()}`,
      isFullyPaid,
      action: 'Actions'
    };
  });

  if (!query) return newData;

  return newData.filter(item =>
    Object.values(item).some(val =>
      (typeof val === 'string' || typeof val === 'number') &&
      val.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
}

// Table component
export default function QuickSendOrdersTable({
  orders,
  totalCount,
  currentPageSize,
  setCurrentPageSize, 
  currentPageNo,
  setCurrentPageNo,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const rows = processData(orders, searchQuery);

  // Optional: filter on client-side if necessary
  const filteredOrders = rows.filter(order =>
    Object.values(order).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPageNo(newPage + 1); // +1 because TablePagination is 0-indexed
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentPageSize(parseInt(event.target.value, 10));
    setCurrentPageNo(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPageNo(1);
  };

  const handleClick = (event, row) => {
    navigate(`/orders/quick-send/detail/${row.id}`);
  };

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
        sx={{ mb: 1, p: 1 }}
      />

      <TableContainer sx={{ minHeight: 240 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((row) => (
              <DataRow key={row.id} row={row} handleClick={handleClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[50, 100, 150]}
        count={totalCount} // from API: count
        rowsPerPage={currentPageSize}
        page={currentPageNo - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// Row Renderer
const DataRow = ({ row, handleClick }) => (
  <TableRow hover tabIndex={-1}>
    {columns.map((column) => {
      const value = row[column.id];

      if (column.id === 'action') {
        return (
          <TableCell key={column.id} align={column.align}>
            <Button onClick={(e) => handleClick(e, row)}>Manage</Button>
          </TableCell>
        );
      }

      if (column.id === 'status') {
        return (
          <TableCell key={column.id} align={column.align}>
            {renderStatusChip(value)}
          </TableCell>
        );
      }

      if (column.id === 'isFullyPaid') {
        return (
          <TableCell key={column.id} align={column.align}>
            {value ? (
              <Chip label="Fully Paid" color="success" />
            ) : (
              <Chip label="Not Paid" color="secondary" variant="outlined" />
            )}
          </TableCell>
        );
      }

      return (
        <TableCell key={column.id} align={column.align}>
          {column.format ? column.format(value) : value}
        </TableCell>
      );
    })}
  </TableRow>
);

// Status chip helper
const renderStatusChip = (value) => {
  switch (value) {
    case 'pending':
      return <Chip label="Pending" color="primary" variant="outlined" />;
    case 'approved':
      return <Chip label="Approved" color="primary" />;
    case 'assigned':
      return <Chip label="Assigned" color="secondary" />;
    case 'pickedUp':
      return <Chip label="Picked Up" color="secondary" />;
    case 'delivered':
      return <Chip label="Delivered" color="success" />;
    case 'cancelled':
    case 'rejected':
      return <Chip label={capitalize(value)} color="error" />; 
    default:
      return <Chip label={capitalize(value)} variant="outlined" />;
  }
};

QuickSendOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPageSize: PropTypes.number.isRequired,
  setCurrentPageSize: PropTypes.func.isRequired,
  currentPageNo: PropTypes.number.isRequired,
  setCurrentPageNo: PropTypes.func.isRequired,
};
