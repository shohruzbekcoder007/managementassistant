// RTK Query API Service - Single Responsibility for API calls
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../../config/env.config';
import { AUTH_ENDPOINTS } from '../../config/api_urls';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../../types/auth.types';

// Base query with auth token
const baseQuery = fetchBaseQuery({
  baseUrl: env.fullApiUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: AUTH_ENDPOINTS.SIGNIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Signup endpoint
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (userData) => ({
        url: AUTH_ENDPOINTS.SIGNUP,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useSignupMutation,
} = apiSlice;
