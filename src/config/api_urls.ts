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
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  CHANGE_PASSWORD: '/user/change-password',
  DELETE_ACCOUNT: '/user/delete',
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
    PROFILE: buildApiUrl(USER_ENDPOINTS.PROFILE),
    UPDATE_PROFILE: buildApiUrl(USER_ENDPOINTS.UPDATE_PROFILE),
    CHANGE_PASSWORD: buildApiUrl(USER_ENDPOINTS.CHANGE_PASSWORD),
    DELETE_ACCOUNT: buildApiUrl(USER_ENDPOINTS.DELETE_ACCOUNT),
  },
} as const;

// Export individual endpoints for direct access
export const {
  AUTH: AUTH_URLS,
  USER: USER_URLS,
} = API_URLS;
