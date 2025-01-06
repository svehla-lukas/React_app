import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#546E7A',
      light: '#819CA9',
      dark: '#29434E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFAB91',
      light: '#FFCCBC',
      dark: '#D57263',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFF8DC',
      paper: '#FFFBE6',
    },
    error: {
      main: '#E57373',
      light: '#FFCDD2',
      dark: '#D32F2F',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFB74D',
      light: '#FFE0B2',
      dark: '#F57C00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#0288D1',
      contrastText: '#ffffff',
    },
    success: {
      main: '#81C784', // Zelená pro úspěšné akce
      light: '#A5D6A7',
      dark: '#4CAF50',
      contrastText: '#ffffff',
    },
  },

  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.15rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },

    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'uppercase',
      lineHeight: 2,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
        contained: {
          border: '2px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
          },
        },
        outlined: {
          borderColor: '#1976d2',
          '&:hover': {
            borderColor: '#004ba0',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '20%',
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '16px',
          boxSizing: 'border-box',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'black',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
})
export default theme
