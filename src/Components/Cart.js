import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../actions/cartActions';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdate = (productId, quantity) => {
    dispatch(updateCartItem(productId, quantity));
  };

  return (
    <List>
      {cart.map(item => (
        <ListItem key={item.cartItemId}>
          <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleUpdate(item.productId, item.quantity + 1)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => item.quantity > 1 && handleUpdate(item.productId, item.quantity - 1)}>
            <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleRemove(item.productId)}>
            <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
    </List>
        );
        };

export default Cart;
