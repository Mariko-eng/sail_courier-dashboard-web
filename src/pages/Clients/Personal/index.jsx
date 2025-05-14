import { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import MainCard from '../../../ui-component/cards/MainCard';

// ** Store & Actions
import UiLoadingOverlay from '../../../components/overlay';
import ClientsPersonalTable from './table';
import { fetch_clients_personal } from '../../../services/clients';
 

const ClientsPersonal = () => {
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);


  // Memoize fetchData function to prevent unnecessary rerenders
  const fetchData = useCallback(async () => {
    const queryParams = new URLSearchParams({
      page: currentPageNo.toString(),
      page_size: currentPageSize.toString(),
    });

    try {
      setLoading(true);
      const { count, results } = await fetch_clients_personal(queryParams.toString());
      setLoading(false);
      setTotalCount(count);
      setClients(results);
      // setOrderData(results.entries);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  },
    [currentPageNo, currentPageSize]
  );


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <UiLoadingOverlay loading={loading}>
        <MainCard title="Clients - Personal">
          <Card sx={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <ClientsPersonalTable
                clients={clients}
                totalCount={totalCount}
                currentPageSize={currentPageSize}
                setCurrentPageSize={setCurrentPageSize}
                currentPageNo={currentPageNo}
                setCurrentPageNo={setCurrentPageNo}
              />
            </div>
          </Card>
        </MainCard>
      </UiLoadingOverlay>
    </>
  );
};

export default ClientsPersonal;
