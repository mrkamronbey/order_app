import { Dayjs } from 'dayjs'

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
