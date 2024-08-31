import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import classNames from 'classnames/bind'

import style from './Protected.module.scss'

const cn = classNames.bind(style)

export const ProtectedLayout = ({ children }: PropsWithChildren) => (
  <Box component="main" className={cn('protected-layout')}>
    {children}
  </Box>
)
