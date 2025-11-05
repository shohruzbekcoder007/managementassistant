import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { usePermission } from '../../hooks/usePermission';
import type { Permission, UserRole } from '../../types/auth.types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: keyof Permission;
  requiredPermissions?: Array<keyof Permission>;
  requireAllPermissions?: boolean; // If true, user must have ALL permissions, otherwise ANY
  requiredRole?: UserRole;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Wraps routes that require authentication and/or specific permissions
 * 
 * Usage examples:
 * <ProtectedRoute requiredPermission="canAddExpense">
 *   <ExpenseForm />
 * </ProtectedRoute>
 * 
 * <ProtectedRoute requiredPermissions={["canManageUsers", "canManageRoles"]} requireAllPermissions>
 *   <AdminPanel />
 * </ProtectedRoute>
 * 
 * <ProtectedRoute requiredRole={UserRole.ADMIN}>
 *   <Dashboard />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  requiredPermission,
  requiredPermissions,
  requireAllPermissions = false,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { hasPermission, hasAnyPermission, hasAllPermissions, hasMinimumRole } = usePermission();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role requirement
  if (requiredRole !== undefined && !hasMinimumRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check single permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check multiple permissions requirement
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};
