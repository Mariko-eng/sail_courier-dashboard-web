import { Button } from "@mui/material";

const DownloadQuickSendOrderPdfButton = ({ orderId }) => {
  let backendUrl = import.meta.env.VITE_BACKEND_DEV_URL;

  if (import.meta.env.VITE_ENV === "STAGING") {
    backendUrl = import.meta.env.VITE_BACKEND_STAGING_URL;
  } else if (import.meta.env.VITE_ENV === "PROD") {
    backendUrl = import.meta.env.VITE_BACKEND_PROD_URL;
  }

  const link = `${backendUrl}/api/main/orders-quicksend/detail/${orderId}/pdf-download/`;

  return (
    <div>
      <Button variant="outlined" color="primary" href={link} target="_blank" >Download PDF</Button>
    </div>
  );
};

export default DownloadQuickSendOrderPdfButton;