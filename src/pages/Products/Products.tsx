import { Loading, TopHeader } from '@/components'
import { useProducts } from '@/hooks'
import { TableModule } from '@/modules/TableModule'
import { ProductAdd, ProductDelete, ProductEdit } from './ProductActions'
import { additionalColumns, columns } from './productsTableColumns'

export const Products = () => {
  const {
    filteredData,
    products,
    open,
    openEdit,
    openDelete,
    selectedProductId,
    isLoading,
    handleProductAdd,
    setFilteredData,
    handleProductCreated,
    actions,
    setOpen,
    setOpenEdit,
    setOpenDelete,
  } = useProducts()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TopHeader title="Products" onClick={handleProductAdd} btnTitle="Add product" />
      <ProductAdd open={open} setOpen={setOpen} onProductCreated={handleProductCreated} />
      <ProductEdit
        open={openEdit}
        setOpen={setOpenEdit}
        productId={selectedProductId}
        onProductCreated={handleProductCreated}
      />
      <ProductDelete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        productId={selectedProductId}
        onProductCreated={handleProductCreated}
      />
      <TableModule
        data={products}
        filteredData={filteredData}
        onFilterData={setFilteredData}
        columns={columns}
        additionalColumns={additionalColumns}
        isFiltered
        actions={actions}
      />
    </>
  )
}
