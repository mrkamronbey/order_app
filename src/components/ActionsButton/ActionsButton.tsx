import React from 'react'
import { IconButton } from '@mui/material'
import { ActionType } from '@/types'

interface ActionsProps {
  row: any
  actions?: ActionType[]
}

export const ActionsButton: React.FC<ActionsProps> = ({ row, actions }) => (
  <>
    {actions?.map((action, index) => (
      <IconButton
        sx={{ mr: 2 }}
        key={Number(index)}
        color={action.color || 'primary'}
        onClick={() => action.action(row.id)}
      >
        {action.icon}
      </IconButton>
    ))}
  </>
)
