import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { ProtectedLayout } from '@/layouts'
import { RoutesAuthProps } from '../types'

export const ProtectedRoutes = ({ isAuth }: RoutesAuthProps) => {
  if (!isAuth) {
    return <Navigate to={ROUTES.login} replace />
  }

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  )
}
