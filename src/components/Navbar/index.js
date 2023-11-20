import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './styles.css';
const NavBar = ({ children }) => {
    return (
        <div>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bliss Application
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
};

export default NavBar;
