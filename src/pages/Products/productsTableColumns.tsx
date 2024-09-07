export const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'dosageForm', headerName: 'Dosage Form', sortable: true },
  { field: 'strength', headerName: 'Strength', sortable: true },
  { field: 'quantityInStock', headerName: 'Quantity In Stock', sortable: true },
  { field: 'price', headerName: 'Price', sortable: true },
  {
    field: 'yearofmanufacture',
    headerName: 'Year of Manufacture',
    sortable: true,
  },
  {
    field: 'expiryDate',
    headerName: 'Expiry Date',
    sortable: true,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
  },
]

export const additionalColumns = [{ field: 'description', headerName: 'Description' }]
