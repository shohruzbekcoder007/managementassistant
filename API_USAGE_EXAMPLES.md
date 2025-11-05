# API Usage Examples

Bu fayl loyihadagi API endpoint'lardan qanday foydalanishni ko'rsatadi.

## Authentication APIs

### Login
```typescript
import { useLoginMutation } from '../store/api/apiSlice';

const LoginComponent = () => {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        email: 'user@example.com',
        password: 'password123'
      }).unwrap();
      
      // Result contains: access_token, refresh_token, user
      console.log('Logged in:', result);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
};
```

### Register
```typescript
import { useSignupMutation } from '../store/api/apiSlice';

const RegisterComponent = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const handleRegister = async () => {
    try {
      const result = await signup({
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        phone_number: '+998901234567',
        email: 'john@example.com',
        password: 'password123',
        confirmed_password: 'password123'
      }).unwrap();
      
      console.log('Registered:', result);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
};
```

## User APIs

### Get Current User
```typescript
import { useGetCurrentUserQuery } from '../store/api/apiSlice';

const ProfileComponent = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return (
    <div>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};
```

### Lazy Query (Manual Trigger)
```typescript
import { useLazyGetCurrentUserQuery } from '../store/api/apiSlice';

const Component = () => {
  const [trigger, { data, isLoading }] = useLazyGetCurrentUserQuery();
  
  const loadUser = () => {
    trigger(); // Manually trigger the query
  };
  
  return <button onClick={loadUser}>Load User</button>;
};
```

## Role Management APIs

### Create Role Assignment
```typescript
import { useCreateRoleMutation } from '../store/api/apiSlice';
import { UserRole } from '../types/auth.types';

const AssignRoleComponent = () => {
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const handleAssignRole = async () => {
    try {
      const result = await createRole({
        role: UserRole.ADMIN,
        user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        company_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      }).unwrap();
      
      console.log('Role assigned:', result);
    } catch (error) {
      console.error('Failed to assign role:', error);
    }
  };
};
```

### Get Role List (Paginated)
```typescript
import { useGetRoleListQuery } from '../store/api/apiSlice';

const RoleListComponent = () => {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useGetRoleListQuery({ 
    page, 
    limit: 10 
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading roles</div>;
  
  return (
    <div>
      <h2>Total Roles: {data.count}</h2>
      {data.results.map(role => (
        <div key={role.id}>
          User: {role.user_id} - Role: {role.role}
        </div>
      ))}
      
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(p => p + 1)} disabled={!data.next}>
        Next
      </button>
    </div>
  );
};
```

### Get Role Detail
```typescript
import { useGetRoleDetailQuery } from '../store/api/apiSlice';

const RoleDetailComponent = ({ roleId }: { roleId: string }) => {
  const { data: role, isLoading, error } = useGetRoleDetailQuery(roleId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading role details</div>;
  
  return (
    <div>
      <h2>Role Details</h2>
      <p>User: {role.user?.email}</p>
      <p>Company: {role.company?.name}</p>
      <p>Role: {role.role}</p>
    </div>
  );
};
```

### Update Role
```typescript
import { useUpdateRoleMutation } from '../store/api/apiSlice';
import { UserRole } from '../types/auth.types';

const UpdateRoleComponent = ({ roleId }: { roleId: string }) => {
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const handleUpdate = async () => {
    try {
      const result = await updateRole({
        id: roleId,
        data: {
          role: UserRole.OWNER,
          user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          company_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        }
      }).unwrap();
      
      console.log('Role updated:', result);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };
};
```

### Delete Role
```typescript
import { useDeleteRoleMutation } from '../store/api/apiSlice';

const DeleteRoleComponent = ({ roleId }: { roleId: string }) => {
  const [deleteRole, { isLoading }] = useDeleteRoleMutation();

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return;
    
    try {
      await deleteRole(roleId).unwrap();
      console.log('Role deleted successfully');
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };
};
```

## Advanced Usage

### Refetch Data Manually
```typescript
const { data, refetch } = useGetRoleListQuery({ page: 1, limit: 10 });

// Manually refetch when needed
const handleRefresh = () => {
  refetch();
};
```

### Optimistic Updates
```typescript
const [updateRole] = useUpdateRoleMutation();

const handleOptimisticUpdate = async () => {
  try {
    // The cache will be updated automatically
    await updateRole({ id: '123', data: { role: UserRole.ADMIN, ... } }).unwrap();
  } catch (error) {
    // Error will rollback the cache automatically
  }
};
```

### Query Filtering
```typescript
// Filter by user
const { data } = useGetRoleListQuery({ 
  user_id: 'user-123',
  page: 1, 
  limit: 10 
});

// Filter by company
const { data } = useGetRoleListQuery({ 
  company_id: 'company-456',
  page: 1, 
  limit: 10 
});

// Filter by role
const { data } = useGetRoleListQuery({ 
  role: UserRole.ADMIN,
  page: 1, 
  limit: 10 
});
```

## Error Handling

### Global Error Handling
```typescript
try {
  const result = await mutation(data).unwrap();
  // Success
} catch (error: any) {
  if (error.status === 401) {
    // Unauthorized - redirect to login
  } else if (error.status === 403) {
    // Forbidden - show permission error
  } else if (error.status === 404) {
    // Not found
  } else {
    // Other errors
    console.error(error.data?.message || 'Unknown error');
  }
}
```

### With Toast Notifications
```typescript
import { ToastService } from '../services/toast.service';

const handleApiCall = async () => {
  try {
    await createRole(data).unwrap();
    ToastService.success('Role muvaffaqiyatli yaratildi');
  } catch (error: any) {
    ToastService.error(error.data?.message || 'Xatolik yuz berdi');
  }
};
```

## Cache Invalidation

RTK Query avtomatik cache invalidation ishlatadi:

- `createRole` mutation → Invalidates `['Role']` tag → Auto-refetch all role queries
- `updateRole` mutation → Invalidates specific role and all roles → Refetch affected queries
- `deleteRole` mutation → Invalidates `['Role']` tag → Refetch role lists

## API Endpoints

Barcha endpoint'lar `src/config/api_urls.ts` faylida saqlanadi:

```typescript
import { API_URLS } from '../config/api_urls';

console.log(API_URLS.AUTH.SIGNIN);     // /api/v1/auth/signin
console.log(API_URLS.USER.ME);         // /api/v1/user/me
console.log(API_URLS.ROLE.CREATE);     // /api/v1/role/create/
console.log(API_URLS.ROLE.DETAIL('id')); // /api/v1/role/detail/id/
```
