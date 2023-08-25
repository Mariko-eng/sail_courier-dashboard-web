import { useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Card } from '@mui/material';
import SideNav from '../../../components/sidenav/SideNav';
import { AddCircle } from '@mui/icons-material';
import CouriersNew from './new';

import { columns } from './columns';
import { materialTableIcons } from '../../../utils/material-table-icons';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouriers } from './store';
import MaterialTable from 'material-table';


const Couriers = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const openSidebar = () => {
      setShowSidebar(true);
    };

    const closeSidebar = () => {
      setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const store = useSelector((state) => state.couriers);

    const data = store.data;

    const newLoadList = structuredClone(data);

    // console.log(newLoadList);

    useEffect(() => {
      dispatch(fetchCouriers());
    }, [dispatch]);

  return (
    <>
      <MainCard
        title="Staff - Couriers"
        secondary={
          <Button variant="outlined" startIcon={<AddCircle />} onClick={openSidebar}>
            New
          </Button>
        }
      >

        <Card sx={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <MaterialTable
              icons={materialTableIcons}
              title="Couriers"
              columns={columns}
              data={newLoadList}
              // onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
        </Card>
      </MainCard>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CouriersNew />
      </SideNav>
    </>
  );
}

export default Couriers