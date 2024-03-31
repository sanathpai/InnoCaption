// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Switch } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon, Search as SearchIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sanath
        </Typography>
        <form onSubmit={handleSubmitSearch} style={{ flexGrow: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </form>
        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleTheme}>
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
