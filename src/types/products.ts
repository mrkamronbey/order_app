import { Dayjs } from 'dayjs'

export type ProductsType = {
  quantity: number
  id: number
  name: string
  category: string
  dosageForm: string
  strength: string
  price: string
  quantityInStock: string
  expiryDate: Dayjs
  yearofmanufacture: Dayjs
  description: string
}

export type ProductAddFormValues = {
  name: string
  dosageForm: string
  strength: string
  price: string
  quantityInStock: string
  yearofmanufacture: Dayjs | null
  expiryDate: Dayjs | null
  description: string
}
