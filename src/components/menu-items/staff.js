// assets
import { TbClipboardTypography } from "react-icons/tb";
import { TbPalette } from "react-icons/tb";
import { TbShadow } from "react-icons/tb";
import { TbWindmill } from "react-icons/tb";

const icons = {
  TbClipboardTypography,
  TbPalette,
  TbShadow,
  TbWindmill
};

// ==============================|| USER MENU ITEMS ||============================== //

const staff = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'couriers',
      title: 'Couriers',
      type: 'item',
      url: '/staff/couriers',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'agents',
      title: 'Agents',
      type: 'item',
      url: '/staff/agents',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'admins',
      title: 'Admins',
      type: 'item',
      url: '/staff/admins',
      icon: icons.IconTypography,
      breadcrumbs: false
    }
  ]
};

export default staff;
