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
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#4CAF50',
      contrastText: '#ffffff',
    },
  },

  typography: {
    h1: {
      fontSize: 'clamp(1.5rem, 2vw, 2rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'clamp(1.125rem, 1.5vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 'clamp(0.875rem, 1vw, 1.15rem)',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    h6: {
      fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
      fontWeight: 500,
    },
    caption: {
      fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
      fontWeight: 400,
      textTransform: 'uppercase',
      lineHeight: 2,
    },
  },

  components: {
    MuiTabs: {
      defaultProps: {
        variant: 'scrollable',
        scrollButtons: 'auto',
      },
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          textTransform: 'none',
          color: theme.palette.primary.contrastText,
          '&.Mui-selected': {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          backgroundColor: ownerState.active
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
          color: ownerState.active ? theme.palette.common.white : theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.light,
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          textTransform: 'none',
          color: theme.palette.text.primary,
          borderRadius: 8,
        }),
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          border: `2px solid rgba(0, 0, 0, 0.1)`,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '&:hover': {
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark,
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          width: '20%',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          padding: '16px',
          boxSizing: 'border-box',
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
          color: theme.palette.text.primary,
          textDecoration: 'none',
          '&:hover': {
            color: theme.palette.secondary.main,
            textDecoration: 'underline',
          },
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
  },
})
export default theme
