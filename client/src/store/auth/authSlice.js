import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    isAuthenticated: false,
    userRole: null,
    userId: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = !!action.payload.accessToken;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userRole = null;
    }
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;