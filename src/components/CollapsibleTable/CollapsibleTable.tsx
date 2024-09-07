import React, { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Loading } from '../Loading'
import { Row } from './CollapsibleTableRow'
import { getSortedData, handleChangePage, handleChangeRowsPerPage, handleRequestSort } from './tableHandlers'
import { CollapsibleTableProps } from './type'

export const CollapsibleTable: React.FC<CollapsibleTableProps> = ({
  data,
  columns,
  additionalColumns,
  isLoading,
  actions,
  requiredFields,
}) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<string | null>(null)

  const sortedData = React.useMemo(() => getSortedData(data, order, orderBy), [data, order, orderBy])

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align || 'left'}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={() => handleRequestSort(column.field, order, orderBy, setOrder, setOrderBy)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                    <Loading />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography color="var(--text)" py={1}>
                    🌟 Oops! 🌟
                    <br />
                    Looks like we couldn’t find any matching results.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    columns={columns}
                    additionalColumns={additionalColumns}
                    actions={actions}
                    requiredFields={requiredFields}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
      />
    </>
  )
}

export default CollapsibleTable
