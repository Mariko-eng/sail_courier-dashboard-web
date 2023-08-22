import { useState, useEffect } from 'react';
import SideNav from '../../../components/sidenav/SideNav';
import ShoppingOrdersNew from './new';
// import { useDispatch, useSelector } from 'react-redux';

const LaundryOrders = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // const dispatch = useDispatch();
  // const store = useSelector((state) => state.orders);

  // console.log(store);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   dispatch(fetchRegularOrders());
  // }, [dispatch]);

  // const orders = store.orders;

  // const newLoadList = structuredClone(orders);

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        {/* <MaterialTable
          icons={materialTableIcons}
          title="Orders"
          columns={columns}
          data={newLoadList}
          detailPanel={[
            {
              icon: ArrowDropDownIcon,
              openIcon: ArrowDropUpIcon,
              render: (rowData) => {
                return (
                  <div>
                    <div style={{ display: 'flex' }}>
                      <p>From : </p> <p>{rowData.pickName}</p>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>To : </p> <p>{rowData.dropName}</p>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>Pickup OTP : </p> <p>{rowData.senderOtpCode}</p>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>Dropoff OTP : </p> <p>{rowData.receiverOtpCode}</p>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>Receiver Name : </p> <p>{rowData.parcelReceiverName}</p>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>Receiver Phone : </p> <p>{rowData.parcelReceiverPhone}</p>{' '}
                    </div>
                  </div>
                );
              }
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          actions={[
            {
              icon: AddCircleIcon,
              tooltip: 'Add ',
              isFreeAction: true,
              // eslint-disable-next-line no-unused-vars
              // onClick: (event) => alert('You want to add a new row')
              onClick: (event) => {
                console.log(event);
                openSidebar();
              }
            },
            {
              icon: SaveAltIcon,
              tooltip: 'Save Order',
              onClick: (event, rowData) => alert('You saved ' + rowData.name)
            },
            (rowData) => ({
              icon: ClearIcon,
              tooltip: 'Delete Order',
              onClick: (event, rowData) => confirm('You want to delete ' + rowData.name),
              disabled: rowData.birthYear < 2000
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
        /> */}
      </div>
      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <ShoppingOrdersNew />
      </SideNav>
    </>
  );
};

export default LaundryOrders;