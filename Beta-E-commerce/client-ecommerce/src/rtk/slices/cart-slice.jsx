import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart:(state,action)=>{
            state.push(action.payload)
        },
        deleteFromCart:(state,action)=>{

        },
        clearCart:(state,action)=>{

        }
    },
  });
export const {addToCart,deleteFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;