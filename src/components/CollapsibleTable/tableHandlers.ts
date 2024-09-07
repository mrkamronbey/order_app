import { Dispatch, SetStateAction } from 'react'

export const handleRequestSort = (
  property: string,
  order: 'asc' | 'desc',
  orderBy: string | null,
  setOrder: Dispatch<SetStateAction<'asc' | 'desc'>>,
  setOrderBy: Dispatch<SetStateAction<string | null>>,
) => {
  const isAsc = orderBy === property && order === 'asc'

  setOrder(isAsc ? 'desc' : 'asc')
  setOrderBy(property)
}

export const handleChangePage = (event: unknown, newPage: number, setPage: Dispatch<SetStateAction<number>>) => {
  setPage(newPage)
}

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setPage: Dispatch<SetStateAction<number>>,
) => {
  setRowsPerPage(+event.target.value)
  setPage(0)
}

export const getSortedData = (data: any[], order: 'asc' | 'desc', orderBy: string | null) => {
  if (orderBy === null) return data

  return [...data].sort((a, b) => {
    if (a[orderBy] === null || a[orderBy] === undefined) return 1
    if (b[orderBy] === null || b[orderBy] === undefined) return -1

    const aValue = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy]
    const bValue = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1

    return 0
  })
}
