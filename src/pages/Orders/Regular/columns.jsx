import { Chip } from "@mui/material";
import { capitalize, prettyDate } from '../../../utils/app-functions';

export const columns = [
  {
    title: '#',
    field: 'orderNo',
    cellStyle: {
      backgroundColor: '#039be5',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#039be5'
    }
  },
  { title: 'Tracker ID', field: 'orderTrackerNo' },
  {
    title: 'Date',
    field: 'createdAt',
    render: (rowData) => <div>{prettyDate(rowData.createdAt)}</div>
  },
  //   { title: 'From', field: 'pickName' },
  //   { title: 'To', field: 'dropName' },
  {
    title: 'Status',
    field: 'status',
    render: (rowData) => (
      <div>
        {rowData.status === 'pending' ? <Chip label="Pending" color="primary" /> : <Chip label={rowData.status} variant="outlined" />}
      </div>
    )
  },
  {
    title: 'Sender Name',
    field: 'parcelSenderName',
    render: (rowData) => <div>{capitalize(rowData.parcelSenderName)}</div>
  },
  { title: 'Sender Phone', field: 'parcelSenderPhone' },
  //   { title: 'Receiver Name', field: 'parcelReceiverName' },
  //   { title: 'Receiver Phone', field: 'parcelReceiverPhone' },

  //   { title: 'Sender OTP', field: 'senderOtpCode' },
  //   { title: 'Receiver OTP', field: 'receiverOtpCode' },
  { title: 'Client Type', field: 'clientAccountType', render: (rowData) => <div>{capitalize(rowData.clientAccountType)}</div> },

  {
    title: 'Charges',
    field: 'totalCharges',
    type: 'numeric'
    // render: (rowData) => <div>{formatNumberWithCommas(rowData.totalCharges)}</div>
  }

  //   { title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
];