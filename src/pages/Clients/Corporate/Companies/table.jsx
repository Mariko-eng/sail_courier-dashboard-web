import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, IconButton, Menu, MenuItem
} from '@mui/material';
import { MoreVert as MoreVertIcon, ToggleOn, ToggleOff } from '@mui/icons-material';
import { prettyDate } from '../../../../utils/app-functions';
import { useDispatch } from 'react-redux';
import { deleteCorporateCompany } from '../../store/reducers/extra_reducers';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'index', label: 'Index', minWidth: 70 },
    { id: 'firebase_id', label: 'Firebase ID', minWidth: 100 },
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

export default function CorporateCompanniesTable({ companies }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [toggledRows, setToggledRows] = React.useState(new Set());

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToggle = (id) => {
        setToggledRows(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    const handleChangePage = (_, newPage) => setPage(newPage);

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
        if (!selectedRow) return;

        if (action === "Delete") {
            const confirmed = window.confirm(`You want to delete this company? ${selectedRow.name}`);
            if (confirmed) {
                dispatch(deleteCorporateCompany(selectedRow.id));
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'action' ? (
                                                        <IconButton onClick={() => handleToggle(row.firebase_id)}>
                                                            {toggledRows.has(row.firebase_id) ? <ToggleOn /> : <ToggleOff />}
                                                        </IconButton>
                                                    ) : column.id === 'action2' ? (
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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/user-accounts/`)}>User Accounts</MenuItem>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/warehouses`)}>Warehouses</MenuItem>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/orders-regular`)}>Orders: Regular</MenuItem>
                <MenuItem onClick={() => navigate(`/clients/corporate/companies/${selectedRow?.id}/orders-waybill`)}>Orders: Waybill</MenuItem>
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
            firebase_id: PropTypes.string.isRequired,
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
};
