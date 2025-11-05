import type { Permission } from '../types/auth.types';
import { UserRole } from '../types/auth.types';

/**
 * Permission Service
 * Manages role-based permissions and access control
 */
export class PermissionService {
  /**
   * Get permissions based on user role
   * Higher role numbers (GUEST=90) have less access
   * Lower role numbers (USER=0) have more access
   */
  static getPermissionsByRole(role: UserRole): Permission {
    // Super Admin - Full access
    if (role === UserRole.SUPERADMIN) {
      return {
        canViewDashboard: true,
        canAddExpense: true,
        canEditExpense: true,
        canDeleteExpense: true,
        canViewReports: true,
        canManageUsers: true,
        canManageRoles: true,
        canViewAIInsights: true,
        canExportData: true,
      };
    }

    // Owner - Almost full access except role management
    if (role === UserRole.OWNER) {
      return {
        canViewDashboard: true,
        canAddExpense: true,
        canEditExpense: true,
        canDeleteExpense: true,
        canViewReports: true,
        canManageUsers: true,
        canManageRoles: false,
        canViewAIInsights: true,
        canExportData: true,
      };
    }

    // Accountant - Financial data management
    if (role === UserRole.ACCOUNTANT) {
      return {
        canViewDashboard: true,
        canAddExpense: true,
        canEditExpense: true,
        canDeleteExpense: true,
        canViewReports: true,
        canManageUsers: false,
        canManageRoles: false,
        canViewAIInsights: true,
        canExportData: true,
      };
    }

    // Admin - User management without financial delete
    if (role === UserRole.ADMIN) {
      return {
        canViewDashboard: true,
        canAddExpense: true,
        canEditExpense: true,
        canDeleteExpense: false,
        canViewReports: true,
        canManageUsers: true,
        canManageRoles: false,
        canViewAIInsights: true,
        canExportData: false,
      };
    }

    // Regular User - Basic access
    if (role === UserRole.USER) {
      return {
        canViewDashboard: true,
        canAddExpense: true,
        canEditExpense: true,
        canDeleteExpense: false,
        canViewReports: true,
        canManageUsers: false,
        canManageRoles: false,
        canViewAIInsights: true,
        canExportData: false,
      };
    }

    // Guest - Read-only access
    if (role === UserRole.GUEST) {
      return {
        canViewDashboard: true,
        canAddExpense: false,
        canEditExpense: false,
        canDeleteExpense: false,
        canViewReports: true,
        canManageUsers: false,
        canManageRoles: false,
        canViewAIInsights: true,
        canExportData: false,
      };
    }

    // Default - No access (fallback)
    return {
      canViewDashboard: false,
      canAddExpense: false,
      canEditExpense: false,
      canDeleteExpense: false,
      canViewReports: false,
      canManageUsers: false,
      canManageRoles: false,
      canViewAIInsights: false,
      canExportData: false,
    };
  }

  /**
   * Check if user has specific permission
   */
  static hasPermission(
    permissions: Permission | null,
    permissionKey: keyof Permission
  ): boolean {
    if (!permissions) return false;
    return permissions[permissionKey] === true;
  }

  /**
   * Check if user has any of the specified permissions
   */
  static hasAnyPermission(
    permissions: Permission | null,
    permissionKeys: Array<keyof Permission>
  ): boolean {
    if (!permissions) return false;
    return permissionKeys.some((key) => permissions[key] === true);
  }

  /**
   * Check if user has all of the specified permissions
   */
  static hasAllPermissions(
    permissions: Permission | null,
    permissionKeys: Array<keyof Permission>
  ): boolean {
    if (!permissions) return false;
    return permissionKeys.every((key) => permissions[key] === true);
  }

  /**
   * Get role level for comparison (lower is better)
   */
  static getRoleLevel(role: UserRole): number {
    return role;
  }

  /**
   * Check if user role is at least the required role
   * Lower numbers = higher privilege
   */
  static hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return this.getRoleLevel(userRole) <= this.getRoleLevel(requiredRole);
  }
}
