import { lazyLoad } from './lazyLoad'

// Authentication
export const Login = lazyLoad(import('@/pages/Login'), 'Login')
export const Register = lazyLoad(import('@/pages/Register'), 'Register')

// Protected
export const Home = lazyLoad(import('@/pages/Home'), 'Home')
export const About = lazyLoad(import('@/pages/About'), 'About')

// Public
export const NotFound = lazyLoad(import('@/pages/NotFound'), 'NotFound')
