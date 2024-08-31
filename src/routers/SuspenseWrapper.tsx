import { Suspense } from 'react'
import { Loading } from '@/components'
import { SuspenseWrapperProps } from './types'

export const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
)
