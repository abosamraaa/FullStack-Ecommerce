// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ userName, userPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8090/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userPassword }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json(); // Extract the token
      return data.jwtToken; // Return the token
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, // Initial state for the token
    status: 'idle', // Status of the login request
    error: null, // Any error messages
  },
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'; // Update status when login starts
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Update status on success
        state.token = action.payload; // Store the token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'; // Update status on failure
        state.error = action.payload; // Store the error message
      });
  },
});

export default authSlice.reducer; // Export the reducer
