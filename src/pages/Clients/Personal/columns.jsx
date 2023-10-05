import { Chip } from '@mui/material';
import { capitalize, prettyDate } from '../../../utils/app-functions';

export const columns = [
  { title: 'Account Type', field: 'accountType', render: (rowData) => <div>{capitalize(rowData.accountType)}</div> },

  { title: 'Username', field: 'username', render: (rowData) => <div>{capitalize(rowData.username)}</div> },

  { title: 'Email', field: 'email' },

  { title: 'Phone Number', field: 'phone' },

  {
    title: 'isPhoneVerified',
    field: 'isPhoneVerified',
    render: (rowData) => (
      <div>{rowData.isPhoneVerified === 'Yes' ? <Chip label="Yes" color="primary" /> : <Chip label={'No'} variant="outlined" />}</div>
    )
  },
  {
    title: 'isActive',
    field: 'isActive',
    render: (rowData) => (
      <div>{rowData.isActive === 'Yes' ? <Chip label="Yes" color="primary" /> : <Chip label={'No'} variant="outlined" />}</div>
    )
  },
  {
    title: 'Date',
    field: 'createdAt',
    render: (rowData) => <div>{prettyDate(rowData.createdAt)}</div>
  }
];
