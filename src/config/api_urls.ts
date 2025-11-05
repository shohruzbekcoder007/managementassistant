// API URLs - Centralized API endpoint management (Single Responsibility)
// Bu fayl barcha API endpoint URLlarini saqlaydi

/**
 * Base URLs
 */
export const BASE_URLS = {
  API: '/api/v1',
} as const;

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
} as const;

/**
 * User Endpoints
 */
export const USER_ENDPOINTS = {
  ME: '/user/me',
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  CHANGE_PASSWORD: '/user/change-password',
  DELETE_ACCOUNT: '/user/delete',
} as const;

/**
 * Role Endpoints
 */
export const ROLE_ENDPOINTS = {
  CREATE: '/role/create/',
  LIST: '/role/list',
  DETAIL: (id: string) => `/role/detail/${id}/`,
  UPDATE: (id: string) => `/role/update/${id}/`,
  DELETE: (id: string) => `/role/delete/${id}/`,
} as const;

/**
 * Address Endpoints
 */
export const ADDRESS_ENDPOINTS = {
  CREATE: '/address/create/',
  LIST: '/address/list',
  DETAIL: (id: string) => `/address/detail/${id}/`,
  DETAIL_BY_CODE: (code: number) => `/address/detail-by-code/${code}/`,
  UPDATE: (id: string) => `/address/update/${id}/`,
  DELETE: (id: string) => `/address/delete/${id}/`,
} as const;

/**
 * Category Endpoints
 */
export const CATEGORY_ENDPOINTS = {
  CREATE: '/category/create/',
  LIST: '/category/list/',
  DETAIL: (id: string) => `/category/detail/${id}/`,
  UPDATE: (id: string) => `/category/update/${id}/`,
  DELETE: (id: string) => `/category/delete/${id}/`,
} as const;

/**
 * Company Endpoints
 */
export const COMPANY_ENDPOINTS = {
  CREATE: '/company/create/',
  LIST: '/company/list/',
  DETAIL: (id: string) => `/company/detail/${id}/`,
  UPDATE: (id: string) => `/company/update/${id}/`,
  DELETE: (id: string) => `/company/delete/${id}/`,
} as const;

/**
 * Helper function to build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${BASE_URLS.API}${endpoint}`;
};

/**
 * All API URLs exported as a single object
 */
export const API_URLS = {
  // Auth
  AUTH: {
    SIGNIN: buildApiUrl(AUTH_ENDPOINTS.SIGNIN),
    SIGNUP: buildApiUrl(AUTH_ENDPOINTS.SIGNUP),
    LOGOUT: buildApiUrl(AUTH_ENDPOINTS.LOGOUT),
    REFRESH_TOKEN: buildApiUrl(AUTH_ENDPOINTS.REFRESH_TOKEN),
    FORGOT_PASSWORD: buildApiUrl(AUTH_ENDPOINTS.FORGOT_PASSWORD),
    RESET_PASSWORD: buildApiUrl(AUTH_ENDPOINTS.RESET_PASSWORD),
    VERIFY_EMAIL: buildApiUrl(AUTH_ENDPOINTS.VERIFY_EMAIL),
  },
  // User
  USER: {
    ME: buildApiUrl(USER_ENDPOINTS.ME),
    PROFILE: buildApiUrl(USER_ENDPOINTS.PROFILE),
    UPDATE_PROFILE: buildApiUrl(USER_ENDPOINTS.UPDATE_PROFILE),
    CHANGE_PASSWORD: buildApiUrl(USER_ENDPOINTS.CHANGE_PASSWORD),
    DELETE_ACCOUNT: buildApiUrl(USER_ENDPOINTS.DELETE_ACCOUNT),
  },
  // Role
  ROLE: {
    CREATE: buildApiUrl(ROLE_ENDPOINTS.CREATE),
    LIST: buildApiUrl(ROLE_ENDPOINTS.LIST),
    DETAIL: (id: string) => buildApiUrl(ROLE_ENDPOINTS.DETAIL(id)),
    UPDATE: (id: string) => buildApiUrl(ROLE_ENDPOINTS.UPDATE(id)),
    DELETE: (id: string) => buildApiUrl(ROLE_ENDPOINTS.DELETE(id)),
  },
  // Address
  ADDRESS: {
    CREATE: buildApiUrl(ADDRESS_ENDPOINTS.CREATE),
    LIST: buildApiUrl(ADDRESS_ENDPOINTS.LIST),
    DETAIL: (id: string) => buildApiUrl(ADDRESS_ENDPOINTS.DETAIL(id)),
    DETAIL_BY_CODE: (code: number) => buildApiUrl(ADDRESS_ENDPOINTS.DETAIL_BY_CODE(code)),
    UPDATE: (id: string) => buildApiUrl(ADDRESS_ENDPOINTS.UPDATE(id)),
    DELETE: (id: string) => buildApiUrl(ADDRESS_ENDPOINTS.DELETE(id)),
  },
  // Category
  CATEGORY: {
    CREATE: buildApiUrl(CATEGORY_ENDPOINTS.CREATE),
    LIST: buildApiUrl(CATEGORY_ENDPOINTS.LIST),
    DETAIL: (id: string) => buildApiUrl(CATEGORY_ENDPOINTS.DETAIL(id)),
    UPDATE: (id: string) => buildApiUrl(CATEGORY_ENDPOINTS.UPDATE(id)),
    DELETE: (id: string) => buildApiUrl(CATEGORY_ENDPOINTS.DELETE(id)),
  },
  // Company
  COMPANY: {
    CREATE: buildApiUrl(COMPANY_ENDPOINTS.CREATE),
    LIST: buildApiUrl(COMPANY_ENDPOINTS.LIST),
    DETAIL: (id: string) => buildApiUrl(COMPANY_ENDPOINTS.DETAIL(id)),
    UPDATE: (id: string) => buildApiUrl(COMPANY_ENDPOINTS.UPDATE(id)),
    DELETE: (id: string) => buildApiUrl(COMPANY_ENDPOINTS.DELETE(id)),
  },
} as const;

// Export individual endpoints for direct access
export const {
  AUTH: AUTH_URLS,
  USER: USER_URLS,
  ROLE: ROLE_URLS,
  ADDRESS: ADDRESS_URLS,
  CATEGORY: CATEGORY_URLS,
  COMPANY: COMPANY_URLS,
} = API_URLS;
