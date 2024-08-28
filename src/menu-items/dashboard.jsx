// assets
import {
  CreditCardOutlined,
  BellOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';

// icons
const icons = {
  CreditCardOutlined,
  BellOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileSearchOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },

    {
      id: 'customer-list',
      title: 'Client List',
      type: 'item',
      url: '/customer/list',
      icon: icons.UserOutlined
    },
    {
      id: 'order-list',
      title: 'Order List',
      type: 'item',
      url: '/order/list',
      icon: icons.ShoppingCartOutlined
    },

    {
      id: 'driver-list',
      title: 'Driver List',
      type: 'item',
      url: '/driver/list',
      icon: icons.UserOutlined
    },
    {
      id: 'complaints-list',
      title: 'Complaints List',
      type: 'item',
      url: '/complaint/list',
      icon: icons.FileTextOutlined
    },
    {
      id: 'review-list',
      title: 'Review List',
      type: 'item',
      url: '/review/list',
      icon: StarRateOutlinedIcon
    },
    {
      id: 'places-list',
      title: 'Places List',
      type: 'item',
      url: '/place/list',
      icon: icons.EnvironmentOutlined
    },
    {
      id: 'notification-list',
      title: 'Notification List',
      type: 'item',
      url: '/notification/list',
      icon: icons.BellOutlined
    }
  ]
};

export default dashboard;
