import { useRoutes } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { About, Home, Login, NotFound, Register } from './lazy'
import { ProtectedRoutes, PublicRoutes } from './routes'
import { SuspenseWrapper } from './SuspenseWrapper'
import { RoutesAuthProps } from './types'

export const Router = ({ isAuth }: RoutesAuthProps) =>
  useRoutes([
    {
      element: <PublicRoutes isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.login,
          element: (
            <SuspenseWrapper>
              <Login />
            </SuspenseWrapper>
          ),
        },
        {
          path: ROUTES.register,
          element: (
            <SuspenseWrapper>
              <Register />
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
              <Home />
            </SuspenseWrapper>
          ),
        },
        {
          path: ROUTES.about,
          element: (
            <SuspenseWrapper>
              <About />
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
