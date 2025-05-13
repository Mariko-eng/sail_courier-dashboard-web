// CustomerForm to edit customer details
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// material-ui
import { Box, Button, Chip, Skeleton } from '@mui/material';
import { red } from '@mui/material/colors';
import { Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// third party
import { API } from '../../../../utils/api';
import { formatError } from '../../../../utils/axios-error';
import { auth } from '../../../../config/firebase';
import { formatNumberWithCommas, prettyDate } from '../../../../utils/app-functions';
import { useSelector } from 'react-redux';
import RegularOrderActionsMenuButton from './actions';
import ViewOrderHistoryBtn from '../../history/OrderHistory';
import AssignCourierToOrderBtn from '../../actions/AssignCourier';
import { fetch_regular_order_detail } from '../../../../services/orders';
import ConfirmRegularOrderDeliveryBtn from '../../actions/ConfirmDelivery';


const RegularOrdersDetail = () => {
    const { id } = useParams();

    const store = useSelector(store => store.auth);
    const loggedInUser = store.user;

    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const fetchData = useCallback(async () => {
        // console.log("Fetching Data");
        try {
            const order = await fetch_regular_order_detail(id);
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

    const orderDetails = orderData;

    // console.log("orderDetails", orderDetails)

    return (
        <>
            {/* Update Banner for refresh */}
            {isRefreshing && (
                <Box sx={{ backgroundColor: '#FFEB3B', padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Updating Order Details...</Typography>
                </Box>
            )}

            <Box sx={{ width: '100%' }}>

                {/* Buttons for actions */}
                <Box display={"flex"} justifyContent={"end"} sx={{ my: 2 }}>
                    <Grid container spacing={2}>
                        {/* {!["cancelled", "rejected"].includes(orderDetails.status) && (
                            <Grid xs={4}>
                                <RegularOrderActionsMenuButton order={orderDetails} onRefresh={handleRefresh} />
                            </Grid>
                        )} */}

                        <Grid xs={4}>
                            <RegularOrderActionsMenuButton order={orderDetails} onRefresh={handleRefresh} />
                        </Grid>

                        {!["pending", "delivered", "cancelled", "rejected"].includes(orderDetails.status) && (
                            <Grid xs={4}>
                                <AssignCourierToOrderBtn order={orderDetails} onRefresh={handleRefresh} />
                            </Grid>
                        )}
                        {!["pending", "delivered", "cancelled", "rejected"].includes(orderDetails.status) && (
                            <Grid xs={4}>
                                <ConfirmRegularOrderDeliveryBtn order={orderDetails} onRefresh={handleRefresh} />
                            </Grid>
                        )}
                        <Grid xs={4}>
                            <ViewOrderHistoryBtn order={orderDetails} />
                        </Grid>
                        {loggedInUser.isSuperAdmin && (
                            <Grid xs={4}>
                                <Button variant="contained" sx={{ backgroundColor: red[900], '&:hover': { backgroundColor: red[800] } }}>
                                    Delete Order
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {/* Order Details */}
                <Card sx={{ my: 1 }}>
                    <CardContent sx={{ backgroundColor: '#F8FAFC' }}>
                        <Box sx={{ mb: 2, p: 1 }}>
                            <Box display="flex" justifyContent="flex-end">
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {orderDetails.created_at
                                        ? moment.utc(orderDetails.created_at).local().format('MMMM Do YYYY, h:mm:ss a')
                                        : 'Not Available'}
                                </Typography>
                            </Box>
                            {orderDetails.createdByDetails?.email && (
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body2" sx={{ color: 'gray' }}>
                                        {orderDetails.createdByDetails.email}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order Number:</Typography>
                                <Typography variant="body2">{orderDetails.regular_order?.order?.order_no || 'Not Available'}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order Tracker Number:</Typography>
                                <Typography variant="body2">{orderDetails.regular_order?.order?.order_tracker_no || 'Not Available'}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order Type</Typography>
                                <Typography variant="body2">{orderDetails.regular_order?.order?.order_type?.toUpperCase() || 'Not Available'}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>ORDER STATUS</Typography>
                                <Chip label={orderDetails?.status.toUpperCase()} color="primary" variant="outlined" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Parcel Details */}
                <Card sx={{ my: 1 }}>
                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Parcel Details
                        </Typography>
                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Parcel Content:</Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.item_name || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>Parcel Description:</Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.item_description || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>Parcel Weight:</Typography>
                            <Typography variant="body2" sx={{ color: '#00796B' }}>
                                {orderDetails?.parcel_weight || 'Not Available'} kg
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>Parcel Risk:</Typography>
                            <Typography variant="body2" sx={{ color: '#00796B' }}>
                                {orderDetails?.parcel_risk || 'Not Available'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Sender and Receiver Info */}
                <Card sx={{ my: 1 }}>
                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Sender and Receiver Info
                        </Typography>
                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                            {/* Sender Info */}
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Sender Name:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.parcel_sender_name || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Sender Phone:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.parcel_sender_phone || 'Not Available'}
                            </Typography>

                            {/* Receiver Info */}
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Receiver Name:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.parcel_receiver_name || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Receiver Phone:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.parcel_receiver_phone || 'Not Available'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Delivery Details */}
                <Card sx={{ my: 1 }}>
                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Delivery Details
                        </Typography>
                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Pickup Location:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.regular_order?.pick_up_point?.google_place_name || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Dropoff Location:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.drop_off_point?.google_place_name || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Scheduled Delivery Time:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.regular_order?.order?.scheduled_pickup_datetime
                                    ? moment.utc(orderDetails.regular_order?.order?.scheduled_pickup_datetime).local().format('MMMM Do YYYY, h:mm:ss a')
                                    : 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Trip Duration:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.trip_duration || 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Distance:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {orderDetails?.distance_str || 'Not Available'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Financial Details */}
                <Card sx={{ my: 1 }}>
                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Financial Details
                        </Typography>
                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Total Charges:
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#00796B' }}>
                                {orderDetails?.total_charges ? orderDetails.total_charges : 'Not Available'}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Amount Paid:
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#00796B' }}>
                                {orderDetails?.amount_paid ? orderDetails.amount_paid : 'Not Available'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Delivery Instructions  (Conditional Rendering) */}
                {orderDetails?.orderDetails?.parcelDeliveryInstructions && orderDetails?.orderDetails?.parcelDeliveryInstructions !== "" && (
                    <Card sx={{ my: 1 }}>
                        <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                Delivery Instructions
                            </Typography>
                            <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {orderDetails?.orderDetails?.parcelDeliveryInstructions || 'Not Available'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* additionalNotes (Conditional Rendering) */}
                {orderDetails?.additionalNotes && orderDetails?.additionalNotes !== "" && (
                    <Card sx={{ my: 1 }}>
                        <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                Additional Notes/Remarks
                            </Typography>
                            <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {orderDetails?.additionalNotes || 'Not Available'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {/* Courier Info (Conditional Rendering) */}
                {
                    ['assigned', 'picked_up', 'in_transit'].includes(orderDetails.status) && (
                        <>
                            {orderDetails?.pickedup_by && orderDetails?.pickedup_by?.id !== "" && (
                                <Card sx={{ my: 1 }}>
                                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            Pickup Courier Information
                                        </Typography>
                                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                Courier Name:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {orderDetails?.pickedup_by?.user?.userprofile?.username || 'Not Available'}
                                            </Typography>

                                            <Typography variant="body1" sx={{ mt: 2 }}>
                                                Courier Phone:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {orderDetails?.pickedup_by?.user?.userprofile?.phone || 'Not Available'}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )
                }

                {
                    ['delivered'].includes(orderDetails.status) && (
                        <>
                            {orderDetails?.delivered_by && orderDetails?.delivered_by.id !== "" && (
                                <Card sx={{ my: 1 }}>
                                    <CardContent sx={{ backgroundColor: '#E0F2F1' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            Delivery Courier Information
                                        </Typography>
                                        <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', p: 2 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                Courier Name:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {orderDetails?.delivered_by?.user?.userprofile?.username || 'Not Available'}
                                            </Typography>

                                            <Typography variant="body1" sx={{ mt: 2 }}>
                                                Courier Phone:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {orderDetails?.delivered_by?.user?.userprofile?.phone || 'Not Available'}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )
                }

            </Box>
        </>
    );
};

export default RegularOrdersDetail
