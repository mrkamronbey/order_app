import React from 'react'
import { Controller } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Message, Modal } from '@/components'
import { useProductForm } from '@/hooks'
import { AlertSeverity } from '@/types/enum'

type ProductAddProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onProductCreated: () => void
}

export const ProductAdd: React.FC<ProductAddProps> = ({ open, setOpen, onProductCreated }) => {
  const {
    control,
    handleSubmit,
    handleClose,
    onSubmit,
    isLoading,
    openMessage,
    errorMessage,
    successMessage,
    errors,
    setOpenMessage,
  } = useProductForm(null, setOpen, onProductCreated)

  return (
    <Box>
      <Message
        messageType={errorMessage ? AlertSeverity.Error : AlertSeverity.Success}
        openMessage={openMessage}
        message={errorMessage ? errorMessage : successMessage}
        setOpenMessage={setOpenMessage}
      />
      <Modal open={open} setOpen={setOpen} width={1000}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h4" gutterBottom>
            Product Add
          </Typography>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="dosageForm"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dosage form"
                    fullWidth
                    margin="normal"
                    placeholder="Example: Tablet"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="strength"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Strength"
                    fullWidth
                    margin="normal"
                    placeholder="Example: 100 mg"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price UZS"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="quantityInStock"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity In Stock"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="yearofmanufacture"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Year of Manufacture"
                    slots={{ textField: (params) => <TextField {...params} fullWidth margin="normal" /> }}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="expiryDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Expiry Date"
                    slots={{ textField: (params) => <TextField {...params} fullWidth margin="normal" /> }}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Description" multiline rows={6} fullWidth margin="normal" />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid size={3}>
              <LoadingButton
                disabled={isLoading}
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Added
              </LoadingButton>
            </Grid>
            <Grid size={3}>
              <Button fullWidth variant="outlined" size="large" color="warning" onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
