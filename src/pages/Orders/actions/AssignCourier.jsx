/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { fetch_couriers } from '../../../services/couriers';
import { assign_courier_to_regular_order } from '../../../services/orders';
import SideNav from '../../../components/sidenav/SideNav';


const AssignCourierToOrderBtn = ({ order, onRefresh }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [couriers, setCouriers] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // State to track if data has been loaded

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const results = await fetch_couriers();
            setCouriers(results);
        } catch (error) {
            console.error('Error fetching data: ', error);
            // Optional: Set error state and display message to the user
        } finally {
            setLoading(false);
        }
    }, []); 

    const handleSelect = async (courier) => {
        const data = {
            id: order.id,
            courierId: courier.id,
            courierName: courier.firstName,
            courierPhone: courier.phone
        };

        setSubmitting(true);

        try {
            await assign_courier_to_regular_order(data);
            setIsSidebarOpen(false);
            onRefresh();  // Re-fetch data after submitting new history
        } catch (error) {
            console.error('Error submitting data: ', error);
            // Optional: Display error message to user
        } finally {
            setSubmitting(false);
        }
    }

    const handleOpenSidebar = () => {
        setIsSidebarOpen(prev => !prev);
        if (!isDataLoaded) {
            fetchData(); // Fetch data only when the button is clicked for the first time
            setIsDataLoaded(true); // Mark that data has been loaded
        }
    };


    return (
        <>
            <Button
                variant="contained"
                sx={{ backgroundColor: "#651fff" }}
                onClick={handleOpenSidebar}  // Trigger data load and sidebar toggle
            >
                {order.status === "approved" ? "Assign Courier" : "Reassign Courier"}
            </Button>

            <SideNav showSidebar={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)}>
                <Box my={2}>
                    <Typography variant="h4" component="h2">Select Courier For Assignment</Typography>
                </Box>

                {loading && (
                    <Box display={"flex"} justifyContent={"center"} my={2}>
                        <CircularProgress color="secondary" />
                    </Box>
                )}

                {couriers.length >= 1 && (
                    <Box my={2}>Sorry, No Data Found!</Box>
                )}

                {/* Scrollable Container for couriers */}
                <Box
                    my={2}
                    sx={{
                        overflowY: 'auto',   // Make it scrollable
                    }}
                >
                    {couriers.map((obj) => (
                        <Paper key={obj.id} sx={{ mb: '20px', p: 2, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box flex={1}>{obj.courierNo}</Box>
                                <Box display={'flex'} flex={2} flexDirection={'column'} alignItems={'center'}>
                                    <Box>
                                        {obj.firstName} {obj.surName}
                                    </Box>
                                    <Box>{obj.phone}</Box>
                                </Box>
                                <Box flex={1}>
                                    <Button
                                        color={"primary"}
                                        onClick={() => handleSelect(obj)}
                                        disabled={submitting}
                                    >
                                        Select
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </SideNav>
        </>
    );
};

export default AssignCourierToOrderBtn;
