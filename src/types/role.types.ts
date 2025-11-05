// Role Management Types
import type { UserRole } from './auth.types';

/**
 * Role Assignment - Backend format
 */
export interface RoleAssignment {
  id?: string;
  role: UserRole;
  user_id: string;
  company_id: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Create Role Request
 */
export interface CreateRoleRequest {
  role: UserRole;
  user_id: string;
  company_id: string;
}

/**
 * Update Role Request
 */
export interface UpdateRoleRequest {
  role: UserRole;
  user_id: string;
  company_id: string;
}

/**
 * Role List Response (Paginated)
 */
export interface RoleListResponse {
  results: RoleAssignment[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

/**
 * Role Detail Response
 */
export interface RoleDetailResponse extends RoleAssignment {
  user?: {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
  };
  company?: {
    id: string;
    name: string;
  };
}

/**
 * Role List Query Parameters
 */
export interface RoleListParams {
  page?: number;
  limit?: number;
  user_id?: string;
  company_id?: string;
  role?: UserRole;
}
