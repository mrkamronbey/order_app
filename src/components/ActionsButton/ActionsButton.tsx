import React from 'react'
import { IconButton, IconButtonProps } from '@mui/material'
import { ActionType } from '@/types'

type ActionColor = IconButtonProps['color'] | undefined

interface ActionsProps {
  row: any
  actions?: ActionType[]
}

export const ActionsButton: React.FC<ActionsProps> = ({ row, actions }) => (
  <>
    {actions?.map((action, index) => (
      <IconButton
        sx={{ mr: 2 }}
        key={index}
        color={(action.color as ActionColor) || 'primary'}
        onClick={() => action.action(row.id)}
      >
        {action.icon}
      </IconButton>
    ))}
  </>
)
