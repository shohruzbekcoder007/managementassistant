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

console.log(API_URLS.AUTH.SIGNIN);        // /api/v1/auth/signin
console.log(API_URLS.USER.ME);            // /api/v1/user/me
console.log(API_URLS.ROLE.CREATE);        // /api/v1/role/create/
console.log(API_URLS.ADDRESS.CREATE);     // /api/v1/address/create/
console.log(API_URLS.CATEGORY.LIST);      // /api/v1/category/list/
console.log(API_URLS.COMPANY.DETAIL('id')); // /api/v1/company/detail/id/
```

## Address Management APIs

### Create Address
```typescript
import { useCreateAddressMutation } from '../store/api/apiSlice';

const CreateAddressComponent = () => {
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const handleCreate = async () => {
    try {
      const result = await createAddress({
        name: {
          en: "Uzbekistan",
          ru: "Узбекистан",
          uz: "O'zbekiston"
        },
        code: 100,
        parent_id: undefined // Optional
      }).unwrap();
      
      console.log('Address created:', result);
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };
};
```

### Get Address List
```typescript
import { useGetAddressListQuery } from '../store/api/apiSlice';

const AddressListComponent = () => {
  const { data, isLoading } = useGetAddressListQuery({ page: 1, limit: 10 });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Total: {data?.total}</h2>
      {data?.items.map(address => (
        <div key={address.uuid}>
          <h3>{address.name.uz || address.name.en}</h3>
          <p>Code: {address.code}</p>
          {address.children && <p>Children: {address.children.length}</p>}
        </div>
      ))}
    </div>
  );
};
```

### Get Address by UUID
```typescript
import { useGetAddressDetailQuery } from '../store/api/apiSlice';

const AddressDetailComponent = ({ addressId }: { addressId: string }) => {
  const { data: address, isLoading } = useGetAddressDetailQuery(addressId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{address?.name.uz}</h2>
      <p>Code: {address?.code}</p>
      {address?.parent && <p>Parent: {address.parent.name.uz}</p>}
    </div>
  );
};
```

### Get Address by Code
```typescript
import { useGetAddressByCodeQuery } from '../store/api/apiSlice';

const AddressByCodeComponent = () => {
  const { data: address } = useGetAddressByCodeQuery(100); // Uzbekistan
  
  return <div>{address?.name.uz}</div>;
};
```

### Update Address
```typescript
import { useUpdateAddressMutation } from '../store/api/apiSlice';

const UpdateAddressComponent = ({ addressId }: { addressId: string }) => {
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const handleUpdate = async () => {
    try {
      await updateAddress({
        id: addressId,
        data: {
          name: {
            en: "Tashkent City",
            ru: "Город Ташкент",
            uz: "Toshkent shahri"
          },
          code: 100100
        }
      }).unwrap();
      
      console.log('Address updated');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
};
```

## Category Management APIs

### Create Category
```typescript
import { useCreateCategoryMutation } from '../store/api/apiSlice';

const CreateCategoryComponent = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleCreate = async () => {
    try {
      const result = await createCategory({
        name: {
          en: "Electronics",
          ru: "Электроника",
          uz: "Elektronika"
        },
        description: {
          en: "Devices and gadgets",
          ru: "Устройства и гаджеты",
          uz: "Qurilmalar va gadjetlar"
        }
      }).unwrap();
      
      console.log('Category created:', result);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };
};
```

### Get Category List
```typescript
import { useGetCategoryListQuery } from '../store/api/apiSlice';

const CategoryListComponent = () => {
  const { data, isLoading } = useGetCategoryListQuery({ page: 1, limit: 10 });
  
  return (
    <div>
      <h2>Categories ({data?.total})</h2>
      {data?.items.map(category => (
        <div key={category.uuid}>
          <h3>{category.name.uz}</h3>
          <p>{category.description.uz}</p>
        </div>
      ))}
    </div>
  );
};
```

### Get Category Detail
```typescript
import { useGetCategoryDetailQuery } from '../store/api/apiSlice';

const CategoryDetailComponent = ({ categoryId }: { categoryId: string }) => {
  const { data: category, isLoading } = useGetCategoryDetailQuery(categoryId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{category?.name.en}</h2>
      <p>{category?.description.en}</p>
    </div>
  );
};
```

### Update Category
```typescript
import { useUpdateCategoryMutation } from '../store/api/apiSlice';

const UpdateCategoryComponent = ({ categoryId }: { categoryId: string }) => {
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdate = async () => {
    await updateCategory({
      id: categoryId,
      data: {
        name: {
          en: "Updated Electronics",
          ru: "Обновленная электроника",
          uz: "Yangilangan elektronika"
        }
      }
    }).unwrap();
  };
};
```

## Company Management APIs

### Create Company
```typescript
import { useCreateCompanyMutation } from '../store/api/apiSlice';

const CreateCompanyComponent = () => {
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const handleCreate = async () => {
    try {
      const result = await createCompany({
        name: "O'zbekiston Respublikasi Milliy statistika qo'mitasi",
        tax_id: "200523428",
        mobile: "+998332150548",
        email: "info@stat.uz",
        address_id: "a9f5d7f1-8764-486a-9697-f0aa4ff02344"
      }).unwrap();
      
      console.log('Company created:', result);
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };
};
```

### Get Company List
```typescript
import { useGetCompanyListQuery } from '../store/api/apiSlice';

const CompanyListComponent = () => {
  const { data, isLoading } = useGetCompanyListQuery({ page: 1, limit: 10 });
  
  return (
    <div>
      <h2>Companies ({data?.total})</h2>
      {data?.items.map(company => (
        <div key={company.uuid}>
          <h3>{company.name}</h3>
          <p>Tax ID: {company.tax_id}</p>
          <p>Email: {company.email}</p>
          <p>Mobile: {company.mobile}</p>
          {company.address && <p>Address: {company.address.name.uz}</p>}
          {company.children && <p>Child Companies: {company.children.length}</p>}
        </div>
      ))}
    </div>
  );
};
```

### Get Company Detail
```typescript
import { useGetCompanyDetailQuery } from '../store/api/apiSlice';

const CompanyDetailComponent = ({ companyId }: { companyId: string }) => {
  const { data: company, isLoading } = useGetCompanyDetailQuery(companyId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{company?.name}</h2>
      <p>Tax ID: {company?.tax_id}</p>
      <p>Contact: {company?.email} / {company?.mobile}</p>
      {company?.parent && <p>Parent Company: {company.parent.name}</p>}
      {company?.address && (
        <p>Location: {company.address.name.uz} (Code: {company.address.code})</p>
      )}
    </div>
  );
};
```

### Update Company
```typescript
import { useUpdateCompanyMutation } from '../store/api/apiSlice';

const UpdateCompanyComponent = ({ companyId }: { companyId: string }) => {
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const handleUpdate = async () => {
    try {
      await updateCompany({
        id: companyId,
        data: {
          name: "Updated Company Name",
          email: "newemail@company.uz",
          mobile: "+998901234567"
        }
      }).unwrap();
      
      console.log('Company updated');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
};
```

## Multi-Language Support

All entities (Address, Category) support multi-language fields:

```typescript
// Creating with multiple languages
const multiLangName = {
  en: "Tashkent",      // English
  ru: "Ташкент",       // Russian
  uz: "Toshkent"       // Uzbek
};

// Accessing in different languages
const displayName = address.name.uz || address.name.en || address.name.ru;

// Conditional rendering based on language
const currentLang = 'uz';
const categoryName = category.name[currentLang];
```

## Hierarchical Data (Parent-Child)

Address and Company support hierarchical relationships:

```typescript
// Create child address
await createAddress({
  name: { uz: "Toshkent shahri" },
  code: 100100,
  parent_id: "uzbekistan-uuid" // Link to parent
});

// Access parent/children
const address = useGetAddressDetailQuery(id);
console.log(address.parent?.name.uz);          // Parent name
console.log(address.children?.length);         // Number of children

// Create child company
await createCompany({
  name: "Branch Office",
  parent_id: "main-office-uuid",
  // ... other fields
});
```
