
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FormControl } from 'react-bootstrap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FormModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={handleOpen}>Form modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h3' mb={"20px"} >New Order</Typography>
                    <InputLabel style={{ width: "100%", marginBottom: "5px" }}>Where are you delivering from?</InputLabel>
                    <Select style={{ width: "100%" }} placeholder='Select pickup point'>
                        <MenuItem>...</MenuItem>
                        <MenuItem>Ware House 1</MenuItem>
                        <MenuItem>Ware House 2</MenuItem>
                        <MenuItem>Ware House 3</MenuItem>
                    </Select>

                    <Button variant='contained' style={{marginTop : "20px"}}>Create</Button>
                </Box>
            </Modal>
        </>
    )
}

export default FormModal