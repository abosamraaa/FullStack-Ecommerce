import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch("http://localhost:8090/getAllProducts");
  const data = await res.json();
  return data;
});

// Create a slice for products with correct extraReducers handling
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    // Corrected the spelling of 'fulfilled'
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload; // The payload from the fulfilled action
    });
  },
});

// No actions to export if reducers are empty
export default productsSlice.reducer;
