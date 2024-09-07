export type Product = {
  createdAt: Date
  updateAt: Date
  quantity: number
  id: number
  name: string
  category: string
  dosageForm: string
  strength: string
  price: string
  quantityInStock: string
  expiryDate: Date
  yearofmanufacture: Date
  description: string
}

export type OrderType = {
  id: number
  orderNumber: string
  customerName: string
  pharmacyName: string
  status: string
  orderDate: string
  totalPrice: string
  products: Product[]
}
