import { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import MainCard from '../../../ui-component/cards/MainCard';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsPersonal } from './../store/reducers/extra_reducers'
import UiLoadingOverlay from '../../../components/overlay';
import ClientsPersonalTable from './table';
import { fetch_clients_personal } from '../../../services/clients';


const ClientsPersonal = () => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


    // Memoize fetchData function to prevent unnecessary rerenders
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        const {results} = await fetch_clients_personal();
        // const results = await fetchRegularOrders(queryParams.toString());
        setLoading(false);
        setData(results);
        // setOrderData(results.entries);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data: ', error);
      }
    }, [rowsPerPage]);
  
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);

  return (
    <>
      <UiLoadingOverlay loading={loading}>
        <MainCard title="Clients - Personal">
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <ClientsPersonalTable clients={data}
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
