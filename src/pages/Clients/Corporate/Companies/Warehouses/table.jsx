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
import { Menu, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { prettyDate } from '../../../../../utils/app-functions';
import { useSelector } from 'react-redux';

const columns = [
    { id: 'index', label: 'Index', minWidth: 70 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'google_place_name', label: 'Address', minWidth: 200 },
    { id: 'contact_person_name', label: 'Contact Person', minWidth: 170 },
    { id: 'contact_person_phone', label: 'Phone Contact', minWidth: 170 },
    { id: 'contact_person_email', label: 'Email Address', minWidth: 100 },
    {
        id: 'created_at', label: 'Created At', minWidth: 100,
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

export default function WarehousesTable({
    warehouses,
    totalCount,
    currentPageSize,
    setCurrentPageSize,
    currentPageNo,
    setCurrentPageNo,
}) {
    const userStore = useSelector((store) => store.auth);

    const loggedInUser = userStore.user;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');

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
                    // Continue to perfom action
                }
            }

            if (action === "Deactivate") {
                var result = confirm('You want to deactivate this client? ' + selectedRow.name);
                if (result === true) {
                    // Continue to perfom action
                }
            }

            if (action === "Delete") {
                var result = confirm('You want to delete this client? ' + selectedRow.name);
                if (result === true) {
                    // Continue to perfom action
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
                    component="div"
                    rowsPerPageOptions={[50, 100, 150]}
                    count={totalCount} // from API: count
                    rowsPerPage={currentPageSize}
                    page={currentPageNo - 1}
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
            // company: PropTypes.object.isRequired,
            google_place_id: PropTypes.string.isRequired,
            google_place_name: PropTypes.string.isRequired,
            google_place_lat: PropTypes.string.isRequired,
            google_place_lng: PropTypes.string.isRequired,
            location_type: PropTypes.string.isRequired,
            contact_person_name: PropTypes.string.isRequired,
            contact_person_phone: PropTypes.string.isRequired,
            contact_person_email: PropTypes.string,
            created_at: PropTypes.string.isRequired,
        })
    ).isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    setCurrentPageSize: PropTypes.func.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    setCurrentPageNo: PropTypes.func.isRequired,
};