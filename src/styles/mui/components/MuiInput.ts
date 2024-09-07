import { Components } from '@mui/material/styles/components'

export const MuiInputBase: Components['MuiInputBase'] = {
  styleOverrides: {
    root: {
      color: 'white', // Text color inside the input
    },
  },
}

export const MuiOutlinedInput: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    notchedOutline: {
      borderColor: 'white', // Outline border color
    },
    root: {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Border color on hover
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Border color when focused
      },
    },
  },
}
