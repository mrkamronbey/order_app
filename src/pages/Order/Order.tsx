import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Dayjs } from 'dayjs'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice'
import { Loading, TopHeader } from '@/components'
import { TableModule } from '@/modules/TableModule'
import { OrderAdd, OrderEdit } from './OrderActions'
import { OrderDelete } from './OrderActions/OrderDelete'
import { additionalColumns, columns, fieldSpecificRequiredFields } from './ordersColumns'

type Product = {
  id: number
  name: string
  price: string
  yearofmanufacture: Dayjs | null
  expiryDate: Dayjs | null
  quantity: number
}

export const Order = () => {
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

  const handleOrderCreated = () => {
    fetchData()
  }

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
