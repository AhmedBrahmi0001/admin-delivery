import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
// Customer components
const CustomerPage = Loadable(lazy(() => import('pages/customer/CustomerPage')));
const OrderPage = Loadable(lazy(() => import('pages/order/OrderPage')));
const DriverPage = Loadable(lazy(() => import('pages/driver/DriverPage')));
const ReviewPage = Loadable(lazy(() => import('pages/review/ReviewPage')));
const ComplaintPage = Loadable(lazy(() => import('pages/complaint/ComplaintPage')));
const PlacePage = Loadable(lazy(() => import('pages/place/PlacePage')));
const NotificationPage = Loadable(lazy(() => import('pages/notification/NotificationPage')));

const OrderDetails = Loadable(lazy(() => import('pages/order/OrderDetails')));
const CustomerDetails = Loadable(lazy(() => import('pages/customer/CustomerDetails')));
const DriverDetails = Loadable(lazy(() => import('pages/driver/DriverDetails')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }, // Customer routes
    {
      path: 'customer',
      children: [
        {
          path: 'list',
          element: <CustomerPage />
        },
        {
          path: 'details/:id',
          element: <CustomerDetails />
        }
      ]
    },
    {
      path: 'order',
      children: [
        {
          path: 'list',
          element: <OrderPage />
        },
        {
          path: 'details/:id',
          element: <OrderDetails />
        }
      ]
    },
    {
      path: 'driver',
      children: [
        {
          path: 'list',
          element: <DriverPage />
        },
        {
          path: 'details/:id',
          element: <DriverDetails />
        }
      ]
    },
    {
      path: 'review',
      children: [
        {
          path: 'list',
          element: <ReviewPage />
        }
      ]
    },
    {
      path: 'complaint',
      children: [
        {
          path: 'list',
          element: <ComplaintPage />
        }
      ]
    },
    {
      path: 'place',
      children: [
        {
          path: 'list',
          element: <PlacePage />
        }
      ]
    },
    {
      path: 'notification',
      children: [
        {
          path: 'list',
          element: <NotificationPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
