// assets
import { TbHelp } from "react-icons/tb";
import { TbHttpConnect } from "react-icons/tb";

const icons = { TbHttpConnect, TbHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.TbHttpConnect,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.TbHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
