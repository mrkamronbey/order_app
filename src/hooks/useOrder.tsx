import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Dayjs } from 'dayjs'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice'

type Product = {
  id: number
  name: string
  price: string
  yearofmanufacture: Dayjs | null
  expiryDate: Dayjs | null
  quantity: number
}

export const useOrder = () => {
  const [filteredData, setFilteredData] = useState<Product[]>([])
  const [data, setData] = useState<Product[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  const [request, { isLoading, reset }] = useRequestMutation()

  const handleOrderAdd = () => {
    setOpen(true)
    reset()
  }

  const fetchData = async () => {
    try {
      const response = await request({ url: Endpoints.Orders, method: 'GET' }).unwrap()

      setFilteredData(response)
      setData(response)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEditClick = (id: number) => {
    setSelectedOrderId(id)
    setOpenEdit(true)
  }

  const handleDeleteClick = (id: number) => {
    setSelectedOrderId(id)
    setOpenDelete(true)
  }

  const handleOrderCreated = () => {
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
    data,
    open,
    openEdit,
    openDelete,
    selectedOrderId,
    isLoading,
    handleOrderAdd,
    handleEditClick,
    handleDeleteClick,
    handleOrderCreated,
    actions,
    setOpen,
    setOpenEdit,
    setOpenDelete,
    setSelectedOrderId,
    setFilteredData,
  }
}
