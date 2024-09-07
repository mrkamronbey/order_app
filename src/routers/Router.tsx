import { useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ROUTES } from '@/constants'
import { Dashboard, Login, NotFound, Order, Products } from './lazy'
import { ProtectedRoutes, PublicRoutes } from './routes'
import { SuspenseWrapper } from './SuspenseWrapper'

export const Router = () => {
  const token = Cookies.get('authToken')

  const isAuth = useMemo(() => !!token, [token])

  return useRoutes([
    {
      element: <PublicRoutes isAuth={!isAuth} />,
      children: [
        {
          path: ROUTES.login,
          element: (
            <SuspenseWrapper>
              <Login />
            </SuspenseWrapper>
          ),
        },
      ],
    },
    {
      element: <ProtectedRoutes isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.home,
          element: (
            <SuspenseWrapper>
              <Dashboard />
            </SuspenseWrapper>
          ),
        },
        {
          path: ROUTES.orders,
          element: (
            <SuspenseWrapper>
              <Order />
            </SuspenseWrapper>
          ),
        },
        {
          path: ROUTES.products,
          element: (
            <SuspenseWrapper>
              <Products />
            </SuspenseWrapper>
          ),
        },
      ],
    },
    {
      path: ROUTES.notFound,
      element: (
        <SuspenseWrapper>
          <NotFound />
        </SuspenseWrapper>
      ),
    },
  ])
}
