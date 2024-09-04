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
import { IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { prettyDate } from '../../../utils/app-functions';


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

export default function LaundryOrdersTable({ orders, rowsPerPage, setRowsPerPage }) {
    const [page, setPage] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');

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

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleAction = (action) => {
        if (selectedRow) {
            // Perform action based on the selectedRow
            console.log(`Performing ${action} on row`, selectedRow);
            handleClose();
        }
    };

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

            <TableContainer sx={{ minHeight: 440 }}>
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
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleAction('Approve')}>Approve</MenuItem>
                <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem>
            </Menu>
        </Paper>
    );
}

// Define PropTypes for the Table component
LaundryOrdersTable.propTypes = {
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
                                :
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
