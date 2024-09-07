import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { Endpoints } from '@/api'
import { useGetSingleQuery, useRequestMutation } from '@/api/dataApiSlice'
import { ProductsType } from '@/types'
import { OrderStatus } from '@/types/enum'

type OrderFormValues = {
  customerName: string
  pharmacyName: string
  status: OrderStatus
  totalPrice: number
  products: ProductsType[]
}

const defaultValues: OrderFormValues = {
  customerName: '',
  pharmacyName: '',
  status: OrderStatus.Pending,
  totalPrice: 0,
  products: [],
}

export const useOrderForm = (orderId: number | null, onOrderCreated: () => void, setOpen: (open: boolean) => void) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductsType[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [request, { isLoading }] = useRequestMutation()

  const { control, handleSubmit, register, setValue, reset, watch } = useForm<OrderFormValues>({ defaultValues })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  })

  const fetchData = async () => {
    try {
      const result = await request({ url: Endpoints.Products, method: 'GET' }).unwrap()

      setProducts(result)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }

  const { data: orderSingle, refetch } = useGetSingleQuery({ url: Endpoints.Orders, id: Number(orderId) })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (orderId) {
      refetch()
    }
  }, [orderId, refetch])

  useEffect(() => {
    if (orderSingle && orderSingle.length > 0) {
      const products =
        orderSingle[0]?.products?.map((product: any) => ({
          id: product?.id || '',
          name: product?.name || '',
          price: product?.price || 0,
          quantity: product?.quantity || 0,
          strength: product?.strength || '',
          updateAt: product?.updateAt || '',
          createdAt: product?.createdAt || '',
          dosageForm: product?.dosageForm || '',
          expiryDate: product?.expiryDate || '',
          description: product?.description || '',
          quantityInStock: product?.quantityInStock || 0,
          yearofmanufacture: product?.yearofmanufacture || '',
        })) || []

      reset({
        customerName: orderSingle[0]?.customerName || '',
        pharmacyName: orderSingle[0]?.pharmacyName || '',
        status: orderSingle[0]?.status || OrderStatus.Pending,
        totalPrice: orderSingle[0]?.totalPrice ? Number(orderSingle[0].totalPrice) : 0,
        products,
      })
    } else if (!orderId) {
      reset(defaultValues)
    }
  }, [orderId, orderSingle, reset])

  const handleProductChange = (index: number, productId: number) => {
    const selectedProduct = products.find((product) => product.id === productId)

    if (selectedProduct) {
      const newProductPrice = Number(selectedProduct.price) * (selectedProduct.quantity || 1)

      let totalPrice = watchProducts.reduce((acc, product, i) => {
        if (i === index) {
          return acc
        }

        return acc + Number(product.price) * product.quantity
      }, 0)

      totalPrice += newProductPrice

      setValue(`products.${index}`, {
        ...selectedProduct,
        quantity: selectedProduct.quantity || 1,
        yearofmanufacture: selectedProduct.yearofmanufacture || dayjs().format('YYYY-MM-DD'),
        expiryDate: selectedProduct.expiryDate || dayjs().format('YYYY-MM-DD'),
        strength: selectedProduct.strength || '',
        dosageForm: selectedProduct.dosageForm || '',
        description: selectedProduct.description || '',
        quantityInStock: selectedProduct.quantityInStock || '',
      })

      setTotalPrice(totalPrice)
      setValue('totalPrice', totalPrice)
    }
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const productPrice = Number(watchProducts[index]?.price) || 0
    const calculatedPrice = watchProducts.reduce(
      (acc, product, i) =>
        i === index ? acc + productPrice * quantity : acc + Number(product.price) * product.quantity,
      0,
    )

    setValue(`products.${index}.quantity`, quantity)
    setTotalPrice(calculatedPrice)
    setValue('totalPrice', calculatedPrice)
  }

  const watchProducts = watch('products')

  useEffect(() => {
    const calculatedPrice = watchProducts.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0)

    setTotalPrice(calculatedPrice)
    setValue('totalPrice', calculatedPrice)
  }, [watchProducts, setValue])

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const body = {
        ...data,
        totalPrice,
        status: data.status || OrderStatus.Pending,
        products: data.products.map((product) => ({
          ...product,
        })),
      }
      const url = orderId ? Endpoints.OrderSingle.replace(':id', String(orderId)) : Endpoints.Orders
      const method = orderId ? 'PUT' : 'POST'

      const response = await request({
        url,
        method,
        body,
      }).unwrap()

      if (response && response.data) {
        reset()
        setOpen(false)
        setOpenMessage(true)
        setTimeout(() => {
          onOrderCreated()
        }, 1500)
      } else {
        setErrorMessage('No data received')
        setOpenMessage(true)
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error has occurred')
      }
      setOpenMessage(true)
    }
  }

  const handleAppend = () => {
    append({
      id: 0,
      name: '',
      price: '',
      yearofmanufacture: dayjs(),
      expiryDate: dayjs(),
      quantity: 1,
      strength: '',
      dosageForm: '',
      description: '',
      quantityInStock: '',
      category: '',
    })
  }

  const handleClose = () => {
    setOpen(false)
    reset(defaultValues)
  }
  const handleEditClose = () => {
    setOpen(false)
  }

  return {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    watchProducts,
    totalPrice,
    products,
    fields,
    append,
    remove,
    handleProductChange,
    handleQuantityChange,
    handleAppend,
    handleClose,
    handleEditClose,
    isLoading,
    errorMessage,
    openMessage,
    setErrorMessage,
    setOpenMessage,
    onSubmit,
  }
}
