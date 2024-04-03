import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    // Add or update a product in the cart
    addProduct: (state, action) => {
      const { product } = action.payload;
      if(!state[product.id]){
        state[product.id] = product
      }      
    },
    updateProduct: (state, action) => {
        const { product } = action.payload;
       state[product.id] = { ...state[product.id], ...product };
    },
    // Remove a product from the cart
    deleteProduct: (state, action) => {
      const { productId } = action.payload;
      if (state[productId]) {
        delete state[productId];
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;

// Selector to get the entire cart
export const selectCart = (state) => state.cart;

