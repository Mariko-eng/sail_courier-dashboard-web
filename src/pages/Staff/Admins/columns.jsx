import { Chip } from '@mui/material';
import { capitalize, prettyDate } from '../../../utils/app-functions';

export const columns = [
  {
    title: '#',
    field: 'agentNo',
    cellStyle: {
      backgroundColor: '#039be5',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#039be5'
    }
  },
  { title: 'Username', field: 'username' },

  { title: 'Primary Contact', field: 'phone' },

  { title: 'Secondary Contact', field: 'phone2' },

  { title: 'Location', field: 'locationName', render: (rowData) => <div>{capitalize(rowData.locationName)}</div> },

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
