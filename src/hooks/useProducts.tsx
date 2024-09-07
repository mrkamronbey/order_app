import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice/dataApiSlice'
import { ProductsType } from '@/types'

export const useProducts = () => {
  const [filteredData, setFilteredData] = useState<ProductsType[]>([])
  const [products, setProducts] = useState<ProductsType[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [request, { isLoading, reset }] = useRequestMutation()

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

  const handleProductAdd = () => {
    setOpen(true)
    reset()
  }

  const handleEditClick = (id: number) => {
    setSelectedProductId(id)
    setOpenEdit(true)
  }

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id)
    setOpenDelete(true)
  }

  const handleProductCreated = () => {
    fetchData()
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

  return {
    filteredData,
    products,
    open,
    openEdit,
    openDelete,
    selectedProductId,
    isLoading,
    handleProductAdd,
    setFilteredData,
    handleEditClick,
    handleDeleteClick,
    handleProductCreated,
    actions,
    setOpen,
    setOpenEdit,
    setOpenDelete,
    setSelectedProductId,
  }
}
