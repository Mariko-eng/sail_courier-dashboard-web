import { Chip } from '@mui/material';
import { capitalize, prettyDate } from '../../../utils/app-functions';

export const columns = [
  { title: 'Company Name', field: 'company', render: (rowData) => <div>{capitalize(rowData.company.companyName)}</div> },
  {
    title: 'Company Address',
    field: 'company',
    render: (rowData) => <div>{capitalize(rowData.company.companyAddress)}</div>
  },

  { title: 'Username', field: 'username' },

  { title: 'Phone', field: 'phone' },

  { title: 'Email', field: 'email' },

  {
    title: 'Is Phone Verified?',
    field: 'isPhoneVerified',
    render: (rowData) => (
      <div>{rowData.isPhoneVerified === 'Yes' ? <Chip label="Yes" color="primary" /> : <Chip label={'No'} variant="outlined" />}</div>
    )
  },
  {
    title: 'Is Active?',
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
