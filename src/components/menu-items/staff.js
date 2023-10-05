// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
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
