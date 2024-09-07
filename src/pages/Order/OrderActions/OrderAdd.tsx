import React from 'react'
import { Controller } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Message, Modal } from '@/components'
import { useOrderForm } from '@/hooks/useOrderForm'
import { formatCurrency } from '@/services'
import { AlertSeverity, OrderStatus } from '@/types/enum'

type OrderAddFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onOrderCreated: () => void
}

export const OrderAdd: React.FC<OrderAddFormProps> = ({ open, setOpen, onOrderCreated }) => {
  const {
    control,
    handleSubmit,
    register,
    totalPrice,
    products,
    fields,
    remove,
    handleProductChange,
    handleQuantityChange,
    handleAppend,
    handleClose,
    isLoading,
    errorMessage,
    openMessage,
    setOpenMessage,
    onSubmit,
  } = useOrderForm(null, onOrderCreated, setOpen)

  return (
    <>
      <Message
        messageType={errorMessage ? AlertSeverity.Error : AlertSeverity.Success}
        openMessage={openMessage}
        message={errorMessage ? errorMessage : 'Order added successfully'}
        setOpenMessage={setOpenMessage}
      />
      <Modal open={open} setOpen={setOpen} width={1000}>
        <Typography variant="h4" gutterBottom>
          Add Order
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid size={6}>
              <Controller
                name="customerName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Customer Name" variant="outlined" margin="normal" />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="pharmacyName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Pharmacy Name" variant="outlined" margin="normal" />
                )}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      {Object.entries(OrderStatus).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <TextField label="Total Price" value={formatCurrency(totalPrice)} disabled variant="outlined" fullWidth />
            </Grid>
            <Grid size={12} mb={2}>
              <Button size="large" fullWidth type="button" variant="contained" onClick={handleAppend}>
                + Add Product
              </Button>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
            {fields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Grid size={5}>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Controller
                      control={control}
                      name={`products.${index}.id`}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Product"
                          onChange={(e) => handleProductChange(index, Number(e.target.value))}
                        >
                          {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                              {product.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid size={5}>
                  <FormControl fullWidth>
                    <TextField
                      label="Quantity"
                      type="number"
                      {...register(`products.${index}.quantity` as const, { required: true })}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid size={2}>
                  <Button variant="contained" color="secondary" size="large" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Grid container spacing={2} mt={4}>
            <Grid size={3}>
              <LoadingButton
                disabled={isLoading}
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Add Order
              </LoadingButton>
            </Grid>
            <Grid size={3}>
              <Button type="button" variant="outlined" size="large" color="warning" fullWidth onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
