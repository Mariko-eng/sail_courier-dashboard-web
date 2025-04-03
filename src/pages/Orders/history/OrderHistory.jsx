import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState, useCallback } from 'react'
import SideNav from '../../../components/sidenav/SideNav'
import { LoadingButton } from '@mui/lab'
import { add_order_history, fetch_order_history } from '../../../services/order_history'
import { prettyDate } from '../../../utils/app-functions'

const ViewOrderHistoryBtn = ({ order }) => {
    const [desc, setDesc] = useState("");
    const [descError, setDescError] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // State to track if data has been loaded

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const results = await fetch_order_history({ id: order.id });
            setOrderHistoryData(results);
        } catch (error) {
            console.error('Error fetching data: ', error);
            // Optional: Set error state and display message to the user
        } finally {
            setLoading(false);
        }
    }, [order.id]);

    const handleSubmit = async () => {
        // Early return to prevent further execution
        if (desc.length < 10) {
            setDescError("Description should be at least 10 characters.");
            return;
        }
        setDescError('');
        const data = { order, description: desc };
        setSubmitting(true);

        try {
            await add_order_history(data);
            setDesc("");
            fetchData();  // Re-fetch data after submitting new history
        } catch (error) {
            console.error('Error submitting data: ', error);
            // Optional: Display error message to user
        } finally {
            setSubmitting(false);
        }
    }

    const handleViewHistoryClick = () => {
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
                color="secondary"
                onClick={handleViewHistoryClick}  // Trigger data load and sidebar toggle
            >
                Track Order
            </Button>

            <SideNav showSidebar={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Box height="10px" />
                    <Typography variant="h4" component="h2">Order Tracking History</Typography>
                    <Box height="20px" />
                    <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Update Tracking Information"
                        multiline
                        maxRows={4}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    {descError && <Box sx={{ color: 'red' }}>{descError}</Box>}
                    <Box height="20px" />
                    <LoadingButton
                        disableElevation
                        loading={submitting}
                        disabled={submitting}
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </LoadingButton>

                    {loading && (
                        <Box display={"flex"} justifyContent={"center"} my={2}>
                            <CircularProgress color="secondary" />
                        </Box>
                    )}

                    <Box my={2}>
                    {orderHistoryData.map((item, index) => (
                        <Box key={index} mb={2} p={2} sx={{ background: 'blue', borderRadius: '10px' }}>
                            <Box mt={1} color={"white"}>{item.description}</Box>
                            <Box mt={2} display={'flex'} justifyContent={'end'} color={'cornsilk'}>
                                {prettyDate(item.createdAt)}
                            </Box>
                        </Box>
                    ))}
                    </Box>
                </Box>
            </SideNav>
        </>
    );
}

export default ViewOrderHistoryBtn;
