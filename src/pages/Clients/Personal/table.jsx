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
import { Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { prettyDate } from '../../../utils/app-functions';


const columns = [
    { id: 'index', label: 'Index', minWidth: 70 },
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
        id: 'createdAt', label: 'Created At', minWidth: 100,
        format: (value) => prettyDate(value),
    },
    { id: 'actions', label: 'Actions', minWidth: 100 }, // Add action column
];

function processData(dataList, query) {
    let newData = dataList.map((item, idx) => {
        const userProfile = item.user?.userprofile || {};
        return {
            index: idx + 1,
            id: item.id,
            username: userProfile.username || '',
            phone: userProfile.phone || '',
            email: item.user?.email || '',
            createdAt: userProfile.created_at || '',
            raw: item, // keep raw object for actions
        };
    });

    if (!query) return newData;

    return newData.filter(item =>
        Object.entries(item).some(([key, val]) =>
            key !== 'index' &&
            val?.toString().toLowerCase().includes(query.toLowerCase())
        )
    );
}

export default function ClientsPersonalTable({
    clients,
    totalCount,
    currentPageSize,
    setCurrentPageSize,
    currentPageNo,
    setCurrentPageNo,
}) {
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
            console.log(`Performing ${action} on row`, selectedRow);
            handleClose();
        }
    };

    const open = Boolean(anchorEl);

    const rows = processData(clients, searchQuery);

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
                        {rows.map((row, index) => {
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
                                                    :
                                                    (<>
                                                        {column.format ? column.format(value) : value}
                                                    </>)}
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
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={() => handleAction('Approve')}>Approve</MenuItem>
                <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem> */}
            </Menu>
        </Paper>
    );
}

// Define PropTypes for the Table component
ClientsPersonalTable.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                email: PropTypes.string.isRequired,
                userprofile: PropTypes.shape({
                    username: PropTypes.string.isRequired,
                    phone: PropTypes.string.isRequired,
                    created_at: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired,
        })
    ).isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    setCurrentPageSize: PropTypes.func.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    setCurrentPageNo: PropTypes.func.isRequired,
};
