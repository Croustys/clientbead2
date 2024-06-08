import { configureStore } from '@reduxjs/toolkit';
import { api } from '@lib/api';
import authReducer from "@store/slices/authSlice"
import filterReducer from "@store/slices/filterSlice"

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filter: filterReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;