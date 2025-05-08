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
  title: 'Clients',
  type: 'group',
  children: [

    {
      id: 'personal',
      title: 'Individual',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'personal_list',
          title: 'List',
          type: 'item',
          url: '/clients/personal',
          target: false
        },
      ]
    },

    {
      id: 'corporate',
      title: 'Corporate',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'Companies_list',
          title: 'Companies',
          type: 'item',
          url: '/clients/corporate/companies',
          target: false
        },
        {
          id: 'user_accounts_list',
          title: 'User Accounts',
          type: 'item',
          url: '/clients/corporate',
          target: false
        },
      ]
    },




    // {
    //   id: 'personal',
    //   title: 'Individual',
    //   type: 'item',
    //   url: '/clients/personal',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'corporate',
    //   title: 'Corporate Accounts',
    //   type: 'item',
    //   url: '/clients/corporate',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'companies',
    //   title: 'Corporate',
    //   type: 'item',
    //   url: '/clients/corporate/companies',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },

    // {
    //   id: 'corporate',
    //   title: 'Corporate',
    //   type: 'collapse',
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: 'accounts',
    //       title: 'Accounts',
    //       type: 'item',
    //       url: '/clients/corporate',
    //       target: false
    //     },
    //     {
    //       id: 'companies',
    //       title: 'Companies',
    //       type: 'item',
    //       url: '/clients/corporate/companies',
    //       target: false
    //     }
    //   ]
    // }
  ]
};

export default clients;
