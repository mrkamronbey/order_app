import { ActionType } from '@/types'

export type Column = {
  field: string
  headerName: string
  align?: 'left' | 'right'
  sortable?: boolean
}

export type CollapsibleTableProps = {
  data: any[]
  columns: Column[]
  additionalColumns?: Column[]
  isLoading?: boolean
  actions?: ActionType[]
  requiredFields?: Record<string, string[]>
}
