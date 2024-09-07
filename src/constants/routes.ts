import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const PUBLIC_ROUTES = {
  login: '/login',
  register: '/register',
  notFound: '*',
}

const PROTECTED_ROUTES = {
  home: '/',
  orders: '/orders',
  products: '/products',
}

export const ROUTES = {
  ...PROTECTED_ROUTES,
  ...PUBLIC_ROUTES,
}

export const ROUTES_DATA = [
  {
    path: ROUTES.home,
    name: 'Dashboard',
    icons: DashboardIcon,
  },
  {
    path: ROUTES.products,
    name: 'Products',
    icons: ShoppingCartIcon,
  },
  {
    path: ROUTES.orders,
    name: 'Orders',
    icons: ListAltIcon,
  },
]
