import React, { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { formatCurrency, formatDate } from '@/services'
import { ActionType } from '@/types'
import { DateFields } from '@/types/enum'
import { ActionsButton } from '../ActionsButton'
import { Column } from './type'

type RowProps = {
  row: any
  columns: Column[]
  additionalColumns?: Column[]
  actions?: ActionType[]
  requiredFields?: Record<string, string[]>
}

export const Row: React.FC<RowProps> = ({ row, columns, additionalColumns, actions, requiredFields }) => {
  const [open, setOpen] = useState(false)
  const additionalDataKeys = additionalColumns
    ? Object.keys(row).filter(
        (key) =>
          !columns.some((column) => column.field === key) && additionalColumns.some((column) => column.field === key),
      )
    : []

  const renderValue = (value: any, field: string) => {
    if (value === undefined || value === null) {
      return
    }
    if (field === 'price' || field === 'totalPrice') {
      return formatCurrency(value)
    }

    const specificFields = requiredFields?.[field] || Object.keys(value[0] || {})

    if (Object.values(DateFields).includes(field as DateFields)) {
      const date = new Date(value)

      if (!isNaN(date.getTime())) {
        return formatDate(date)
      }

      return 'Invalid Date'
    }

    if (Array.isArray(value)) {
      return (
        <Table size="small" aria-label="nested-array">
          <TableHead sx={{ background: 'var(--green)' }}>
            <TableRow>
              {specificFields.map((subKey) => (
                <TableCell sx={{ textTransform: 'uppercase' }} key={subKey}>
                  {subKey}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((item, index) => (
              <TableRow key={index}>
                {specificFields.map((subKey) => (
                  <TableCell sx={{ color: 'var(--text)' }} key={subKey}>
                    {item[subKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    } else if (typeof value === 'object' && value !== null) {
      return (
        <Table size="small" aria-label="nested-object">
          <TableBody>
            {Object.keys(value).map((subKey) => (
              <TableRow key={subKey}>
                <TableCell sx={{ color: 'var(--text)', textTransform: 'uppercase' }}>{subKey}</TableCell>
                <TableCell sx={{ color: 'var(--text)' }}>{renderValue(value[subKey], subKey)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    } else {
      return value
    }
  }

  return (
    <>
      <TableRow>
        <TableCell>
          {additionalDataKeys.length > 0 && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </TableCell>
        {columns.map((column) => (
          <TableCell sx={{ color: 'var(--text)' }} key={column.field} align={column.align || 'left'}>
            {renderValue(row[column.field], column.field)}
            {column.field === 'actions' && <ActionsButton row={row} actions={actions} />}
          </TableCell>
        ))}
      </TableRow>

      {additionalDataKeys.length > 0 && (
        <TableRow>
          <TableCell colSpan={columns.length + 1} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {additionalDataKeys.map((key) => (
                  <Box key={key}>{renderValue(row[key], key)}</Box>
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
