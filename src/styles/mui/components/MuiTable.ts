import { Components } from '@mui/material/styles/components'

export const MuiTable: Components['MuiTable'] = {
  styleOverrides: {
    root: {
      color: 'black',
      boxShadow: 'none',
    },
  },
}

export const MuiTableHead: Components['MuiTableHead'] = {
  styleOverrides: {
    root: {
      background: '#00E091',
      color: 'white',
    },
  },
}

export const MuiTableCell: Components['MuiTableCell'] = {
  styleOverrides: {
    root: {
      color: 'inherit',
    },
  },
}
