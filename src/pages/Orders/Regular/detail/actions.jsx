import React from 'react';
import toast from "react-hot-toast";
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import SelectCourier from '../../actions/SelectCourier';
import SideNav from '../../../../components/sidenav/SideNav';
import AlertConfirmationDialog from '../../../../components/dailog/confirmDialog';
import { approve_order, confirm_order_delivery, confirm_regular_Order_pickup, cancel_order, reject_order } from '../../../../services/orders';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
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
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[300],
      }),
    },
  }));

const RegularOrderActionsMenuButton = ({ order, onRefresh }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
    const [isCourierSidebarOpen, setIsCourierSidebarOpen] = React.useState(false);
    const [selectedCourier, setSelectedCourier] = React.useState({});
    const [actionType, setActionType] = React.useState(null);
    const [message, setMessage] = React.useState('Are You Sure that you want To Continue?');

    const handleCloseMenu = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);  // This will open the menu
    };

    const handleOpenAlertDialog = (action, desc) => {
        setMessage(desc);
        setActionType(action);
        setIsAlertDialogOpen(true);
    };

    const handleCloseAlertDialog = () => {
        setIsAlertDialogOpen(false);
        handleCloseMenu();
    };

    const openCourierSidebar = () => setIsCourierSidebarOpen(true);
    const closeCourierSidebar = () => setIsCourierSidebarOpen(false);

    const confirmPaymentMenuItem = (action, desc) => (
        <MenuItem key={"payment1"} onClick={() => handleOpenAlertDialog(action, desc)}>
            {action === 'confirm_payment' ? 'Confirm Payment' : 'Cancel Payment'}
        </MenuItem>
    );

    const renderMenuItems = () => {
        if (!order) return null;

        const { status, isFullyPaid } = order;

        const paymentAction = isFullyPaid ? 'cancel_payment' : 'confirm_payment';
        const paymentDesc = `Are You sure You Want To ${isFullyPaid ? 'Cancel' : 'Confirm'} Payment Of This Order`;

        const menuItems = {
            cancelled: [
                confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            delivered: [
                confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            rejected: [
                <MenuItem key={"rejected1"} onClick={() => handleOpenAlertDialog('re_publish', 'Are You sure You Want To Re-publish This Order')}>
                    Republish Order
                </MenuItem>,
                confirmPaymentMenuItem(paymentAction, paymentDesc)
            ],
            pending: [
                <MenuItem key={"pending1"} onClick={() => handleOpenAlertDialog('approve', 'Are You sure You Want To Approve This Order')}>
                    Approve Order
                </MenuItem>,
                <MenuItem key={"pending2"} onClick={() => handleOpenAlertDialog('reject', 'Are You sure You Want To Reject This Order')}>
                    Reject Order
                </MenuItem>
            ],
            approved: [
                <MenuItem key={"approved2"} onClick={() => handleOpenAlertDialog('confirm_pickup', 'Are You sure You Want To Confirm Pickup Of This Order')}>
                    Confirm Pickup
                </MenuItem>,
                <MenuItem key={"approved3"} onClick={() => handleOpenAlertDialog('confirm_delivery', 'Are You sure You Want To Confirm Delivery Of This Order')}>
                    Confirm Delivery
                </MenuItem>,
                <MenuItem key={"approved4"} onClick={() => handleOpenAlertDialog('cancel', 'Are You sure You Want To Cancel This Order')}>
                    Cancel Order
                </MenuItem>,
                confirmPaymentMenuItem(paymentAction, paymentDesc)
            ]
        };

        return menuItems[status] || [];
    };

    const handleActionConfirmation = async () => {
        handleCloseAlertDialog();

        switch (actionType) {
            case 'approve':
                try {
                    const response = await approve_order({ id: order.id });
                    console.log({ "success": response });
                    toast.success('Finished', { position: 'top-right' });
                    onRefresh();
                } catch (err) {
                    toast.success('Failed', { position: 'bottom-right' });
                }
                break;
            case 'confirm_pickup':
                try {
                    const response = await confirm_regular_Order_pickup({ id: order.id });
                    console.log({ "success": response });
                    toast.success('Finished', { position: 'top-right' });
                    onRefresh();
                } catch (err) {
                    toast.success('Failed', { position: 'bottom-right' });
                }
                break;
            case 'confirm_delivery':
                try {
                    const response = await confirm_order_delivery({ id: order.id });
                    console.log({ "success": response });
                    toast.success('Finished', { position: 'top-right' });
                    onRefresh();
                } catch (err) {
                    toast.success('Failed', { position: 'bottom-right' });
                }
                break;
            case 'reject':
                try {
                    const response = await reject_order({ id: order.id });
                    console.log({ "success": response });
                    toast.success('Finished', { position: 'top-right' });
                    onRefresh();
                } catch (err) {
                    toast.success('Failed', { position: 'bottom-right' });
                }
                break;
            case 'cancel':
                try {
                    const response = await cancel_order({ id: order.id });
                    console.log({ "success": response });
                    toast.success('Finished', { position: 'top-right' });
                    onRefresh();
                } catch (err) {
                    toast.success('Failed', { position: 'bottom-right' });
                }
                break;
            case 're_publish':
            case 'confirm_payment':
            case 'cancel_payment':
                // toggleOrderPaymentStatus({ id: order.id, isFullyPaid: actionType === 'confirm_payment' });
                break;
            default:
                break;
        }
    };

    return (
        <>
            {/* Button to trigger the menu */}
            <Button variant="contained" onClick={handleClick}>
                More Actions
            </Button>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
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

            <SideNav showSidebar={isCourierSidebarOpen} closeSidebar={closeCourierSidebar}>
                <SelectCourier
                    selectedCourier={selectedCourier}
                    setSelectedCourier={setSelectedCourier}
                    onSelect={() => handleOpenAlertDialog('assign_courier', 'Are You sure You Want To Confirm Assign This Courier To This Order')}
                />
            </SideNav>
        </>
    );
};

export default RegularOrderActionsMenuButton;
