// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#0A1C2E', // Dark blue background color
    },
      primary: {
        main: '#FFFFFF', // White color
      },
      secondary: {
        main: '#00bcd4', // Cyan color
      },
    },
  typography: {
      // Define your custom typography variants
      h4: {
        color: '#FFFFFF', // White color for h4
      },
      subtitle1: {
        color: '#00bcd4', // Cyan color for subtitle1
      },
      body1: {
        color: '#FFFFFF', // White color for body1
      },
    allVariants: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  },
  components: {
   MuiPagination: {
      styleOverrides: {
        root: {
          button: {
            color: '#FFFFFF',
          },
          color: '#FFFFFF', // White color for pagination
        },
      },
    },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#FFFFFF',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
          },
        },
      },
  },
});

export default theme;
