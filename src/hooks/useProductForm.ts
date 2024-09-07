import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { Endpoints } from '@/api'
import { useGetSingleQuery, useRequestMutation } from '@/api/dataApiSlice/dataApiSlice'
import { ProductAddFormValues } from '@/types'

const defaultValues: ProductAddFormValues = {
  name: '',
  dosageForm: '',
  strength: '',
  price: '',
  quantityInStock: '',
  yearofmanufacture: null,
  expiryDate: null,
  description: '',
}

export const useProductForm = (
  productId: number | null,
  setOpen: (open: boolean) => void,
  onProductCrated: () => void,
) => {
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { data: productSingle, refetch } = useGetSingleQuery({ url: Endpoints.Products, id: Number(productId) })
  const [request, { isLoading }] = useRequestMutation()
  const isEdit = productId !== null

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductAddFormValues>({
    defaultValues,
  })

  const handleClose = () => {
    reset(defaultValues)
    setOpen(false)
  }
  const handleEditClose = () => {
    setOpen(false)
  }

  const successMessage = isEdit ? 'Product updated successfully' : 'Product added successfully'

  const onSubmit = async (data: ProductAddFormValues) => {
    const body = {
      name: data.name,
      dosageForm: data.dosageForm,
      strength: data.strength,
      price: data.price,
      quantityInStock: data.quantityInStock,
      yearofmanufacture: data.yearofmanufacture,
      expiryDate: data.expiryDate,
      description: data.description,
    }

    const url = isEdit ? Endpoints.ProductsSingle.replace(':id', String(productId)) : Endpoints.Products
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const response = await request({
        url,
        method,
        body,
      }).unwrap()

      if (response && response?.data) {
        reset()
        setOpen(false)
        setOpenMessage(true)
        setTimeout(() => {
          onProductCrated()
        }, 1500)
      } else {
        setErrorMessage('No data received')
        setOpenMessage(true)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error has occurred')
      }
      setOpenMessage(true)
    }
  }

  useEffect(() => {
    if (isEdit && productSingle) {
      reset({
        name: productSingle[0]?.name ?? '',
        dosageForm: productSingle[0]?.dosageForm ?? '',
        strength: productSingle[0]?.strength ?? '',
        price: productSingle[0]?.price ?? '',
        quantityInStock: productSingle[0]?.quantityInStock ?? '',
        yearofmanufacture: dayjs(productSingle[0]?.yearofmanufacture),
        expiryDate: dayjs(productSingle[0]?.expiryDate),
        description: productSingle[0]?.description ?? '',
      })
    }
  }, [productId, productSingle, reset, refetch])

  return {
    control,
    handleSubmit,
    handleClose,
    handleEditClose,
    onSubmit,
    isLoading,
    openMessage,
    errorMessage,
    successMessage,
    errors,
    setOpenMessage,
  }
}
