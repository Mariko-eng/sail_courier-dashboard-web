// assets
import { IconKey, IconTruckDelivery, IconShoppingCart } from '@tabler/icons';


// constant
const icons = {
  IconKey,
  IconTruckDelivery,
  IconShoppingCart
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Orders',
      type: 'collapse',
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: 'regular',
          title: 'Regular',
          type: 'item',
          url: '/orders/regular',
          target: false
        },
        {
          id: 'laundry',
          title: 'Laundry',
          type: 'item',
          url: '/orders/laundry',
          target: false
        }
      ]
    },
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
          id: 'subscriptions',
          title: 'Subscriptions',
          type: 'item',
          url: '/shopping/subscriptions',
          target: false
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          url: '/shopping/orders',
          target: false
        }
      ]
    },
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
    }
  ]
};

export default pages;
