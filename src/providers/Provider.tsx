import { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { store } from '@/stores'
import { theme } from '@/styles/mui'

export const Provider = ({ children }: PropsWithChildren) => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  </ReduxProvider>
)
