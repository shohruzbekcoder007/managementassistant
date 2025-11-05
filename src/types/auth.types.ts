// Auth related types - API Request/Response interfaces

// Login API types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user: UserData;
}

// Signup API types
export interface SignupRequest {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  email: string;
  password: string;
  confirmed_password: string;
}

export interface SignupResponse {
  access_token: string;
  refresh_token?: string;
  user: UserData;
}

// User data type
export interface UserData {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

// Legacy types for backward compatibility
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth state type
export interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
