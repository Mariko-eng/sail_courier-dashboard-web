import React from 'react';
import toast from "react-hot-toast";
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import AlertConfirmationDialog from '../../../../components/dailog/confirmDialog';
import {
    approve_regular_order,
    confirm_regular_order_pickup,
    confirm_regular_order_delivery,
    reject_regular_order,
    cancel_regular_order,
    toggle_order_payment_status,
    reorder_regular_order
} from '../../../../services/orders';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
        ...theme.applyStyles?.('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

const RegularOrderActionsMenuButton = ({ order, onRefresh }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState(null);
    const [message, setMessage] = React.useState('Are You Sure that you want To Continue?');
    const [loading, setLoading] = React.useState(false);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleOpenAlertDialog = (action, desc) => {
        setMessage(desc);
        setActionType(action);
        setIsAlertDialogOpen(true);
    };

    const handleCloseAlertDialog = () => {
        setIsAlertDialogOpen(false);
        handleCloseMenu();
    };

    const confirmPaymentMenuItem = (action, desc) => (
        <MenuItem key={"payment"} onClick={() => handleOpenAlertDialog(action, desc)}>
            {action === 'confirm_payment' ? 'Confirm Payment' : 'Cancel Payment'}
        </MenuItem>
    );

    const renderMenuItems = () => {
        if (!order) return null;

        const { status, isFullyPaid } = order;
        const paymentAction = isFullyPaid ? 'cancel_payment' : 'confirm_payment';
        const paymentDesc = `Are you sure you want to ${isFullyPaid ? 'Cancel' : 'Confirm'} Payment of this order?`;

        const menuItems = {
            delivered: [
                <MenuItem key={"cancel1"} onClick={() => handleOpenAlertDialog('cancel', 'Are you sure you want to cancel this order?')}>
                    Cancel Order
                </MenuItem>,
                <MenuItem key={"cancel2"} onClick={() => handleOpenAlertDialog('re_order', 'Are you sure you want to clone this order?')}>
                    Clone & Reorder
                </MenuItem>,
                // confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            cancelled: [
                <MenuItem key={"re-order1"} onClick={() => handleOpenAlertDialog('re_order', 'Are you sure you want to clone this order?')}>
                    Clone & Reorder
                    </MenuItem>,
                // confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            rejected: [
                <MenuItem key={"re-order"} onClick={() => handleOpenAlertDialog('re_order', 'Are you sure you want to clone this order?')}>
                    Clone & Reorder
                    </MenuItem>,
                // confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            pending: [
                <MenuItem key={"approve"} onClick={() => handleOpenAlertDialog('approve', 'Are you sure you want to approve this order?')}>
                    Approve Order
                </MenuItem>,
                <MenuItem key={"reject"} onClick={() => handleOpenAlertDialog('reject', 'Are you sure you want to reject this order?')}>
                    Reject Order
                </MenuItem>
            ],
            approved: [
                <MenuItem key={"pickup"} onClick={() => handleOpenAlertDialog('confirm_pickup', 'Confirm pickup of this order?')}>
                    Confirm Pickup
                </MenuItem>,
                <MenuItem key={"delivery"} onClick={() => handleOpenAlertDialog('confirm_delivery', 'Confirm delivery of this order?')}>
                    Confirm Delivery
                </MenuItem>,
                <MenuItem key={"cancel"} onClick={() => handleOpenAlertDialog('cancel', 'Are you sure you want to cancel this order?')}>
                    Cancel Order
                </MenuItem>,
                // confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            assigned: [
                <MenuItem key={"cancel"} onClick={() => handleOpenAlertDialog('cancel', 'Are you sure you want to cancel this order?')}>
                    Cancel Order
                </MenuItem>
            ],
        };

        return menuItems[status] || [];
    };

    const handleActionConfirmation = async () => {
        setLoading(true);
        handleCloseAlertDialog();

        try {
            let response;

            switch (actionType) {
                case 'approve':
                    response = await approve_regular_order({ id: order.id });
                    break;

                case 'confirm_pickup':
                    response = await confirm_regular_order_pickup({ id: order.id });
                    break;

                case 'confirm_delivery':
                    response = await confirm_regular_order_delivery({ id: order.id });
                    break;

                case 'reject':
                    response = await reject_regular_order({ id: order.id });
                    break;

                case 'cancel':
                    response = await cancel_regular_order({ id: order.id });
                    break;

                case 're_order':
                    response = await reorder_regular_order({ id: order.id });
                    break;
                case 'confirm_payment':
                case 'cancel_payment':
                    response = await toggle_order_payment_status({
                        id: order.id,
                        isFullyPaid: actionType === 'confirm_payment'
                    });
                    break;

                default:
                    console.warn("Unknown action:", actionType);
            }

            if (response) {
                toast.success('Action completed successfully', { position: 'top-right' });
                onRefresh();
            }
        } catch (err) {
            console.error(err);
            toast.error('Action failed', { position: 'bottom-right' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleClick} disabled={loading}>
                More Actions
            </Button>

            <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {renderMenuItems()}
            </StyledMenu>

            <AlertConfirmationDialog
                open={isAlertDialogOpen}
                handleClose={handleCloseAlertDialog}
                message={message}
                onConfirm={handleActionConfirmation}
            />
        </>
    );
};

export default RegularOrderActionsMenuButton;
