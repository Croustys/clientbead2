import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@lib/constants';

export const AuthorizedBaseQuery = async (args, api, extraOptions) => {
  const { auth } = api.getState();
  const token = auth.accessToken;

  const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.error(result);
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: AuthorizedBaseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/authentication',
        method: 'POST',
        body: { email, password, strategy: 'local' },
      }),
    }),
    applyForJob: builder.mutation({
      query: ({ jobId }) => ({
        url: '/applicants',
        method: 'POST',
        body: { jobId },
      }),
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getExperiences: builder.query({
      query: () => `/experiences`,
    }),
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
    }),
    addExperiences: builder.mutation({
      query: (experiences) => ({
        url: '/experiences',
        method: 'POST',
        body: experiences,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...experience }) => ({
        url: `/experiences/${id}`,
        method: 'PATCH',
        body: experience,
      }),
    }),
    createJob: builder.mutation({
      query: (job) => ({
        url: '/jobs',
        method: 'POST',
        body: job,
      }),
    }),
    getJobsByCompany: builder.query({
      query: (userId) => `/jobs?userId=${userId}`,
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
    }),
    getApplicantsByJobId: builder.query({
      query: (jobId) => `/applicants?jobId=${jobId}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
  useGetExperiencesQuery,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyForJobMutation,
  useAddExperiencesMutation,
  useUpdateExperienceMutation,
  useCreateJobMutation,
  useGetJobsByCompanyQuery,
  useDeleteJobMutation,
  useGetApplicantsByJobIdQuery
} = api;
