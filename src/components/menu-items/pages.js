// assets
import { IconKey, IconTruckDelivery } from '@tabler/icons';


// constant
const icons = {
  IconKey,
  IconTruckDelivery
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
        },
        {
          id: 'shopping',
          title: 'Shopping',
          type: 'item',
          url: '/orders/shopping',
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
