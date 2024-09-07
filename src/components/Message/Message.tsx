import * as React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { AlertSeverity } from '@/types/enum'

type MessageProps = {
  openMessage: boolean
  setOpenMessage: (openMessage: boolean) => void
  message: string
  messageType: AlertSeverity
}

export const Message: React.FC<MessageProps> = ({ openMessage, setOpenMessage, message, messageType }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenMessage(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={messageType} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
