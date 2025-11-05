# Role-Based Access Control (RBAC) System Documentation

## Overview
This application implements a comprehensive Role-Based Access Control (RBAC) system to manage user permissions and access levels across the financial management platform.

## User Roles

The system defines 6 distinct roles with hierarchical access levels:

| Role | Enum Value | Description | Access Level |
|------|-----------|-------------|--------------|
| **USER** | 0 | Regular user | Basic access |
| **ADMIN** | 10 | Administrator | User management |
| **OWNER** | 20 | Business owner | Almost full access |
| **ACCOUNTANT** | 30 | Financial accountant | Financial data management |
| **SUPERADMIN** | 40 | Super administrator | Full system access |
| **GUEST** | 90 | Guest user | Read-only access |

**Note:** Lower role numbers indicate higher privilege levels.

## Permissions Matrix

| Permission | USER | ADMIN | OWNER | ACCOUNTANT | SUPERADMIN | GUEST |
|-----------|------|-------|-------|------------|------------|-------|
| canViewDashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| canAddExpense | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| canEditExpense | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| canDeleteExpense | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| canViewReports | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| canManageUsers | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ |
| canManageRoles | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| canViewAIInsights | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| canExportData | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |

## Implementation

### 1. Type Definitions (`src/types/auth.types.ts`)

```typescript
// User Roles
export const UserRole = {
  USER: 0,
  ADMIN: 10,
  OWNER: 20,
  ACCOUNTANT: 30,
  SUPERADMIN: 40,
  GUEST: 90,
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Permissions Interface
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
```

### 2. Permission Service (`src/services/permission.service.ts`)

The `PermissionService` class provides methods for:
- Getting permissions by role: `getPermissionsByRole(role: UserRole): Permission`
- Checking specific permissions: `hasPermission(permissions, key)`
- Checking multiple permissions: `hasAnyPermission()`, `hasAllPermissions()`
- Role level comparison: `hasMinimumRole(userRole, requiredRole)`

### 3. usePermission Hook (`src/hooks/usePermission.ts`)

Custom React hook for easy permission checks in components:

```typescript
const { hasPermission, hasAnyPermission, hasAllPermissions, hasMinimumRole } = usePermission();

// Check single permission
if (hasPermission('canAddExpense')) {
  // Show add expense button
}

// Check multiple permissions (any)
if (hasAnyPermission(['canManageUsers', 'canManageRoles'])) {
  // Show admin panel
}

// Check role level
if (hasMinimumRole(UserRole.ADMIN)) {
  // Show admin features
}
```

### 4. Protected Routes (`src/components/ProtectedRoute`)

Wrap routes that require authentication or specific permissions:

```typescript
// Require authentication only
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Require specific permission
<ProtectedRoute requiredPermission="canAddExpense">
  <ExpenseForm />
</ProtectedRoute>

// Require multiple permissions (any)
<ProtectedRoute requiredPermissions={["canManageUsers", "canViewReports"]}>
  <UserManagement />
</ProtectedRoute>

// Require all permissions
<ProtectedRoute 
  requiredPermissions={["canManageUsers", "canManageRoles"]} 
  requireAllPermissions
>
  <AdminPanel />
</ProtectedRoute>

// Require minimum role
<ProtectedRoute requiredRole={UserRole.ADMIN}>
  <AdminDashboard />
</ProtectedRoute>
```

### 5. Redux Integration

Permissions are automatically calculated when user logs in:

```typescript
// In authSlice.ts
setCredentials: (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  // Auto-calculate permissions based on role
  state.permissions = PermissionService.getPermissionsByRole(action.payload.user.role);
}
```

## AI Expense Tracking

### AIExpenseInput Component (`src/components/AIExpenseInput`)

AI-powered expense input that supports:
- **Text input**: Users type expense descriptions
- **Audio input**: Users record voice messages about expenses
- **Automatic permission checking**: Only users with `canAddExpense` permission can use it

#### Features:
1. Natural language processing for expense categorization
2. Voice recording with real-time timer
3. Audio preview before submission
4. Permission-based access control
5. Loading states during AI processing

#### Usage Example:

```typescript
import { AIExpenseInput } from '../../components/AIExpenseInput';

const handleExpenseSubmit = async (message: string, audioBlob?: Blob) => {
  // Process the expense with AI
  const formData = new FormData();
  formData.append('message', message);
  if (audioBlob) {
    formData.append('audio', audioBlob);
  }
  
  await api.post('/expenses/ai', formData);
};

<AIExpenseInput 
  onSubmit={handleExpenseSubmit}
  isLoading={isSubmitting}
/>
```

#### Example Messages:
- "Tushlik uchun 45,000 so'm sarfladim"
- "Taksi haqi - 30,000 so'm, Chilonzor tumani"
- "Yangi klaviatura sotib oldim 350,000 so'mga"
- "Ofis uchun qahva va choy - 180,000 so'm"

## Best Practices

### 1. Component-Level Protection
```typescript
const MyComponent = () => {
  const { hasPermission } = usePermission();
  
  return (
    <div>
      {hasPermission('canAddExpense') && (
        <button>Add Expense</button>
      )}
      {hasPermission('canManageUsers') && (
        <UserManagementPanel />
      )}
    </div>
  );
};
```

### 2. Conditional Rendering
```typescript
const Dashboard = () => {
  const { permissions, userRole } = usePermission();
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Show based on permission */}
      {permissions?.canViewReports && <ReportsSection />}
      
      {/* Show based on role */}
      {userRole === UserRole.SUPERADMIN && <SystemSettings />}
    </div>
  );
};
```

### 3. API Protection
```typescript
// Always check permissions before API calls
const deleteExpense = async (id: string) => {
  const { hasPermission } = usePermission();
  
  if (!hasPermission('canDeleteExpense')) {
    ToastService.error('Sizda xarajatni o\'chirish huquqi yo\'q');
    return;
  }
  
  try {
    await api.delete(`/expenses/${id}`);
    ToastService.success('Xarajat o\'chirildi');
  } catch (error) {
    ToastService.error('Xatolik yuz berdi');
  }
};
```

## Security Considerations

1. **Client-side checks are NOT sufficient**: Always validate permissions on the backend
2. **Token-based authentication**: Ensure JWT tokens include role information
3. **Permission refresh**: Re-fetch permissions after role changes
4. **Audit logging**: Log permission-based actions for security audits
5. **Least privilege principle**: Grant minimum permissions necessary

## Future Enhancements

- [ ] Dynamic permission assignment per user (override role defaults)
- [ ] Time-based permissions (temporary access)
- [ ] Permission groups/templates
- [ ] Permission history and audit trail
- [ ] Advanced AI expense categorization with machine learning
- [ ] Multi-language support for AI expense input
- [ ] Expense receipt OCR integration
- [ ] Budget limit warnings based on AI predictions

## API Integration

### Expected Backend Response Structure

```typescript
// Login/Signup Response
{
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+998901234567",
    "role": 0, // UserRole enum value
    "permissions": { // Optional, will be calculated if not provided
      "canViewDashboard": true,
      "canAddExpense": true,
      // ... other permissions
    }
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: User can see protected content after logout
**Solution**: Clear Redux state and localStorage on logout

**Issue**: Permissions not updating after role change
**Solution**: Re-fetch user data or refresh the authentication token

**Issue**: AI expense input not working
**Solution**: Check browser microphone permissions and HTTPS requirement

## Testing

### Unit Tests
```typescript
// Test permission calculation
describe('PermissionService', () => {
  it('should grant full access to SUPERADMIN', () => {
    const permissions = PermissionService.getPermissionsByRole(UserRole.SUPERADMIN);
    expect(permissions.canManageRoles).toBe(true);
  });
  
  it('should restrict GUEST user', () => {
    const permissions = PermissionService.getPermissionsByRole(UserRole.GUEST);
    expect(permissions.canAddExpense).toBe(false);
  });
});
```

### Integration Tests
```typescript
// Test protected routes
describe('ProtectedRoute', () => {
  it('should redirect unauthenticated users', () => {
    // Test implementation
  });
  
  it('should show unauthorized page for insufficient permissions', () => {
    // Test implementation
  });
});
```

---

**Last Updated**: $(date)
**Version**: 1.0.0
**Authors**: Development Team
