import React, { ReactNode } from 'react'
import { Box, Modal as MuiModal } from '@mui/material'

interface ModalProps {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  handleOpen?: () => void
  width?: number
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 3,
  borderRadius: 2,
}

const backdropStyle = {
  backdropFilter: 'blur(5px)',
}

export const Modal: React.FC<ModalProps> = ({ open, children, width }) => (
  <div>
    <MuiModal
      open={open}
      slotProps={{
        backdrop: {
          style: backdropStyle,
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} width={width ? width : 'auto'}>
        {children}
      </Box>
    </MuiModal>
  </div>
)
