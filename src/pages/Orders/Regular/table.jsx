import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Paper, Button, Chip, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { capitalize, prettyDate } from '../../../utils/app-functions';

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
    const core = order.regular_order?.order || {};
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

// Table Component
export default function RegularOrdersTable({ orders, rowsPerPage, setRowsPerPage }) {
  const [page, setPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const rows = processData(orders, searchQuery);
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleClick = (event, row) => navigate(`/orders/regular/detail/${row.id}`);

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
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <Row key={row.id} row={row} handleClick={handleClick} />
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
    </Paper>
  );
}

// Row Renderer
const Row = ({ row, handleClick }) => (
  <TableRow hover tabIndex={-1}>
    {columns.map((column) => {
      const value = row[column.id];

      if (column.id === 'action') {
        return (
          <TableCell key={column.id} align={column.align}>
            <Button onClick={(event) => handleClick(event, row)}>Manage</Button>
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
              <Chip label="Fully Paid" color="success" variant="contained" />
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

// Render chip for status
const renderStatusChip = (value) => {
  switch (value) {
    case 'pending':
      return <Chip label="Pending" color="primary" variant="outlined" />;
    case 'approved':
      return <Chip label="Approved" color="primary" variant="contained" />;
    case 'assigned':
      return <Chip label="Assigned" color="secondary" variant="outlined" />;
    case 'pickedUp':
      return <Chip label="PickedUp" color="secondary" variant="contained" />;
    case 'delivered':
      return <Chip label="Delivered" color="success" variant="contained" />;
    case 'cancelled':
    case 'rejected':
      return <Chip label={capitalize(value)} color="error" variant="contained" />;
    default:
      return <Chip label={capitalize(value)} variant="outlined" />;
  }
};

RegularOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired
};
