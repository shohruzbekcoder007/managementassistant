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
import type {
  Address,
  AddressListResponse,
  CreateAddressRequest,
  UpdateAddressRequest,
  Category,
  CategoryListResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Company,
  CompanyListResponse,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  PaginationParams,
} from '../../types/common.types';

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
  tagTypes: ['Auth', 'User', 'Role', 'Address', 'Category', 'Company'],
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

    // ========== ADDRESS ENDPOINTS ==========
    
    // Create address
    createAddress: builder.mutation<Address, CreateAddressRequest>({
      query: (addressData) => ({
        url: API_URLS.ADDRESS.CREATE,
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['Address'],
    }),

    // Get address list (paginated)
    getAddressList: builder.query<AddressListResponse, PaginationParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        
        return {
          url: `${API_URLS.ADDRESS.LIST}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Address'],
    }),

    // Get address detail by UUID
    getAddressDetail: builder.query<Address, string>({
      query: (id) => ({
        url: API_URLS.ADDRESS.DETAIL(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Address', id }],
    }),

    // Get address detail by code
    getAddressByCode: builder.query<Address, number>({
      query: (code) => ({
        url: API_URLS.ADDRESS.DETAIL_BY_CODE(code),
        method: 'GET',
      }),
      providesTags: (_result, _error, code) => [{ type: 'Address', id: code }],
    }),

    // Update address
    updateAddress: builder.mutation<Address, { id: string; data: UpdateAddressRequest }>({
      query: ({ id, data }) => ({
        url: API_URLS.ADDRESS.UPDATE(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Address', id }, 'Address'],
    }),

    // Delete address
    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: API_URLS.ADDRESS.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),

    // ========== CATEGORY ENDPOINTS ==========
    
    // Create category
    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (categoryData) => ({
        url: API_URLS.CATEGORY.CREATE,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: ['Category'],
    }),

    // Get category list (paginated)
    getCategoryList: builder.query<CategoryListResponse, PaginationParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        
        return {
          url: `${API_URLS.CATEGORY.LIST}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Category'],
    }),

    // Get category detail
    getCategoryDetail: builder.query<Category, string>({
      query: (id) => ({
        url: API_URLS.CATEGORY.DETAIL(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),

    // Update category
    updateCategory: builder.mutation<Category, { id: string; data: UpdateCategoryRequest }>({
      query: ({ id, data }) => ({
        url: API_URLS.CATEGORY.UPDATE(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Category', id }, 'Category'],
    }),

    // Delete category
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: API_URLS.CATEGORY.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // ========== COMPANY ENDPOINTS ==========
    
    // Create company
    createCompany: builder.mutation<Company, CreateCompanyRequest>({
      query: (companyData) => ({
        url: API_URLS.COMPANY.CREATE,
        method: 'POST',
        body: companyData,
      }),
      invalidatesTags: ['Company'],
    }),

    // Get company list (paginated)
    getCompanyList: builder.query<CompanyListResponse, PaginationParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        
        return {
          url: `${API_URLS.COMPANY.LIST}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Company'],
    }),

    // Get company detail
    getCompanyDetail: builder.query<Company, string>({
      query: (id) => ({
        url: API_URLS.COMPANY.DETAIL(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Company', id }],
    }),

    // Update company
    updateCompany: builder.mutation<Company, { id: string; data: UpdateCompanyRequest }>({
      query: ({ id, data }) => ({
        url: API_URLS.COMPANY.UPDATE(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Company', id }, 'Company'],
    }),

    // Delete company
    deleteCompany: builder.mutation<void, string>({
      query: (id) => ({
        url: API_URLS.COMPANY.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Auth
  useLoginMutation,
  useSignupMutation,
  // User
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  // Role
  useCreateRoleMutation,
  useGetRoleListQuery,
  useLazyGetRoleListQuery,
  useGetRoleDetailQuery,
  useLazyGetRoleDetailQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  // Address
  useCreateAddressMutation,
  useGetAddressListQuery,
  useLazyGetAddressListQuery,
  useGetAddressDetailQuery,
  useLazyGetAddressDetailQuery,
  useGetAddressByCodeQuery,
  useLazyGetAddressByCodeQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  // Category
  useCreateCategoryMutation,
  useGetCategoryListQuery,
  useLazyGetCategoryListQuery,
  useGetCategoryDetailQuery,
  useLazyGetCategoryDetailQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // Company
  useCreateCompanyMutation,
  useGetCompanyListQuery,
  useLazyGetCompanyListQuery,
  useGetCompanyDetailQuery,
  useLazyGetCompanyDetailQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = apiSlice;
