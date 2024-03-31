// src/actions/cartActions.js
import axios from 'axios';
const API_BASE_URL = 'https://dummyjson.com';

// export const addToCart = (product) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/carts/add`, {productId: product.id, quantity: 1});
//     dispatch({ type: 'ADD_TO_CART', payload: response.data });
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// };
export const addToCart = (userId, products) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/carts/add`, {
      userId: userId,
      products: (products || []).map(product => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: response.data,
    });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    // Dispatch an error action if necessary
  }
};


export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    await axios.put(`${API_BASE_URL}/carts/${productId}`, { quantity });
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};
