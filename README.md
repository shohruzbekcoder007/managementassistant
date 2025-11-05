# Management Assistant

Modern React loyihasi - SOLID tamoyillari va Redux Toolkit asosida qurilgan to'liq autentifikatsiya tizimi.

## 🚀 Xususiyatlar

- ✅ **Real API Integration** - http://tourmad.uz:8080 backend bilan
- ✅ **Redux Toolkit & RTK Query** - State management va API calls
- ✅ **React Toastify** - User-friendly notifications
- ✅ **SOLID Principles** - Clean Architecture
- ✅ **TypeScript** - To'liq type safety
- ✅ **Modern React Hooks** - Custom hooks va best practices
- ✅ **Form Validation** - Client-side validatsiya
- ✅ **SCSS Modules** - Component-scoped styling
- ✅ **React Router** - SPA routing

## 🏗️ Loyiha Strukturasi

```
src/
├── components/          # Qayta ishlatiladigan komponentlar
│   ├── Button/
│   ├── FormInput/
│   ├── Sidebar/
│   └── ContextContainer/
├── pages/              # Sahifalar
│   ├── Login/          # Login sahifasi (signin API)
│   ├── Register/       # Register sahifasi (signup API)
│   ├── Main/
│   └── NotFound/
├── store/              # Redux store
│   ├── api/
│   │   └── apiSlice.ts      # RTK Query API definitions
│   ├── slices/
│   │   └── authSlice.ts     # Auth state management
│   ├── store.ts             # Store configuration
│   └── hooks.ts             # Typed Redux hooks
├── services/           # Business logic
│   ├── auth.service.ts      # Auth utilities
│   ├── validation.service.ts # Validation logic
│   └── toast.service.ts     # Toast notifications
├── config/             # Configuration files
│   ├── env.config.ts        # Environment variables
│   ├── axios.config.ts      # Axios instance
│   └── api_urls.ts          # API endpoints (centralized)
├── hooks/              # Custom React hooks
│   └── useAuthForm.ts
├── types/              # TypeScript definitions
│   └── auth.types.ts
├── router/             # Routing
│   └── router.tsx
└── assets/             # Styles va boshqalar
    └── styles/
```

## 🎯 SOLID Tamoyillari

### 1. Single Responsibility Principle (SRP)
- **ValidationService**: Faqat validatsiya logikasi
- **AuthService**: Faqat token management
- **apiSlice**: Faqat API calls (RTK Query)
- **authSlice**: Faqat auth state management

### 2. Open/Closed Principle (OCP)
- Komponentlar props orqali kengaytiriladi
- RTK Query endpoints osongina qo'shiladi
- Service classlar inheritance uchun ochiq

### 3. Liskov Substitution Principle (LSP)
- Interfacelar va types orqali consistency
- TypeScript type checking

### 4. Interface Segregation Principle (ISP)
- Har bir interface faqat kerakli propertylar
- LoginRequest, SignupRequest alohida

### 5. Dependency Inversion Principle (DIP)
- Redux store - centralized state
- RTK Query - API abstraction layer
- Service layer separation

## 🛠️ Texnologiyalar

- **React 19** - UI library
- **TypeScript 5.8** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching va caching
- **React Router DOM 7** - Routing
- **React Toastify** - Toast notifications
- **Axios** - HTTP client
- **SCSS Modules** - Styling
- **Vite 7** - Build tool

## 📦 O'rnatish va Ishga Tushirish

### 1. Paketlarni o'rnatish
```bash
npm install
```

### 2. Environment o'rnatish
`.env` fayl yarating (yoki `.env.example`dan nusxa oling):
```env
VITE_API_BASE_URL=http://tourmad.uz:8080
VITE_API_URL=/api/v1
```

### 3. Development server
```bash
npm run dev
```

### 4. Production build
```bash
npm run build
npm run preview
```

## 🔐 API Endpointlar

Barcha API URLlar `src/config/api_urls.ts` faylida markazlashtirilgan.

### Login (POST)
```
URL: http://tourmad.uz:8080/api/v1/auth/signin
Payload: {
  "email": "user@example.com",
  "password": "string"
}
Response: {
  "access_token": "jwt_token",
  "refresh_token": "refresh_token",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "first_name": "string",
    "last_name": "string"
  }
}
```

### Signup (POST)
```
URL: http://tourmad.uz:8080/api/v1/auth/signup
Payload: {
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "phone_number": "string",
  "email": "user@example.com",
  "password": "string",
  "confirmed_password": "string"
}
Response: Same as login
```

### API URLs Usage
```typescript
import { AUTH_ENDPOINTS, API_URLS } from './config/api_urls';

// Direct access
AUTH_ENDPOINTS.SIGNIN  // '/auth/signin'
AUTH_ENDPOINTS.SIGNUP  // '/auth/signup'

// Full URLs
API_URLS.AUTH.SIGNIN   // '/api/v1/auth/signin'
API_URLS.AUTH.SIGNUP   // '/api/v1/auth/signup'
```

## 🎨 Komponentlar

### FormInput
Qayta ishlatiladigan input komponenti:
```tsx
<FormInput
  label="Email"
  type="email"
  value={value}
  onChange={handleChange}
  error={error}
  placeholder="Enter email"
  required
/>
```

### Button
Qayta ishlatiladigan button komponenti:
```tsx
<Button
  type="submit"
  variant="primary"
  fullWidth
  isLoading={isLoading}
>
  Submit
</Button>
```

## 📝 Redux Store

### State Structure
```typescript
{
  api: {
    queries: {...},
    mutations: {...}
  },
  auth: {
    user: UserData | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  }
}
```

### RTK Query Hooks
```typescript
// Login
const [login, { isLoading }] = useLoginMutation();

// Signup  
const [signup, { isLoading }] = useSignupMutation();
```

### Auth Actions
```typescript
import { setCredentials, logout } from './store/slices/authSlice';

// Login qilish
dispatch(setCredentials({ user, token }));

// Logout qilish
dispatch(logout());
```

## 🚦 Routing

- `/` - Main sahifa
- `/login` - Login sahifasi
- `/register` - Register sahifasi  
- `*` - 404 Not Found

## 🔧 Configuration

### Environment Variables
- `VITE_API_BASE_URL` - Backend base URL
- `VITE_API_URL` - API path prefix

### Axios Configuration
- Automatic token injection
- 401 error handling (auto redirect to login)
- Request/Response interceptors
- Error handling

## 📱 Validatsiya

Client-side validatsiya quyidagilar uchun:
- Email format
- Password length (min 6 characters)
- Password confirmation match
- Username format (alphanumeric + underscore)
- Phone number format
- Required fields

## 🔒 Security Features

- JWT token storage in localStorage
- Automatic token injection in headers
- Auto logout on 401 errors
- Protected routes (kelajakda)
- Input validation

## 🔔 Notifications

### Toast Service
Markazlashtirilgan notification tizimi:

```typescript
import { ToastService, ToastMessages } from './services/toast.service';

// Success notification
ToastService.success('Operation successful!');

// Error notification
ToastService.error('Something went wrong!');

// Pre-configured messages
ToastService.success(ToastMessages.AUTH.LOGIN_SUCCESS);
ToastService.error(ToastMessages.AUTH.LOGIN_ERROR);

// Custom options
ToastService.info('Info message', { autoClose: 5000 });
```

### Toast Messages
Predefined xabarlar:
- **AUTH** - Login, Signup, Logout messages
- **VALIDATION** - Form validation messages
- **NETWORK** - Network error messages
- **GENERIC** - Generic success/error messages

## 📄 Litsenziya

MIT

## 👨‍💻 Muallif

Management Assistant Team
