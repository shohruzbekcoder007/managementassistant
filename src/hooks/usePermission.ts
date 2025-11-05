import { useAppSelector } from '../store/hooks';
import type { Permission, UserRole } from '../types/auth.types';
import { PermissionService } from '../services/permission.service';

/**
 * Custom hook for checking user permissions
 * Usage: const { hasPermission, hasAnyPermission, hasAllPermissions, permissions } = usePermission();
 */
export const usePermission = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const userRole = useAppSelector((state) => state.auth.user?.role);

  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permissionKey: keyof Permission): boolean => {
    return PermissionService.hasPermission(permissions, permissionKey);
  };

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = (permissionKeys: Array<keyof Permission>): boolean => {
    return PermissionService.hasAnyPermission(permissions, permissionKeys);
  };

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = (permissionKeys: Array<keyof Permission>): boolean => {
    return PermissionService.hasAllPermissions(permissions, permissionKeys);
  };

  /**
   * Check if user has minimum required role
   */
  const hasMinimumRole = (requiredRole: UserRole): boolean => {
    if (userRole === undefined || userRole === null) return false;
    return PermissionService.hasMinimumRole(userRole, requiredRole);
  };

  return {
    permissions,
    userRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasMinimumRole,
  };
};
