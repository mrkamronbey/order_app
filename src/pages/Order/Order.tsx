import { Loading, TopHeader } from '@/components'
import { useOrder } from '@/hooks'
import { TableModule } from '@/modules/TableModule'
import { OrderAdd, OrderEdit } from './OrderActions'
import { OrderDelete } from './OrderActions/OrderDelete'
import { additionalColumns, columns, fieldSpecificRequiredFields } from './ordersColumns'

export const Order = () => {
  const {
    filteredData,
    data,
    open,
    openEdit,
    openDelete,
    selectedOrderId,
    isLoading,
    handleOrderAdd,
    setFilteredData,
    handleOrderCreated,
    actions,
    setOpen,
    setOpenEdit,
    setOpenDelete,
  } = useOrder()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TopHeader title="Order" onClick={handleOrderAdd} btnTitle="Add order" />
      <OrderAdd open={open} setOpen={setOpen} onOrderCreated={handleOrderCreated} />
      <OrderDelete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        orderId={selectedOrderId}
        onOrderCreated={handleOrderCreated}
      />
      <OrderEdit open={openEdit} setOpen={setOpenEdit} onOrderCreated={handleOrderCreated} orderId={selectedOrderId} />
      <TableModule
        data={data}
        onFilterData={setFilteredData}
        columns={columns}
        filteredData={filteredData}
        additionalColumns={additionalColumns}
        isFiltered
        isOrder
        actions={actions}
        requiredFields={fieldSpecificRequiredFields}
      />
    </>
  )
}
