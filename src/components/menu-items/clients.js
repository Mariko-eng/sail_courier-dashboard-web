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
