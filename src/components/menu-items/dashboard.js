// assets
import { TbDatabase } from "react-icons/tb";

const icons = { TbDatabase };

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
      icon: icons.TbDatabase,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
