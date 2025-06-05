import * as React from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, TextField,
    InputAdornment, IconButton, Menu, MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { prettyDate } from '../../../../utils/app-functions';

const columns = [
    { id: 'index', label: '#', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 120 },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 150,
        format: (value) => prettyDate(value)
    },
    { id: 'actions', label: 'Actions', minWidth: 80 }
];

function processData(dataList, query) {
    const formatted = dataList.map((item, index) => ({
        id: item.id,
        index: index + 1,
        username: item.user?.userprofile?.username || '',
        email: item.user?.email || '',
        phone: item.user?.userprofile?.phone || '',
        createdAt: item.user?.userprofile?.created_at || ''
    }));

    if (!query) return formatted;

    return formatted.filter(item =>
        Object.values(item).some(val =>
            val.toString().toLowerCase().includes(query.toLowerCase())
        )
    );
}

export default function CouriersTable({ 
    couriers, 
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
        if (action === 'Delete' && selectedRow) {
            const confirmDelete = window.confirm(`You want to delete courier "${selectedRow.username}"?`);
            if (confirmDelete) {
                // continue
            }
        }
        handleClose();
    };

    const open = Boolean(anchorEl);
    const rows = processData(couriers, searchQuery);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TextField
                placeholder="Search couriers..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 2, p: 2 }}
            />

            <TableContainer sx={{ minHeight: 240 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows .map((row) => (
                            <TableRow hover key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id}>
                                            {column.id === 'actions' ? (
                                                <IconButton onClick={(e) => handleClick(e, row)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            ) : (
                                                column.format ? column.format(value) : value
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                rowsPerPageOptions={[50, 100, 150, 999]}
                count={totalCount} // from API: count
                rowsPerPage={currentPageSize}
                page={currentPageNo - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem>
            </Menu>
        </Paper>
    );
}

CouriersTable.propTypes = {
    couriers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                email: PropTypes.string,
                userprofile: PropTypes.shape({
                    username: PropTypes.string,
                    phone: PropTypes.string,
                    created_at: PropTypes.string
                })
            })
        })
    ).isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    setCurrentPageSize: PropTypes.func.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    setCurrentPageNo: PropTypes.func.isRequired,
};
