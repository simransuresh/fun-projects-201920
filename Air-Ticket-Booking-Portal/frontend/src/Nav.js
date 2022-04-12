import React from 'react';
import { Link } from 'react-router-dom';
// import About from './About';
// import Shop from './Shop';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Nav() {
    return (

        <nav>
          <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Flight ticket booking portal
          </Typography>
        </Toolbar>
        
        <ul class="navigation">
        <Link to="/login">
        <li class="item">Login</li>
        </Link>
        <Link to="/flights">
        <li class="item">Flights</li>
        </Link>
                
            </ul>
      </AppBar>

            
        </nav>
    );
}

export default Nav;