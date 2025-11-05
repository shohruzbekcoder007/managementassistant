// RTK Query API Service - Single Responsibility for API calls
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../../config/env.config';
import { API_URLS } from '../../config/api_urls';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse, UserData } from '../../types/auth.types';
import type { 
  CreateRoleRequest, 
  UpdateRoleRequest, 
  RoleAssignment, 
  RoleListResponse, 
  RoleDetailResponse,
  RoleListParams 
} from '../../types/role.types';

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
  tagTypes: ['Auth', 'User', 'Role'],
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_URLS.AUTH.SIGNIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Signup endpoint
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (userData) => ({
        url: API_URLS.AUTH.SIGNUP,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Get current user (me)
    getCurrentUser: builder.query<UserData, void>({
      query: () => ({
        url: API_URLS.USER.ME,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // Create role assignment
    createRole: builder.mutation<RoleAssignment, CreateRoleRequest>({
      query: (roleData) => ({
        url: API_URLS.ROLE.CREATE,
        method: 'POST',
        body: roleData,
      }),
      invalidatesTags: ['Role'],
    }),

    // Get role list (paginated)
    getRoleList: builder.query<RoleListResponse, RoleListParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.user_id) queryParams.append('user_id', params.user_id);
        if (params?.company_id) queryParams.append('company_id', params.company_id);
        if (params?.role !== undefined) queryParams.append('role', params.role.toString());
        
        return {
          url: `${API_URLS.ROLE.LIST}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Role'],
    }),

    // Get role detail
    getRoleDetail: builder.query<RoleDetailResponse, string>({
      query: (id) => ({
        url: API_URLS.ROLE.DETAIL(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Role', id }],
    }),

    // Update role assignment
    updateRole: builder.mutation<RoleAssignment, { id: string; data: UpdateRoleRequest }>({
      query: ({ id, data }) => ({
        url: API_URLS.ROLE.UPDATE(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Role', id }, 'Role'],
    }),

    // Delete role assignment
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: API_URLS.ROLE.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useSignupMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useCreateRoleMutation,
  useGetRoleListQuery,
  useLazyGetRoleListQuery,
  useGetRoleDetailQuery,
  useLazyGetRoleDetailQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = apiSlice;
