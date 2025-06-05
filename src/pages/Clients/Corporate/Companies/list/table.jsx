import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, IconButton, Menu, MenuItem
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { prettyDate } from '../../../../../utils/app-functions';

const columns = [
    { id: 'index', label: 'Index', minWidth: 70 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'address_place_name', label: 'Location', minWidth: 170 },
    { id: 'coordinates', label: 'Coordinates', minWidth: 130 },
    {
        id: 'created_at', label: 'Created At', minWidth: 100,
        format: (value) => prettyDate(value),
    },
    { id: 'action2', label: 'Action', minWidth: 100 },
];

function processData(dataList) {
    return dataList.map((company, index) => {
        const coordinates = `${company.address_place_lat ?? 'N/A'}, ${company.address_place_lng ?? 'N/A'}`;
        return {
            index: index + 1,
            ...company,
            coordinates,
            action: 'Toggle'
        };
    });
}

export default function CorporateCompanniesTable({
    companies,
    totalCount,
    currentPageSize,
    setCurrentPageSize,
    currentPageNo,
    setCurrentPageNo,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [toggledRows, setToggledRows] = React.useState(new Set());

    const navigate = useNavigate();

    const handleToggle = (id) => {
        setToggledRows(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

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
        if (!selectedRow) return;

        if (action === "Delete") {
            const confirmed = window.confirm(`You want to delete this company? ${selectedRow.name}`);
            if (confirmed) {
                // continue
            }
        }

        handleClose();
    };

    const open = Boolean(anchorEl);
    const rows = processData(companies);

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ minHeight: 240 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                {columns.map((column) => (
                                    column.label !== "Index" && (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                 .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'action2' ? (
                                                        <IconButton onClick={(event) => handleClick(event, row)}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    ) : column.format ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
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
            </Paper>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/user-accounts/`)}>User Accounts</MenuItem>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/warehouses`)}>Warehouses</MenuItem>
                <MenuItem onClick={() => navigate(`/orders/quick-send/?company=${selectedRow?.id}`)}>QuickSend Orders</MenuItem>
                {/* <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/orders-quick-send`)}>QuickSend Orders</MenuItem> */}
                <MenuItem onClick={() => navigate(`/orders/waybill/?company=${selectedRow?.id}`)}>Waybill Orders</MenuItem>
                {/* <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/orders-waybill`)}>Waybill Orders</MenuItem> */}
                <MenuItem onClick={() => handleAction('Delete')}>Delete Company</MenuItem>
            </Menu>
        </>
    );
}

// Updated PropTypes
CorporateCompanniesTable.propTypes = {
    companies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            address_place_name: PropTypes.string.isRequired,
            address_place_lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            address_place_lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            created_at: PropTypes.string.isRequired,
            contact_person_name: PropTypes.string,
            contact_person_email: PropTypes.string,
            contact_person_phone: PropTypes.string,
        })
    ).isRequired,
    totalCount: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    setCurrentPageSize: PropTypes.func.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    setCurrentPageNo: PropTypes.func.isRequired,
};
