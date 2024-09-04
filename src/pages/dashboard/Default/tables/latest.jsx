import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { Chip, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { capitalize, prettyDate } from '../../../../utils/app-functions';

const columns = [
  {
    id: 'createdAt', label: 'Date', minWidth: 100,
    format: (value) => prettyDate(value),
  },
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
];


function processData(dataList) {
  let newData = [];
  for (var i = 0; i < dataList.length; i++) {
    var cords = `${dataList[i].companyAddressCordinatesLat} , ${dataList[i].companyAddressCordinatesLng}`;
    newData.push({
      ...dataList[i],
      companyAddressCordinates: cords,
    })
  }

  return newData;
}

export default function LatestOrdersTable({ orders }) {

  const rows = processData(orders);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="center"
                    p={2}
                  >
                    No Data!
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <Row key={index} row={row} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

// Define PropTypes for the Table component
LatestOrdersTable.propTypes = {
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
  const { row } = props;
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
              {column.id === 'status' ? <>
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
