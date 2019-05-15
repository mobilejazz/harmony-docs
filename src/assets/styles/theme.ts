import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: teal,
  },
  typography: {
    fontFamily: '"Barlow", sans-serif',
  },
});

export default theme;
