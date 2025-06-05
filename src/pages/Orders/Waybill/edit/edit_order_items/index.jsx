import { Box, Paper } from '@mui/material';

import EditWaybillOrderItemsCsvFormModal from './multiple_items_csv_form';
import EditWaybillOrderItemsFormModal from './single_item_form';


const WaybillOrderItemsEditForm = ({ orderDetails, onRefresh }) => {
    return (
        <Box my={3}>
            <Paper sx={{ padding: "10px", marginBottom: "10px" }}>
                <Box display={"flex"} justifyContent="space-between">
                    <h3>Delivery Items</h3>

                    <Box display={"flex"}>
                        <EditWaybillOrderItemsCsvFormModal orderDetails={orderDetails} onRefresh={onRefresh}/>
                        
                        <Box sx={{width: "10px"}}/>

                        <EditWaybillOrderItemsFormModal orderDetails={orderDetails} onRefresh={onRefresh} />
                    </Box>
                </Box>

                {orderDetails?.waybillorderitem_set?.length < 1 && (
                    <Box mt={2}>
                        <hr/>
                        <p>No Items Found!</p>
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default WaybillOrderItemsEditForm;