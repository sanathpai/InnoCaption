import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    navigate(`/?search=${searchQuery}`); // search query
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <form onSubmit={handleSubmitSearch} style={{ flexGrow: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange} // search functionality
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

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
