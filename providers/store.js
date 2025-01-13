// store.js
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    auth: authReducer,  // Include the auth reducer to manage authentication state
  },
});

