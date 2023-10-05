import { Chip } from '@mui/material';
import { capitalize, prettyDate } from '../../../../utils/app-functions';

export const columns = [

  { title: 'Company Name', field: 'companyName', render: (rowData) => <div>{capitalize(rowData.companyName)}</div> },

  { title: 'Company Email', field: 'companyEmail' },

  { title: 'Company Telephone', field: 'companyTele' },

  { title: 'Company Addresss', field: 'companyAddress', render: (rowData) => <div>{capitalize(rowData.companyAddress)}</div> },

  { title: 'Contact Person Name', field: 'contactPersonName', render: (rowData) => <div>{capitalize(rowData.contactPersonName)}</div> },

  { title: 'Contact Person Email', field: 'contactPersonEmail' },

  { title: 'Contact Person Phone', field: 'contactPersonPhone' },

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
