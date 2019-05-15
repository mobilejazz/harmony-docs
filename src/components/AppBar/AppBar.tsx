// React
import React from 'react';

// Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MatAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const AppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MatAppBar position="static">
        <Toolbar>
          <Typography variant="h6">Harmony</Typography>
        </Toolbar>
      </MatAppBar>
    </div>
  );
}

export default AppBar;
