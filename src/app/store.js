import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApiSlice } from "./api/productsApiSlice";
import { cartApiSlice } from "./api/cartApiSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware)
    .concat(cartApiSlice.middleware),
    
});

setupListeners(store.dispatch);
