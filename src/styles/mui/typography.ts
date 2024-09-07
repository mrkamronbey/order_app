import { ThemeOptions } from '@mui/material/styles/createTheme'

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Poppins',
  fontSize: 14,
  htmlFontSize: 14,

  h1: {
    fontWeight: 800,
    fontSize: '34px',
  },

  h2: {
    fontWeight: 700,
    fontSize: '32px',
  },

  h3: {
    fontWeight: 600,
    fontSize: '26px',
  },

  h4: {
    fontWeight: 600,
    fontSize: '24px',
  },

  h5: {
    fontWeight: 500,
    fontSize: '20px',
  },

  h6: {
    fontWeight: 400,
    fontSize: '16px',
  },

  subtitle1: {
    fontWeight: 400,
    fontSize: '16px',
  },

  button: {
    fontWeight: 400,
    fontSize: 'clamp(14px, 1vw, 16px)',
    textTransform: 'none',
  },

  subtitle2: {
    fontWeight: 400,
    fontSize: '14px',
  },

  body1: {
    fontSize: 'clamp(14px, 2vw, 16px)',
  },

  body2: {
    fontSize: '12px',
  },

  caption: {
    fontSize: '16px',
    color: 'var(--brand)',
    fontWeight: 400,
  },
}
