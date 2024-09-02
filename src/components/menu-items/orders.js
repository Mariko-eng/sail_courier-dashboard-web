// assets
import { TbFavicon } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { TbBabyCarriage } from "react-icons/tb";

const icons = {
  TbFavicon,
  TbShoppingCart,
  TbBabyCarriage
};

// ==============================|| EXTRA ORDERS MENU ITEMS ||============================== //

const orders = {
  id: 'orders',
  title: 'Orders',
  caption: 'Regular/Laundry/Shopping',
  type: 'group',
  children: [
    {
      id: 'regular',
      title: 'Regular',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'regular_list',
          title: 'List',
          type: 'item',
          url: '/orders/regular',
          target: false
        },
        {
          id: 'regular_add',
          title: 'Add',
          type: 'item',
          url: '/orders/regular/new',
          target: false
        }
      ]
    },
    {
      id: 'Laundry',
      title: 'Laundry',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'Laundry_list',
          title: 'List',
          type: 'item',
          url: '/orders/laundry',
          target: false
        },
        // {
        //   id: 'Laundry_add',
        //   title: 'Add',
        //   type: 'item',
        //   url: '/orders/laundry/new',
        //   target: false
        // }
      ]
    },
    {
      id: 'Shopping',
      title: 'Shopping',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'Shopping_list',
          title: 'List',
          type: 'item',
          url: '/orders/shopping',
          target: false
        },
        // {
        //   id: 'Shopping_add',
        //   title: 'Add',
        //   type: 'item',
        //   url: '/orders/shopping/new',
        //   target: false
        // }
      ]
    }
  ]
};

export default orders;
