// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

let nextCartItemId = 0;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item => 
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1, cartItemId: nextCartItemId++ }];
      }
    case 'REMOVE_ITEM':
      return state.filter(item => item.cartItemId !== action.payload.cartItemId);
    case 'EDIT_ITEM_QUANTITY':
      return state.map(item =>
        item.cartItemId === action.payload.cartItemId ? { ...item, quantity: action.payload.quantity } : item
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
