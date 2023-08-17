/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './index.css';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button, Divider } from '@mui/material';

const SideNav = ({ showSidebar, closeSidebar, children }) => {
  return (
    <>
      <Modal show={showSidebar} onHide={closeSidebar} dialogClassName="sidebar-modal">
        <Modal.Body>
          <PerfectScrollbar
            component="div"
            style={{
              // height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
              height: 'calc(100vh - 56px)',
              paddingTop: '56px',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >
            <Box display="flex" justifyContent={'end'} mb={1}>
              <Button variant="outlined" color="error" onClick={closeSidebar}>
                Close
              </Button>
            </Box>
            <Divider sx={{mb:"10px"}}/>
            {children}
          </PerfectScrollbar>
          {/* Content for your sidebar */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SideNav;
