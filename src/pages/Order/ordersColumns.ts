export const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'orderNumber', headerName: 'Order number', sortable: true },
  { field: 'customerName', headerName: 'Customer name', sortable: true },
  { field: 'pharmacyName', headerName: 'Pharmacy name', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true },
  { field: 'orderDate', headerName: 'Create date', sortable: true },
  { field: 'totalPrice', headerName: 'Total price', sortable: true },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
  },
]

export const additionalColumns = [
  {
    field: 'products',
    headerName: 'Products',
  },
]

export const fieldSpecificRequiredFields: Record<string, string[]> = {
  products: ['name', 'price', 'strength', 'dosageForm', 'quantity'],
}
