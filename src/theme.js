import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      light: orange[50],
      main: orange[100],
      contrastText:'black',
    },
    tertiary:{
      main: orange[200],
    }
  },
});

export default theme;