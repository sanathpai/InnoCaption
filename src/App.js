import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./Components/Navbar";
import { Box } from "@mui/material";

import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ mt: 8 }}>
                  <ProductList />
                </Box>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
    </Provider>
  );
};

export default App;
