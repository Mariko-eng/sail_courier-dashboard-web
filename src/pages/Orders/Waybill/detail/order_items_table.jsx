import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteWaybillOrderItemModal from '../../../../../../../components/orders/waybill/delete/order_item';

export default function WaybillOrderItemsListTable({ orderDetails, onRefresh }) {
    // Check if there are no orderItems
    if (orderDetails?.waybillorderitem_set?.length < 1) {
        return <></>; // Return nothing if no items
    }


    return (
        <TableContainer component={Paper}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                boxShadow: 'none'
            }}>
            <Table
                sx={{
                    minWidth: 800,
                    '& .MuiTableCell-root': {
                        py: 1.5,
                        fontSize: '0.875rem'
                    },
                    '& .MuiTableCell-sizeMedium': {
                        py: 2
                    }
                }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell sx={{ fontWeight: 600, width: '250px' }}>Item Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Delivery Location</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Receiver Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Receiver Phone</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Items/Pkg</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Packages</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Total Weight (kg)</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orderDetails?.waybillorderitem_set?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{ width: '250px', py: 3 }}>
                                <Tooltip title={row.item_name} arrow placement="top-start">
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '250px'
                                        }}
                                    >
                                        {row.item_name.length > 30
                                            ? `${row.item_name.substring(0, 30)}...`
                                            : row.item_name}
                                    </Typography>
                                </Tooltip>
                                {row.item_description && (
                                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                                        {row.item_description.length > 30
                                            ? `${row.item_description.substring(0, 30)}...`
                                            : row.item_description}
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell align="right">{row.drop_off_point?.name}</TableCell>
                            <TableCell align="right">{row.parcel_receiver_name}</TableCell>
                            <TableCell align="right">{row.parcel_receiver_phone}</TableCell>
                            <TableCell align="right">{row.items_per_package}</TableCell>
                            <TableCell align="right">{row.no_of_packages}</TableCell>
                            <TableCell align="right">
                                <Typography variant="body2" fontWeight={500}>
                                    {Number(row.total_package_weight).toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <DeleteWaybillOrderItemModal orderItem={row} onRefresh={onRefresh} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
