import { Components } from '@mui/material/styles/components'
export const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      background: '#00E091',
      color: '#fff',
    },
    outlinedWarning: {
      color: '#ed6c02',
      background: 'transparent',
    },
  },
}
