/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './index.css';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

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
            {children}
          </PerfectScrollbar>
          {/* Content for your sidebar */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SideNav;
