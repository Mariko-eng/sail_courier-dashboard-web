// CustomerForm to edit customer details
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Paper, Box, Typography, Skeleton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// uitls
import { prettyDate } from '../../../../utils/app-functions';

// services
import { fetch_waybill_order_detail } from '../../../../services/orders';
import DownloadWaybillOrderPdfButton from '../../../../components/orders/waybill/download/order_pdf';

const WaybillOrdersDetail = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const fetchData = useCallback(async () => {
        console.log("Fetching Data")
        try {
            const order = await fetch_waybill_order_detail(id);
            setOrderData(order); // Store the fetched data
            setLoading(false); // Set loading to false once the data is fetched
            setIsRefreshing(false); // Stop showing the refresh banner
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            console.log("Error fetching data: ", error);
        }
    }, [id]);


    // Effect to fetch data on mount and when `id` changes
    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        setIsRefreshing(false); // Reset refresh flag when loading new data
        fetchData();
    }, [id, fetchData]);

    // Function to manually trigger data fetching (e.g., on refresh)
    const handleRefresh = async () => {
        setIsRefreshing(true); // Show refresh banner
        setLoading(true); // Set loading to true on refresh
        await fetchData(); // Fetch the latest data
    };

    // Show skeletons while data is loading
    const renderSkeletons = () => (
        <>
            <Skeleton variant="rectangular" height={60} />
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid xs={4}><Skeleton variant="rectangular" height={60} /></Grid>
                <Grid xs={4}><Skeleton variant="rectangular" height={60} /></Grid>
                <Grid xs={4}><Skeleton variant="rectangular" height={60} /></Grid>
            </Grid>
            <Skeleton variant="rectangular" height={120} sx={{ my: 2 }} />
            <Skeleton variant="rectangular" height={120} sx={{ my: 2 }} />
        </>
    );

    if (loading && orderData === null) {
        return renderSkeletons(); // Display skeletons when data is being loaded
    }

    if (!loading && orderData === null) {
        return <p>No Data Found</p>;
    }

    // console.log("orderData", orderData)

    return (
        <div>
            {/* Update Banner for refresh */}
            {isRefreshing && (
                <Box sx={{ backgroundColor: '#FFEB3B', padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Updating Order Details...</Typography>
                </Box>
            )}

            {loading && <>Loading...</>}

            <Box display={"flex"} paddingX={2} my={1} flexDirection={"row"} justifyContent="space-between">
                <h4>Waybill Order</h4>
                <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
                    <h4 style={{ color: 'blue' }}>{orderData?.waybillTrackerNo}</h4>
                    <h6>{prettyDate(orderData?.created_at)}</h6>
                </Box>
            </Box>

            <Paper sx={{ p: 2 }}>
                <Box display={"flex"} justifyContent="space-between">
                    <h3>Delivery Info</h3>
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                    <div><strong>Pickup Point:</strong></div>
                    <div>{orderData?.pick_up_point?.name || "N/A"}</div>
                    <div>{orderData?.pick_up_point?.google_place_name || "N/A"}</div>
                </Box>
                <Box display={"flex"} mt={"10px"} flexDirection={"column"}>
                    <div><strong>Additional Notes:</strong></div>
                    <div>{orderData?.additional_notes || "N/A"}</div>
                </Box>
            </Paper>

            <Box my={4} sx={{ overflow: 'auto' }}>
                <TableContainer
                    component={Paper}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        boxShadow: 'none'
                    }}
                >
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
                        }}
                    >

                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.100' }}>
                                <TableCell sx={{ fontWeight: 600, width: '250px' }}>Item Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Delivery Location</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Receiver</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Phone</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Items/Pkg</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Packages</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Total Weight (kg)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderData?.waybillorderitem_set?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{
                                        '&:last-child td': { border: 0 },
                                        '&:hover': { bgcolor: 'action.hover' }
                                    }}
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
                                    <TableCell align="center">
                                        <Box>
                                            <Typography variant="body2">{row.drop_off_point?.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {[row.drop_off_point?.city, row.drop_off_point?.district]
                                                    .filter(Boolean).join(', ')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">{row.parcel_receiver_name}</Typography>
                                        {row.parcel_receiver_email && (
                                            <Typography variant="caption" color="text.secondary">
                                                {row.parcel_receiver_email}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {row.parcel_receiver_phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {row.items_per_package}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {row.no_of_packages}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" fontWeight={500}>
                                            {Number(row.total_package_weight).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            <Box my={4} display={"flex"} justifyContent={"space-between"}>

                {orderData?.waybillorderitem_set?.length >= 1 && (<DownloadWaybillOrderPdfButton orderId={id} />)}

                {
                    orderData?.is_published === false && orderData?.waybillorderitem_set?.length >= 1 && (

                        <div style={{ marginLeft: "10px", width: "200px" }}>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    // loading={isSubmitting}
                                    // disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Publish
                                </LoadingButton>
                            </AnimateButton>
                        </div>
                    )
                }
            </Box>
        </div>
    )
}

export default WaybillOrdersDetail;
