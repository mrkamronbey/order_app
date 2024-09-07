import { CollapsibleTable } from '@/components'
import { Column } from '@/components/CollapsibleTable/type'
import { FilterComponent } from '@/components/FilterComponent'
import { ActionType } from '@/types'

interface TableModuleProps {
  data: any[]
  filteredData: any[]
  columns: Column[]
  onFilterData: (filteredData: any[]) => void
  additionalColumns?: Column[]
  isFiltered?: boolean
  isOrder?: boolean
  actions?: ActionType[]
  requiredFields?: Record<string, string[]>
}

export const TableModule: React.FC<TableModuleProps> = ({
  data,
  onFilterData,
  filteredData,
  columns,
  additionalColumns,
  isFiltered,
  isOrder,
  actions,
  requiredFields,
}) => (
  <>
    {isFiltered && <FilterComponent data={data} onFilterData={onFilterData} isOrder={isOrder} />}
    <CollapsibleTable
      data={filteredData}
      columns={columns}
      additionalColumns={additionalColumns}
      actions={actions}
      requiredFields={requiredFields}
    />
  </>
)
