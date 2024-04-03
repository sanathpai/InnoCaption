import React, { useState } from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddToCartMutation } from '../app/api/cartApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct, selectCart } from '../app/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const currentCartData = useSelector(selectCart);
  const [updateCart, { isSuccess, isError }] = useAddToCartMutation(); //API

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const cartItems = Object.values(currentCartData); //get all cart items.

  const handleQuantityChange = (productId, delta) => {
    const product = cartItems.find(item => item.id === productId); //map the product with id get the product to update
  
    if (product) {
      const newQuantity = Math.max(product.quantity + delta, 1); // handle quantity change
      const updatedProduct = { ...product, quantity: newQuantity };
      dispatch(updateProduct({ product: updatedProduct })); //local call for update 
    }
  };

  const handleDelete = async (productId) => {
    const updatedProductList = cartItems.filter(item => item.id !== productId); // get updated list without the deleted product
    console.log(updatedProductList);
  
    try {
      await updateCart({ product: updatedProductList }).unwrap(); // api call
      dispatch(deleteProduct({ productId })); // local state call
      setSnackbarMessage('Item deleted from cart.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete product from cart:', error);
      setSnackbarMessage('Failed to delete item. Please try again.');
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default Cart;
