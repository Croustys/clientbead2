import { configureStore } from '@reduxjs/toolkit';
import { api } from '@lib/api';
import authReducer from "@store/auth/authSlice"

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;