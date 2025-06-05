import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { delete_waybill_order_item } from '../../../../services/orders';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteWaybillOrderItemModal = ({ orderItem, onRefresh }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const userStore = useSelector((store) => store.auth);
    const loggedInUser = userStore.user;

    const [loading, setLoading] = React.useState(false);  // State to track the loading status

    // Function to handle the deletion
    const deleteOrderItem = async () => {
        try {
            setLoading(true);

            // Call the API to update the waybill order items
            await delete_waybill_order_item(orderItem);

            // Close the modal and refresh the parent component
            handleClose();
            onRefresh();
        } catch (err) {
            console.error("Error deleting item:", err);
            setLoading(false);
        }
    };

    return (
        <>
            <IconButton aria-label="delete" onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h3' mb={"20px"}>Are you sure that you want to delete this item?</Typography>

                    {/* Action Buttons */}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                loading={loading}
                                disabled={loading}
                                fullWidth
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={deleteOrderItem} // Trigger delete when clicked
                            >
                                {loading ? "Deleting..." : "Continue"}
                            </LoadingButton>
                        </AnimateButton>

                        {/* Cancel Button */}
                        <Box mt={2}>
                            <Button
                                onClick={handleClose}  // Close modal without performing action
                                fullWidth
                                size="large"
                                variant="outlined"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default DeleteWaybillOrderItemModal;
