/* eslint-disable react/prop-types */
import { Fragment } from 'react';
// import { useState, useEffect } from 'react';
import './index.css'; // Import your CSS file

function UiLoadingOverlay({ children ,loading }) {
//   const [loading, setLoading] = useState(true);

  // Simulate data loading
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Simulated loading time: 2 seconds
//   }, []);

  return (
    <div className="component-overlay">
      {children}
      {loading ? (
        <Fragment>
          <div
            className="overlay">
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}

export default UiLoadingOverlay;
