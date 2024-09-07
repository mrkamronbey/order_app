import { Components } from '@mui/material/styles/components'

export const MuiAlert: Components['MuiAlert'] = {
  styleOverrides: {
    filledSuccess: {
      backgroundColor: '#09C60D',
    },
    filledError: {
      backgroundColor: '#fd755a',
    },
    root: {
      color: '#fff',
    },
  },
}
