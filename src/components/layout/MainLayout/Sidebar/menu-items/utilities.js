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
  ]
};

export default utilities;
