import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import MaterialTable from 'material-table';
import { useEffect } from 'react';
import { materialTableIcons } from '../../../utils/material-table-icons';
import { columns } from './columns';
import SideNav from '../../../components/sidenav/SideNav';
// import MoreVertIcon from '@material-ui/icons/';

// ** Store & Actions
import { fetchRegularOrders } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Menu, MenuItem } from '@mui/material';
import { capitalize } from '../../../utils/app-functions';
import AlertConfrimationDialog from '../../../components/dailog/confirmDialog';
import SelectCourier from '../actions/SelectCourier';
import UiLoadingOverlay from '../../../components/overlay';
import { approveOrder ,assignCourierToRegularOrder, deleteOrder } from '../store/reducers';
import { confirmRegularOrderPickUp, confirmOrderdelivery } from '../store/reducers';
import { rejectOrder, cancelOrder } from '../store/reducers';
import OrderHistory from '../history';

const Regular = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [[anchorEl, selectedRow], setAnchorEl] = useState([null, undefined]);
  const [actionType, setActionType] = useState(null);
  const [message, setMessage] = useState('Are You Sure that you want To Continue?');
  const [sidebarType, setSidebarType] = useState("")
  const [selectedCourier, setSelectedCourier] = useState({});

  const handleOpenMenuActions = (event, rowData) => {
    // console.log(event);
    // console.log(rowData);
    setAnchorEl([event.currentTarget, rowData]);
  };

  const handleCloseMenuActions = () => {
    setAnchorEl([null, undefined]);
  };

    const handleCloseMenuActionsSideBar = () => {
      setAnchorEl((prev) => [null, prev[1]]);
    };

  const handleOpenDialog = (action, desc) => {
    setIsDialogOpen(true);
    setActionType(action);
    setMessage(desc);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const openSidebar = (type) => {
    setSidebarType(type)
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchRegularOrders());
  }, [dispatch]);

  const orders = store.orders;

  const newLoadList = structuredClone(orders);
  // console.log(store.loading);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
        <div style={{ overflowX: 'auto' }}>
          <MaterialTable
            icons={materialTableIcons}
            title="Regular Orders"
            columns={columns}
            data={newLoadList}
            detailPanel={[
              {
                icon: ArrowDropDownIcon,
                openIcon: ArrowDropUpIcon,
                render: (rowData) => {
                  return (
                    <Card sx={{ paddingLeft: '20px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>Package Items </div>
                        <div style={{ paddingLeft: '10px' }}>
                          {rowData.parcelItems.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>Pickup Point - {rowData.senderOtpCode} </div>
                        <div style={{ paddingLeft: '10px' }}>{rowData.pickName}</div>
                        <div style={{ paddingLeft: '10px' }}>{capitalize(rowData.parcelSenderName)}</div>
                        <div style={{ paddingLeft: '10px' }}>{rowData.parcelSenderPhone}</div>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>Delivery Point - {rowData.receiverOtpCode}</div>
                        <div style={{ paddingLeft: '10px' }}>{rowData.dropName}</div>
                        <div style={{ paddingLeft: '10px' }}>{capitalize(rowData.parcelReceiverName)}</div>
                        <div style={{ paddingLeft: '10px' }}>{rowData.parcelReceiverPhone}</div>
                      </div>
                    </Card>
                  );
                }
              }
            ]}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            actions={[
              {
                icon: MoreVertIcon,
                tooltip: 'More',
                onClick: handleOpenMenuActions
              },

              (rowData) => ({
                icon: ClearIcon,
                tooltip: 'Delete Order',
                onClick: (event, rowData) => {
                  var result = confirm('You want to delete order ' + rowData.orderTrackerNo);
                  if (result === true) {
                    dispatch(deleteOrder(rowData.id));
                  }
                },
                disabled: rowData.status !== 'cancelled' && rowData.status !== 'rejected'
              })
            ]}
            options={{
              // selection: true,
              actionsColumnIndex: -1,
              sorting: true,
              search: true,
              searchAutoFocus: true,
              searchFieldAlignment: 'right',
              searchFieldVariant: 'standard',
              paging: true,
              pageSizeOptions: [10, 20, 30, 50, 100],
              pageSize: 10,
              showFirstLastPageButtons: false,
              // paginationType:"stepped",
              // paginationPosition:"both",
              exportAllData: true,
              exportButton: true,
              title: 'Orders',
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
              },
              showSelectAllCheckbox: true
            }}
          />
        </div>
      </UiLoadingOverlay>

      {anchorEl !== null && (
        <Menu id="more-menu" anchorEl={anchorEl} keepMounted={true} open={Boolean(anchorEl)} onClose={handleCloseMenuActions}>
          {selectedRow.status === 'cancelled' || selectedRow.status === 'delivered' ? (
            <div>
              <MenuItem
                onClick={() => {
                  // handleCloseMenuActions();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : selectedRow.status === 'rejected' ? (
            <div>
              <MenuItem onClick={() => handleOpenDialog('re-publish', 'Are You sure You Want To Re-publish Of This Order')}>
                Republish Order
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : selectedRow.status === 'pending' ? (
            <div>
              <MenuItem onClick={() => handleOpenDialog('approve', 'Are You sure You Want To Approve This Order')}>Approve Order</MenuItem>
              <MenuItem onClick={() => handleOpenDialog('reject', 'Are You sure You Want To Reject This Order')}>Reject Order </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          ) : (
            <div>
              {selectedRow.status === 'approved' ? (
                <MenuItem
                  onClick={() => {
                    handleCloseMenuActionsSideBar();
                    openSidebar('courier');
                  }}
                >
                  Assign Courier
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseMenuActionsSideBar();
                    openSidebar('courier');
                  }}
                >
                  Re-Assign Courier
                </MenuItem>
              )}
              <MenuItem onClick={() => handleOpenDialog('confirm_pickup', 'Are You sure You Want To Confirm Pickup Of This Order')}>
                Confirm Pickup
              </MenuItem>
              <MenuItem onClick={() => handleOpenDialog('confirm_delivery', 'Are You sure You Want To Confirm Delivery Of This Order')}>
                Confirm Delivery
              </MenuItem>
              <MenuItem onClick={() => handleOpenDialog('cancel', 'Are You sure You Want To Cancel This Order')}>Cancel Order </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenuActionsSideBar();
                  openSidebar('track');
                }}
              >
                Track Order
              </MenuItem>
            </div>
          )}
        </Menu>
      )}
      {actionType !== null && (
        <AlertConfrimationDialog
          open={isDialogOpen}
          handleClose={handleCloseDialog}
          message={message}
          onConfirm={() => {
            handleCloseMenuActionsSideBar();
            if (actionType === 'approve') {
              handleCloseDialog();
              dispatch(approveOrder({ id: selectedRow.id }));
            }
            if (actionType === 'assign_courier') {
              handleCloseDialog();
              dispatch(
                assignCourierToRegularOrder({
                  id: selectedRow.id,
                  courierId: selectedCourier.id,
                  courierName: selectedCourier.firstName,
                  courierPhone: selectedCourier.phone
                })
              );
              closeSidebar();
            }
            if (actionType === 'confirm_pickup') {
              handleCloseDialog();
              dispatch(confirmRegularOrderPickUp({ id: selectedRow.id }));
            }
            if (actionType === 'confirm_delivery') {
              handleCloseDialog();
              dispatch(confirmOrderdelivery({ id: selectedRow.id }));
            }
            if (actionType === 'reject') {
              handleCloseDialog();
              dispatch(rejectOrder({ id: selectedRow.id }));
            }
            if (actionType === 'cancel') {
              handleCloseDialog();
              dispatch(cancelOrder({ id: selectedRow.id }));
            }
            if (actionType === 're-publish') {
              handleCloseDialog();
              // dispatch(approveOrder1({ id: selectedRow.id }));
            }
          }}
        />
      )}
      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        {sidebarType === 'courier' ? (
          <SelectCourier
            selectedCourier={selectedCourier}
            setSelectedCourier={setSelectedCourier}
            onSelect={() => {
              handleOpenDialog('assign_courier', 'Are You sure You Want To Confirm Assign This Courier To This Order');
            }}
          />
        ) : (
          <OrderHistory />
        )}
      </SideNav>
    </>
  );
};

export default Regular;
