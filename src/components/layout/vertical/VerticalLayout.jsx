// import React from 'react'
import MainLayout from "../../../layout/MainLayout";
// import Navbar from "../../Navbar";
// import NavbarIcons from "../../NavbarIcons";
// import "./verticalLayout.css";
// import { Outlet } from "react-router-dom";

const VerticalLayout = () => {
  return (
    <MainLayout />
  )
  // return (
  //   <div>
  //     <NavbarIcons/>
  //     <Navbar/>

  //     <div className="container-fluid">
  //       <div className="row">
  //         <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
  //           <div
  //             className="offcanvas-lg offcanvas-end bg-body-tertiary"
  //             tabIndex={-1}
  //             id="sidebarMenu"
  //             aria-labelledby="sidebarMenuLabel"
  //           >
  //             <div className="offcanvas-header">
  //               <h5 className="offcanvas-title" id="sidebarMenuLabel">
  //                 Company name
  //               </h5>
  //               <button
  //                 type="button"
  //                 className="btn-close"
  //                 data-bs-dismiss="offcanvas"
  //                 data-bs-target="#sidebarMenu"
  //                 aria-label="Close"
  //               />
  //             </div>
  //             <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
  //               <ul className="nav flex-column">
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2 active"
  //                     aria-current="page"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#house-fill" />
  //                     </svg>
  //                     Dashboard
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#file-earmark" />
  //                     </svg>
  //                     Orders
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#cart" />
  //                     </svg>
  //                     Products
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#people" />
  //                     </svg>
  //                     Customers
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#graph-up" />
  //                     </svg>
  //                     Reports
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#puzzle" />
  //                     </svg>
  //                     Integrations
  //                   </a>
  //                 </li>
  //               </ul>
  //               <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
  //                 <span>Saved reports</span>
  //                 <a
  //                   className="link-secondary"
  //                   href="#"
  //                   aria-label="Add a new report"
  //                 >
  //                   <svg className="bi">
  //                     <use xlinkHref="#plus-circle" />
  //                   </svg>
  //                 </a>
  //               </h6>
  //               <ul className="nav flex-column mb-auto">
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#file-earmark-text" />
  //                     </svg>
  //                     Current month
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#file-earmark-text" />
  //                     </svg>
  //                     Last quarter
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#file-earmark-text" />
  //                     </svg>
  //                     Social engagement
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#file-earmark-text" />
  //                     </svg>
  //                     Year-end sale
  //                   </a>
  //                 </li>
  //               </ul>
  //               <hr className="my-3" />
  //               <ul className="nav flex-column mb-auto">
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#gear-wide-connected" />
  //                     </svg>
  //                     Settings
  //                   </a>
  //                 </li>
  //                 <li className="nav-item">
  //                   <a
  //                     className="nav-link d-flex align-items-center gap-2"
  //                     href="#"
  //                   >
  //                     <svg className="bi">
  //                       <use xlinkHref="#door-closed" />
  //                     </svg>
  //                     Sign out
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
  //           <Outlet />
  //         </main>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default VerticalLayout