import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import classNames from 'classnames/bind'

import style from './CenterBlock.module.scss'

const cn = classNames.bind(style)

export const CenterBlock = ({ children }: PropsWithChildren) => <Box className={cn('center-block')}>{children}</Box>
