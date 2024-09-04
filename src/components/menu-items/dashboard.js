// assets
import { MdDashboard } from "react-icons/md";

const icons = { MdDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/home',
      icon: icons.MdDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
