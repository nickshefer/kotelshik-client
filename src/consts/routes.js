import { AdminPage } from '../pages/AdminPage';
import AuthPage from '../pages/AuthPage';
import { CartPage } from '../pages/CartPage';
import { ContactsPage } from '../pages/ContactsPage';
import { HomePage } from '../pages/HomePage';
import { OrderPage } from '../pages/OrderPage';
import OrdersPage from '../pages/OrdersPage';
import { PlacingOrderPage } from '../pages/PlacingOrderPage';
import { ProductPage } from '../pages/ProductPage';
import { ServicesPage } from '../pages/ServicesPage';

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/contacts',
    element: <ContactsPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/:slug',
    element: <ProductPage />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/registration',
    element: <AuthPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/placing',
    element: <PlacingOrderPage />,
  },
];

export const authRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/orders/:id',
    element: <OrderPage />,
  },
];
