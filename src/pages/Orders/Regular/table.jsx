import * as React from 'react';

import PropTypes from 'prop-types';

import { Paper, Button } from '@mui/material';
import { Chip, TextField, InputAdornment } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import SearchIcon from '@mui/icons-material/Search';

import { capitalize, prettyDate } from '../../../utils/app-functions';

import { useNavigate } from 'react-router-dom';


const columns = [
  {
    id: 'createdAt', label: 'Date', align: 'left', minWidth: 170,
    format: (value) => prettyDate(value),
  },
  { id: 'orderNo', label: 'N0', align: 'center', minWidth: 100 },
  { id: 'orderTrackerNo', label: 'Tracker ID', align: 'center', minWidth: 170 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 },
  { id: 'parcelSenderName', label: 'Sender Name', align: 'center', minWidth: 150 },
  { id: 'parcelSenderPhone', label: 'Sender Phone', align: 'center', minWidth: 150 },
  // { id: 'parcelReceiverName', label: 'Receiver Name', align: 'center', minWidth: 100 },
  // { id: 'parcelReceiverPhone', label: 'Receiver Phone', align: 'centercenter', minWidth: 100 },
  { id: 'clientAccountType', label: 'Client Type', align: 'right', minWidth: 100 },
  // { id: 'totalCharges', label: 'Total Cost',align: 'center', minWidth: 100 },
  // { id: 'isFullyPaid', label: 'is Fully Paid', align: 'center', minWidth: 100 },
  { id: 'createdByEmail', label: 'Client Account', align: 'center', minWidth: 100 },
  { id: 'action', label: 'Action', align: 'center', minWidth: 100 }, // Add action column
  // { id: 'actions', label: 'Actions', align: 'center', minWidth: 100 }, // Add action column
];


function processData(dataList, query) {
  let newData = [];
  for (var i = 0; i < dataList.length; i++) {
    const createdByEmail = dataList[i].createdByDetails?.email || '';
    var cords = `${dataList[i].companyAddressCordinatesLat} , ${dataList[i].companyAddressCordinatesLng}`;
    newData.push({
      ...dataList[i],
      companyAddressCordinates: cords,
      createdByEmail: createdByEmail,
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
      orderDetails: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default function RegularOrdersTable({ orders, rowsPerPage, setRowsPerPage }) {
  const [page, setPage] = React.useState(0);

  const [searchQuery, setSearchQuery] = React.useState('');

  const navigate = useNavigate();

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
    navigate(`/orders/regular/detail/${row.id}`);
  };

  const rows = processData(orders, searchQuery);

  return (
    <>
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
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ justifyContent: "center", minWidth: column.minWidth }}
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
      </Paper>
    </>
  );
}


const Row = (props) => {
  const { row, handleClick } = props;

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.id === 'action' ?
                <Button onClick={(event) => handleClick(event, row)}>
                  VIEW
                </Button>
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
    </>
  )
}
