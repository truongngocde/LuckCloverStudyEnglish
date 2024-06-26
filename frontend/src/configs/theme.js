import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 375,
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
    fontSize: 16,
    htmlFontSize: 10,
  },
});

export default theme;