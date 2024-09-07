import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice'
import { Message, Modal } from '@/components'
import { AlertSeverity } from '@/types/enum'

type OrderDeleteProps = {
  openDelete: boolean
  setOpenDelete: (openDelete: boolean) => void
  orderId: number | null
  onOrderCreated: () => void
}

export const OrderDelete: React.FC<OrderDeleteProps> = ({ openDelete, setOpenDelete, orderId, onOrderCreated }) => {
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [request, { isLoading }] = useRequestMutation()
  const successMessage = 'Order delete successfully'
  const handleClose = () => {
    setOpenDelete(false)
  }

  const handleDelete = async () => {
    try {
      const response = await request({
        url: Endpoints.OrderSingle.replace(':id', String(orderId)),
        method: 'DELETE',
      }).unwrap()

      if (response.status === 200) {
        setOpenDelete(false)
        setOpenMessage(true)
        setTimeout(() => {
          onOrderCreated()
        }, 1500)
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

  return (
    <>
      <Message
        messageType={errorMessage ? AlertSeverity.Error : AlertSeverity.Success}
        openMessage={openMessage}
        message={errorMessage ? errorMessage : successMessage}
        setOpenMessage={setOpenMessage}
      />
      <Modal open={openDelete} setOpen={setOpenDelete}>
        <Typography variant="h4">Delete order</Typography>
        <Box py={3}>
          <Typography color="warning">Do you really want to delete this order?</Typography>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid size={6}>
            <LoadingButton
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
          </Grid>
          <Grid size={6}>
            <Button fullWidth variant="outlined" size="large" color="warning" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
}
