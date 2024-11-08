// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // Add reducers here as you create them
    placeholder: (state = {}, action) => state,
  },
});

export default store;