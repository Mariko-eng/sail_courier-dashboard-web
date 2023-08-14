// import React from 'react'
import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import "./firebase/config";

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from './App';
import store from './store';

// style + assets
import './assets/scss/style.scss';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <App />
        <Toaster
          position= 'top-right'
          toastOptions={{ className: "react-hot-toast" }}
        />
      </Provider>
    </Suspense>
  </BrowserRouter>
);
