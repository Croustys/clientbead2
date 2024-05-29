import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@lib/constants';

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
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
