import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@lib/constants';
import { useDispatch } from 'react-redux';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password, strategy }) => ({
        url: '/authentication',
        method: 'POST',
        body: { email, password, strategy },
      }),
      onSuccess: (data, { dispatch }) => {
        const accessToken = data.accessToken;
        dispatch(setAccessToken(accessToken));
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;

export const setAccessToken = (accessToken) => ({
  type: 'auth/setAccessToken',
  payload: accessToken,
});

const initialState = {
  accessToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/setAccessToken':
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
