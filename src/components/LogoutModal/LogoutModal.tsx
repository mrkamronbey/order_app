import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Modal } from '@/components'

type LogoutModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  onLogout: () => void
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ open, setOpen, onLogout }) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} setOpen={setOpen} width={400}>
      <Typography variant="h4">Confirm Logout</Typography>
      <Box py={3}>
        <Typography color="warning">Are you sure you want to log out?</Typography>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid size={6}>
          <Button fullWidth onClick={onLogout} variant="contained" size="large">
            Logout
          </Button>
        </Grid>
        <Grid size={6}>
          <Button fullWidth onClick={handleClose} variant="outlined" size="large" color="warning">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}
