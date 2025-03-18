import * as React from 'react';
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
import { Menu, MenuItem, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { prettyDate } from '../../../../../utils/app-functions';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { id: 'index', label: 'Index', minWidth: 70 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'warehouseAddressPlaceName', label: 'Address', minWidth: 200 },
    { id: 'phone', label: 'Phone Contact', minWidth: 170 },
    { id: 'email', label: 'Email Address', minWidth: 100 },
    { id: 'isActive', label: 'Status', minWidth: 100 },
    {
        id: 'createdAt', label: 'Created At', minWidth: 100,
        format: (value) => prettyDate(value),
    },
    { id: 'actions', label: 'Actions', minWidth: 100 }, // Add action column
];

function processData(dataList, query) {
    let newData = [];
    for (var i = 0; i < dataList.length; i++) {
        newData.push({
            index: i + 1,
            ...dataList[i],
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

export default function WarehousesTable({ warehouses }) {
    const userStore = useSelector((store) => store.auth);

    const loggedInUser = userStore.user;

    const [page, setPage] = React.useState(0); 
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const dispatch = useDispatch();

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
            // console.log(`Performing ${action} on row`, selectedRow);

            if (action === "Activate") {
                var result = confirm('You want to activate this client? ' + selectedRow.name);
                if (result === true) {
                    dispatch(activateClient(selectedRow.id));
                }
            }

            if (action === "Deactivate") {
                var result = confirm('You want to deactivate this client? ' + selectedRow.name);
                if (result === true) {
                    dispatch(deactivateClient(selectedRow.id));
                }
            }

            if (action === "Delete") {
                var result = confirm('You want to delete this client? ' + selectedRow.name);
                if (result === true) {
                    dispatch(deleteClient(selectedRow.id));
                }
            }

            handleClose();
        }
    };

    const open = Boolean(anchorEl);

    const rows = processData(warehouses, searchQuery);

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
                sx={{ my: "10px" }}
            />
                <TableContainer sx={{ minHeight: 240 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                {columns.map((column, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            column.label !== "Index" && (
                                                <TableCell
                                                    key={index}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                        }
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'actions' ?
                                                            <IconButton onClick={(event) => handleClick(event, row)}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            : column.id === 'isActive' ? <div>
                                                                {value === true ? 
                                                                <Chip label="YES" color="primary" variant="contained" /> : 
                                                                <Chip label="NO" color="danger" variant="contained" />
                                                                }
                                                            </div>
                                                            : column.format ? (column.format(value)) :
                                                                (
                                                                    value
                                                                )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {selectedRow !== null && loggedInUser.corporate_account_type === "admin" &&
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {/* <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem> */}
                </Menu>
            }
        </>
    );
}

// Define PropTypes for the Table component
WarehousesTable.propTypes = {
    warehouses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            company: PropTypes.object.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            isActive: PropTypes.bool,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};