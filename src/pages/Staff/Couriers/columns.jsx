import { Chip } from '@mui/material';
import { capitalize, prettyDate } from '../../../utils/app-functions';

export const columns = [
  {
    title: '#',
    field: 'courierNo',
    cellStyle: {
      backgroundColor: '#039be5',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#039be5'
    }
  },
  { title: 'First Name', field: 'firstName', render: (rowData) => <div>{capitalize(rowData.firstName)}</div> },

  { title: 'Sur Name', field: 'surName', render: (rowData) => <div>{capitalize(rowData.surName)}</div> },

  { title: 'Email', field: 'email' },

  { title: 'Phone Number', field: 'phone' },

  {
    title: 'Date',
    field: 'createdAt',
    render: (rowData) => <div>{prettyDate(rowData.createdAt)}</div>
  },
  {
    title: 'isOnline',
    field: 'isOnline',
    render: (rowData) => (
      <div>{rowData.isOnline === 'Yes' ? <Chip label="Yes" color="primary" /> : <Chip label={'No'} variant="outlined" />}</div>
    )
  }
];
