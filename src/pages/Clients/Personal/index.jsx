import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MainCard from '../../../ui-component/cards/MainCard';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsPersonal, deleteClient } from './../store/extra_reducers'
// import MaterialTable from 'material-table';
import UiLoadingOverlay from '../../../components/overlay';
import ClientsPersonalTable from './table';


const ClientsPersonal = () => {
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.clients);

  const data = store.data;

  const newLoadList = structuredClone(data);

  // console.log(newLoadList);

  useEffect(() => {
    dispatch(fetchClientsPersonal());
  }, [dispatch]);

  return (
    <>
      <UiLoadingOverlay loading={store.loading}>
        <MainCard title="Clients - Personal">
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <ClientsPersonalTable clients={newLoadList}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>
    </>
  );
};

export default ClientsPersonal;
