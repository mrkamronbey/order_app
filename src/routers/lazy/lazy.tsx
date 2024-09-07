import { lazyLoad } from './lazyLoad'

// Authentication
export const Login = lazyLoad(import('@/pages/Login'), 'Login')

// Protected
export const Dashboard = lazyLoad(import('@/pages/Dashboard'), 'Dashboard')
export const Order = lazyLoad(import('@/pages/Order'), 'Order')
export const Products = lazyLoad(import('@/pages/Products'), 'Products')

// Public
export const NotFound = lazyLoad(import('@/pages/NotFound'), 'NotFound')
