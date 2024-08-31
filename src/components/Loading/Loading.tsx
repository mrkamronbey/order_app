import { Box, CircularProgress } from '@mui/material'
import classNames from 'classnames/bind'

import style from './Loading.module.scss'

const cn = classNames.bind(style)

export const Loading = () => (
  <Box className={cn('loading')}>
    <CircularProgress color="primary" />
  </Box>
)
