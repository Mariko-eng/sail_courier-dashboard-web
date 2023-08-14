import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MaterialTable from 'material-table';
import { useEffect } from 'react';
import { materialTableIcons } from '../../../utils/material-table-icons';
import { columns } from './columns';
import SideNav from '../../../components/sidenav/SideNav';

// ** Store & Actions
import { fetchRegularOrders } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import ImageDropZone from '../../../components/input/ImageDropZone';

const NewRugular = () => {
  return (
    <div>
      <p>This is the content of the sidebar1.</p>
      <p>This is the content of the sidebar2.</p>
      <p>This is the content of the sidebar3.</p>
      <p>This is the content of the sidebar4.</p>
      <p>This is the content of the sidebar5.</p>
      <ImageDropZone />
    </div>
  );
};

const Regular = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const store = useSelector((state) => state.orders);

  // console.log(store);

  useEffect(() => {
    dispatch(fetchRegularOrders());
  }, [dispatch]);

  // // ** Get data on mount
  // useEffect(() => {
  //   const schoolId = userData.school ? userData.school.id : queryParams.get('school') ? queryParams.get('school') : null;
  //   const configs = {
  //     page: currentPage,
  //     size: rowsPerPage,
  //     parents: true
  //   };
  //   if (schoolId) {
  //     configs['school'] = schoolId;
  //   }
  //   if (searchTerm.length > 0) {
  //     configs['name'] = searchTerm;
  //   }
  //   setConfigParams(configs);
  //   dispatch(fetchUsers(configs));
  // }, [dispatch, currentPage, searchTerm]);

  const orders = store.orders;

  const newLoadList = structuredClone(orders);

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <MaterialTable
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
        />
      </div>
      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <NewRugular />
      </SideNav>
    </>
  );
};

export default Regular;
