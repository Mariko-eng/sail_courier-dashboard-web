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
import { IconButton } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { prettyDate } from '../../../../utils/app-functions';
import { useDispatch } from 'react-redux';
import { deleteClient } from '../../store/reducers/extra_reducers';

const columns = [
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'companyName', label: 'Company Name', minWidth: 150 },
    { id: 'companyAddress', label: 'Company Address', minWidth: 200 },
    {
        id: 'createdAt', label: 'Created At', minWidth: 100,
        format: (value) => prettyDate(value),
    },
    { id: 'actions', label: 'Actions', minWidth: 100 }, // Add action column
];

function processData(dataList) {
    let newData = [];
    for (var i = 0; i < dataList.length; i++) {
        var cname = `${dataList[i].company.companyName}`;
        var caddr = `${dataList[i].company.companyAddressPlaceName}`;

        newData.push({
            ...dataList[i],
            companyName: cname,
            companyAddress: caddr,
            action: 'Actions' // Example value for action button
        })
    }

    return newData;
}

export default function ClientsCorporateTable({ clients }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

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

            if (action === "Delete") {
            var result = confirm('You want to delete this client? ' + selectedRow.username);
            if (result === true) {
              dispatch(deleteClient(selectedRow.id));
            }
        }

            handleClose();
        }
    };

    const open = Boolean(anchorEl);

    const rows = processData(clients)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
ClientsCorporateTable.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            company: PropTypes.object.isRequired,
            username: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};