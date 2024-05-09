import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/product-slice'
import cartSlice from './slices/cart-slice'
import authReducer from './slices/login-slice'
export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    auth: authReducer
  },
})