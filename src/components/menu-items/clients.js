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

const clients = {
  id: 'clients',
  title: 'Client Accounts',
  type: 'group',
  children: [
    {
      id: 'personal',
      title: 'Personal',
      type: 'item',
      url: '/clients/personal',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'corporate',
      title: 'Corporate',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'accounts',
          title: 'Accounts',
          type: 'item',
          url: '/clients/corporate',
          target: false
        },
        {
          id: 'companies',
          title: 'Companies',
          type: 'item',
          url: '/clients/corporate/companies',
          target: false
        }
      ]
    }
  ]
};

export default clients;
