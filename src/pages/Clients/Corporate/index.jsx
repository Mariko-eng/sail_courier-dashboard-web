import { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Card } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import SideNav from '../../../components/sidenav/SideNav';
import CorporateNew from './new';
import Edit from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { materialTableIcons } from '../../../utils/material-table-icons';
import { columns } from './columns';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsCorporate, deleteClient } from './../store/extra_reducers';
import MaterialTable from 'material-table';
import UiLoadingOverlay from '../../../components/overlay';

const ClientsCorporate = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

    const dispatch = useDispatch();
    const store = useSelector((state) => state.clients);

    const data = store.data;

    const newLoadList = structuredClone(data);

    // console.log(newLoadList);

    useEffect(() => {
      dispatch(fetchClientsCorporate());
    }, [dispatch]);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
        <MainCard
          title="Clients - Corporate"
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
                title="Clients"
                columns={columns}
                data={newLoadList}
                // onRowClick={(event, rowData, togglePanel) => togglePanel()}
                actions={[
                  {
                    icon: Edit,
                    tooltip: 'Edit',
                    // eslint-disable-next-line no-unused-vars
                    onClick: (event, rowData) => {}
                  },

                  // eslint-disable-next-line no-unused-vars
                  (rowData) => ({
                    icon: ClearIcon,
                    tooltip: 'Delete Order',
                    onClick: (event, rowData) => {
                      var result = confirm('You want to delete this client? ' + rowData.username);
                      if (result === true) {
                        dispatch(deleteClient(rowData.id));
                      }
                    }
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
          </Card>
        </MainCard>
      </UiLoadingOverlay>

      <SideNav showSidebar={showSidebar} closeSidebar={closeSidebar}>
        <CorporateNew />
      </SideNav>
    </>
  );
};

export default ClientsCorporate;
