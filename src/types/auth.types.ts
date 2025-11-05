// Auth related types - API Request/Response interfaces

// User Roles - Using const object instead of enum for TypeScript verbatimModuleSyntax
export const UserRole = {
  USER: 0,
  ADMIN: 10,
  OWNER: 20,
  ACCOUNTANT: 30,
  SUPERADMIN: 40,
  GUEST: 90,
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Role Labels
export const RoleLabels: Record<UserRole, string> = {
  [UserRole.USER]: 'User',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.OWNER]: 'Owner',
  [UserRole.ACCOUNTANT]: 'Accountant',
  [UserRole.SUPERADMIN]: 'Super Admin',
  [UserRole.GUEST]: 'Guest',
};

// Permissions based on roles
export interface Permission {
  canViewDashboard: boolean;
  canAddExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canManageRoles: boolean;
  canViewAIInsights: boolean;
  canExportData: boolean;
}

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
  role: UserRole;
  permissions?: Permission;
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
  permissions: Permission | null;
}
