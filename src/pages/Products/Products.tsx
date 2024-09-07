import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice/dataApiSlice'
import { Loading, TopHeader } from '@/components'
import { TableModule } from '@/modules/TableModule'
import { ProductsType } from '@/types'
import { ProductAdd, ProductDelete, ProductEdit } from './ProductActions'
import { additionalColumns, columns } from './productsTableColumns'

export const Products = () => {
  const [filteredData, setFilteredData] = useState<ProductsType[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductsType[]>([])
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [request, { isLoading }] = useRequestMutation()

  const handleProductAdd = () => {
    setOpen(true)
  }

  const fetchData = async () => {
    try {
      const result = await request({ url: Endpoints.Products, method: 'GET' }).unwrap()

      setProducts(result)
      setFilteredData(result)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEditClick = (id: number) => {
    setSelectedProductId(id)
    setOpenEdit(true)
  }

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id)
    setOpenDelete(true)
  }

  const actions = [
    {
      label: 'Edit',
      icon: <EditIcon />,
      action: (id: number) => handleEditClick(id),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      color: 'error',
      action: (id: number) => handleDeleteClick(id),
    },
  ]

  if (isLoading) {
    return <Loading />
  }
  const handleProductCreated = () => {
    fetchData()
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
