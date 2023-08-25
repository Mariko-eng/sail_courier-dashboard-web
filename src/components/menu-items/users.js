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

const users = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'clients',
      title: 'Clients',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'regular',
          title: 'Regular',
          type: 'item',
          url: '/clients/regular',
          target: false
        },
        {
          id: 'corporate',
          title: 'Corporate',
          type: 'item',
          url: '/clients/corporate',
          target: false
        }
      ]
    },
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

export default users;
