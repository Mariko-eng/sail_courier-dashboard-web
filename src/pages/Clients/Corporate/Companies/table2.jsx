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
import { ToggleOn, ToggleOff } from '@mui/icons-material'; // Example icons
import { prettyDate } from '../../../../utils/app-functions';


// const columns = [
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

const columns = [
    { id: 'companyUniqueNo', label: 'ID', minWidth: 170 },
    { id: 'companyName', label: 'Name', minWidth: 170 },
    { id: 'companyEmail', label: 'Email', minWidth: 100 },
    { id: 'companyPhone', label: 'Phone', minWidth: 100 },
    { id: 'companyAddressPlaceName', label: 'Location', minWidth: 100 },
    { id: 'companyAddressCordinates', label: 'Coordinates', minWidth: 100 },
    {
        id: 'createdAt', label: 'Created At', minWidth: 100,
        format: (value) => prettyDate(value),
    },
    { id: 'action', label: 'Action', minWidth: 100 }, // Add action column
    { id: 'action2', label: 'Action', minWidth: 100 }, // Add action column
];

function processData(dataList) {
    let newData = [];
    for (var i = 0; i < dataList.length; i++) {
        var cords = `${dataList[i].companyAddressCordinatesLat} , ${dataList[i].companyAddressCordinatesLng}`;
        newData.push({
            ...dataList[i],
            companyAddressCordinates: cords,
            action: 'Toggle' // Example value for action button
        })
    }

    return newData;
}

export default function StickyHeadTable({ companies }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const [toggledRows, setToggledRows] = React.useState(new Set());

    const handleToggle = (id) => {
        setToggledRows(prev => {
            const newToggledRows = new Set(prev);
            if (newToggledRows.has(id)) {
                newToggledRows.delete(id);
            } else {
                newToggledRows.add(id);
            }
            return newToggledRows;
        });
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

    const rows = processData(companies)

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
                                                    {column.id === 'action' ? (
                                                        <IconButton onClick={() => handleToggle(row.companyUniqueNo)}>
                                                            {toggledRows.has(row.companyUniqueNo) ? <ToggleOn /> : <ToggleOff />}
                                                        </IconButton>
                                                    ) : column.id === 'action2' ?
                                                        <IconButton onClick={(event) => handleClick(event, row)}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        :
                                                        (
                                                            value
                                                        )}

                                                    {/* {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value} */}

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
StickyHeadTable.propTypes = {
    companies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            companyUniqueNo: PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            companyEmail: PropTypes.string.isRequired,
            companyPhone: PropTypes.string.isRequired,
            contactPersonName: PropTypes.string.isRequired,
            contactPersonPhone: PropTypes.string.isRequired,
            contactPersonEmail: PropTypes.string.isRequired,
            companyAddressPlaceId: PropTypes.string.isRequired,
            companyAddressPlaceName: PropTypes.string.isRequired,
            companyAddressCordinatesLat: PropTypes.number.isRequired,
            companyAddressCordinatesLng: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};