import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import classNames from 'classnames/bind'

import style from './PublicLayout.module.scss'

const cn = classNames.bind(style)

export const PublicLayout = ({ children }: PropsWithChildren) => (
  <Box component="main" className={cn('public-layout')}>
    {children}
  </Box>
)
