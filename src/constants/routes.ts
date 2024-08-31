const PUBLIC_ROUTES = {
  login: '/login',
  register: '/register',
  notFound: '*',
}

const PROTECTED_ROUTES = {
  home: '/',
  about: '/about',
}

export const ROUTES = {
  ...PROTECTED_ROUTES,
  ...PUBLIC_ROUTES,
}
