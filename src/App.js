import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./Components/Navbar";
import { Box } from "@mui/material";
import CustomThemeProvider from "./Components/ThemeContext"; // If you're not using ThemeContext directly, no need to import it here
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
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
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* Define other routes here */}
          </Routes>
        </Router>
      </CustomThemeProvider>
    </Provider>
  );
};

export default App;
