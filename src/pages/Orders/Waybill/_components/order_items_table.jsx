import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteWaybillOrderModal from './delete_order_modal';


export default function OrderItemsTable({ orderDetails, onRefresh }) {
    // Check if there are no orderItems
    if (orderDetails?.orderItems?.length < 1) {
        return <></>; // Return nothing if no items
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name of item</TableCell>
                        <TableCell align="right">Deliver To?</TableCell>
                        <TableCell align="right">Receiver Name</TableCell>
                        <TableCell align="right">Receiver Phone</TableCell>
                        <TableCell align="right">Items Per Package</TableCell>
                        <TableCell align="right">No Of Packages</TableCell>
                        <TableCell align="right">Total Weight&nbsp;(kg)</TableCell>
                        {/* <TableCell align="right">Action</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderDetails?.orderItems?.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.deliveryLocation}</TableCell>
                            <TableCell align="right">{row.receiverName}</TableCell>
                            <TableCell align="right">{row.receiverPhone}</TableCell>
                            <TableCell align="right">{row.itemsPerPackageCount}</TableCell>
                            <TableCell align="right">{row.totalPackagesCount}</TableCell>
                            <TableCell align="right">{row.totalPackageWeight}</TableCell>
                            {/* <TableCell align="right">
                                <DeleteWaybillOrderModal orderDetails={orderDetails} orderItem={row} onRefresh={onRefresh} />
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
