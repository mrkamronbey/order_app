import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { PublicLayout } from '@/layouts'
import { RoutesAuthProps } from '../types'

export const PublicRoutes = ({ isAuth }: RoutesAuthProps) => {
  if (!isAuth) {
    return <Navigate to={ROUTES.home} replace />
  }

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}
