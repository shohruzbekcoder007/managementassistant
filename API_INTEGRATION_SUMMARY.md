# Complete API Integration Summary

## 📊 Overview
Loyihada to'liq CRUD operatsiyalari uchun 6 ta asosiy modul integratsiya qilingan:

1. **Authentication** - Login/Register
2. **User** - Foydalanuvchi ma'lumotlari
3. **Role** - Role tayinlash va boshqarish
4. **Address** - Manzillar (ko'p tilli, ierarxik)
5. **Category** - Kategoriyalar (ko'p tilli)
6. **Company** - Kompaniyalar (ierarxik)

## 🎯 Available RTK Query Hooks

### Authentication & User
```typescript
useLoginMutation()
useSignupMutation()
useGetCurrentUserQuery()
useLazyGetCurrentUserQuery()
```

### Role Management
```typescript
useCreateRoleMutation()
useGetRoleListQuery()
useGetRoleDetailQuery()
useUpdateRoleMutation()
useDeleteRoleMutation()
```

### Address Management
```typescript
useCreateAddressMutation()
useGetAddressListQuery()          // Paginated
useGetAddressDetailQuery()        // By UUID
useGetAddressByCodeQuery()        // By code number
useUpdateAddressMutation()
useDeleteAddressMutation()
```

### Category Management
```typescript
useCreateCategoryMutation()
useGetCategoryListQuery()         // Paginated
useGetCategoryDetailQuery()
useUpdateCategoryMutation()
useDeleteCategoryMutation()
```

### Company Management
```typescript
useCreateCompanyMutation()
useGetCompanyListQuery()          // Paginated
useGetCompanyDetailQuery()
useUpdateCompanyMutation()
useDeleteCompanyMutation()
```

## ✨ Key Features

### 1. Multi-Language Support (i18n)
Address va Category ko'p tilli qo'llab-quvvatlaydi:

```typescript
interface MultiLangText {
  en?: string;  // English
  ru?: string;  // Russian
  uz?: string;  // Uzbek
}

const address = {
  name: {
    en: "Tashkent",
    ru: "Ташкент",
    uz: "Toshkent"
  }
};
```

### 2. Pagination Support
Barcha list endpoint'larda pagination mavjud:

```typescript
const { data } = useGetAddressListQuery({ 
  page: 1, 
  limit: 10 
});

console.log(data.total);  // Jami elementlar soni
console.log(data.items);  // Joriy sahifa elementlari
console.log(data.page);   // Joriy sahifa raqami
console.log(data.size);   // Sahifa o'lchami
```

### 3. Hierarchical Data (Parent-Child)
Address va Company ierarxik tuzilmaga ega:

```typescript
interface Address {
  uuid: string;
  parent_id: string | null;
  parent?: Address | null;
  children?: Address[];
}

// Example: Uzbekistan -> Tashkent -> Districts
```

### 4. Automatic Cache Management
RTK Query avtomatik cache invalidation:

- Create mutation → Invalidates list
- Update mutation → Invalidates specific item + list
- Delete mutation → Invalidates list

### 5. Type Safety
To'liq TypeScript qo'llab-quvvatlash:

```typescript
// Request types
CreateAddressRequest
UpdateCategoryRequest
CreateCompanyRequest

// Response types
AddressListResponse
CategoryListResponse
CompanyListResponse

// Common types
PaginatedResponse<T>
MultiLangText
```

## 🚀 Quick Usage Examples

### Address with Multi-Language
```typescript
const [createAddress] = useCreateAddressMutation();

await createAddress({
  name: {
    en: "Uzbekistan",
    ru: "Узбекистан",
    uz: "O'zbekiston"
  },
  code: 100,
  parent_id: undefined
});
```

### Category with Description
```typescript
const [createCategory] = useCreateCategoryMutation();

await createCategory({
  name: {
    en: "Electronics",
    uz: "Elektronika"
  },
  description: {
    en: "Devices and gadgets",
    uz: "Qurilmalar va gadjetlar"
  }
});
```

### Company with Relations
```typescript
const [createCompany] = useCreateCompanyMutation();

await createCompany({
  name: "My Company",
  tax_id: "123456789",
  email: "info@company.uz",
  mobile: "+998901234567",
  address_id: "tashkent-uuid",
  parent_id: "parent-company-uuid" // Optional
});
```

### Lazy Queries (Manual Trigger)
```typescript
const [trigger, { data, isLoading }] = useLazyGetAddressListQuery();

// Call manually when needed
const loadAddresses = () => {
  trigger({ page: 1, limit: 10 });
};
```

## 📁 File Structure

```
src/
├── config/
│   └── api_urls.ts                    # All API endpoints
├── types/
│   ├── auth.types.ts                  # Auth & User types
│   ├── role.types.ts                  # Role types
│   └── common.types.ts                # Address, Category, Company types
└── store/
    └── api/
        └── apiSlice.ts                # RTK Query API definitions
```

## 🌐 API Base URL

```typescript
// Development
http://tourmad.uz:8080/api/v1

// Configured in .env
VITE_API_BASE_URL=http://tourmad.uz:8080
VITE_API_VERSION=v1
```

## ⚡ Performance Optimization

### 1. Automatic Caching
RTK Query avtomatik cache'laydi, bir xil request qayta yuborilmaydi.

### 2. Background Refetching
Ma'lumotlar background'da yangilanadi.

### 3. Optimistic Updates
UI darhol yangilanadi, keyin server response kutiladi.

### 4. Request Deduplication
Bir vaqtning o'zida bir xil requestlar birlashtiriadi.

## 📋 Available Endpoints

| Module | Endpoints | Methods |
|--------|-----------|---------|
| **Auth** | /auth/signin, /auth/signup | POST |
| **User** | /user/me | GET |
| **Role** | /role/create, /role/list, /role/detail/{id}, /role/update/{id} | POST, GET, PATCH |
| **Address** | /address/create, /address/list, /address/detail/{id}, /address/detail-by-code/{code}, /address/update/{id} | POST, GET, PATCH |
| **Category** | /category/create, /category/list, /category/detail/{id}, /category/update/{id} | POST, GET, PATCH |
| **Company** | /company/create, /company/list, /company/detail/{id}, /company/update/{id} | POST, GET, PATCH |

**Total:** 20+ endpoints with full CRUD support ✅

## 📚 Documentation Files

- **API_USAGE_EXAMPLES.md** - Barcha API'lardan foydalanish misollari
- **RBAC_DOCUMENTATION.md** - Role-based access control tizimi
- **RBAC_SUMMARY.md** - Bu fayl, qisqacha summary

---

**Last Updated:** November 5, 2025  
**Status:** Production Ready ✨  
**Backend:** http://tourmad.uz:8080/api/v1
