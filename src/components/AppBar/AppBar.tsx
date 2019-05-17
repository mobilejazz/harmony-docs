// React
import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MatAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

// Assets
import './AppBar.scss';
import GitHubIcon from '../../assets/images/github.svg';

const AppBar = () => {
  return (
    <div className="AppBar">
      <MatAppBar position="static">
        <Toolbar>
          <Button color="inherit"><SupervisedUserCircle className="AppBar__harmony-icon" /> Harmony</Button>
          <span className="AppBar__spacer"></span>
          <IconButton>
            <img className="AppBar__github-icon" src={GitHubIcon} alt="GitHub" />
          </IconButton>
        </Toolbar>
      </MatAppBar>
    </div>
  );
}

export default AppBar;
