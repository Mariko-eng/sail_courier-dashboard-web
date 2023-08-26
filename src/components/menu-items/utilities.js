// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'shopping',
      title: 'Shopping',
      type: 'collapse',
      icon: icons.IconShoppingCart,
      children: [
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/shopping/categories',
          target: false
        },
        {
          id: 'items',
          title: 'Items',
          type: 'item',
          url: '/shopping/items',
          target: false
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/shopping/orders',
          target: false
        },
        {
          id: 'subscriptions',
          title: 'Subscriptions',
          type: 'item',
          url: '/shopping/subscriptions',
          target: false
        }
      ]
    },
    {
      id: 'laundry',
      title: 'Laundry',
      type: 'collapse',
      icon: icons.IconShoppingCart,
      children: [
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/laundry/categories',
          target: false
        },
        {
          id: 'items',
          title: 'Items',
          type: 'item',
          url: '/laundry/items',
          target: false
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/laundry/orders',
          target: false
        }
      ]
    }

    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/utils/util-typography',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/utils/util-color',
    //   icon: icons.IconPalette,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default utilities;
