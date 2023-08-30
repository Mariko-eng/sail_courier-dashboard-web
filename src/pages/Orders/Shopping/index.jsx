import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MaterialTable from 'material-table';
import { useEffect } from 'react';
import { materialTableIcons } from '../../../utils/material-table-icons';
import { columns } from './columns';

// ** Store & Actions
import { fetchShoppingOrders } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia } from '@mui/material';
import { capitalize } from '../../../utils/app-functions';

const Shopping = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchShoppingOrders());
  }, [dispatch]);

  const orders = store.orders;

  const newLoadList = structuredClone(orders);

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <MaterialTable
          icons={materialTableIcons}
          title="Laundry Orders"
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
                        {rowData.parcelItems.map((obj, index) => (
                          <div key={index} style={{ display: 'flex', marginRight: '10px' }}>
                            <div style={{ width: '50px' }}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                height="30"
                                width="40"
                                image={obj.item.imageFormat + ',' + obj.item.imageBase64}
                              />
                            </div>
                            <div style={{ width: '50px' }}>{obj.item.name}</div>
                            <div style={{ width: '50px' }}>{obj.itemQty}</div>
                            <div>{obj.item.price * obj.itemQty}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontWeight: 'bold' }}>Delivery Point - {rowData.receiverOtpCode}</div>
                      <div style={{ paddingLeft: '10px' }}>{rowData.dropName}</div>
                      <div style={{ paddingLeft: '10px' }}>{capitalize(rowData.parcelSenderName)}</div>
                      <div style={{ paddingLeft: '10px' }}>{rowData.parcelSenderPhone}</div>
                    </div>
                  </Card>
                );
              }
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          actions={[
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
    </>
  );
};

export default Shopping