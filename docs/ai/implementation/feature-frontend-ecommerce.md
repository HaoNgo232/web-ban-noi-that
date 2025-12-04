---
phase: implementation
title: Implementation Guide
description: Hướng dẫn kỹ thuật chi tiết để implement frontend ecommerce
feature: frontend-ecommerce
created: 2024-12-04
---

# Implementation Guide

## Development Setup

### Prerequisites

- Node.js 18+ (recommend 20 LTS)
- pnpm (package manager)
- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar) - for TS
- Backend API running at `http://localhost:3000`

### Environment Setup

1. **Clone repository và install dependencies:**

```bash
cd frontend
pnpm install
```

2. **Tạo file `.env`:**

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME="Furniture Shop"
```

3. **Start development server:**

```bash
pnpm dev
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Code Structure

### Directory Structure (Final)

```
frontend/src/
├── components/
│   ├── ui/                     # shadcn/ui components (auto-generated)
│   ├── layout/                 # Layout components
│   ├── products/               # Product domain components
│   ├── cart/                   # Cart domain components
│   ├── checkout/               # Checkout domain components
│   ├── auth/                   # Auth domain components
│   ├── home/                   # Homepage components
│   └── shared/                 # Shared/common components
├── pages/                      # Route page components
├── hooks/                      # Custom React hooks
├── stores/                     # Zustand stores
├── lib/
│   ├── api/                    # API client và services
│   ├── utils.ts                # Utility functions (shadcn)
│   ├── constants.ts            # App constants
│   └── formatters.ts           # Formatting functions
├── types/                      # TypeScript type definitions
├── routes/                     # React Router configuration
├── styles/                     # Global styles (nếu cần)
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Global CSS với Tailwind
```

### Naming Conventions

| Type             | Convention                   | Example                                  |
| ---------------- | ---------------------------- | ---------------------------------------- |
| Components       | PascalCase                   | `ProductCard.tsx`                        |
| Hooks            | camelCase với prefix `use`   | `useProducts.ts`                         |
| Stores           | camelCase với suffix `Store` | `cartStore.ts`                           |
| Types/Interfaces | PascalCase                   | `Product`, `CartItem`                    |
| API functions    | camelCase                    | `getProducts`, `createUser`              |
| Constants        | SCREAMING_SNAKE_CASE         | `API_BASE_URL`                           |
| CSS classes      | kebab-case                   | `product-card`                           |
| Files            | kebab-case hoặc PascalCase   | `use-products.ts` hoặc `ProductCard.tsx` |

## Implementation Notes

### Core Features Implementation

#### 1. Axios Instance với Interceptors

```typescript
// src/lib/api/index.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { API_BASE_URL } from "@/lib/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Thêm Authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          // Gọi refresh token API
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          useAuthStore.getState().setAccessToken(accessToken);

          // Retry original request với token mới
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed - logout
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
```

#### 2. Zustand Store với Persist

```typescript
// src/stores/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  updatedAt: string;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed (implemented as getters)
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      updatedAt: new Date().toISOString(),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
              updatedAt: new Date().toISOString(),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                product,
                quantity,
                addedAt: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
          updatedAt: new Date().toISOString(),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
          updatedAt: new Date().toISOString(),
        }));
      },

      clearCart: () => {
        set({ items: [], updatedAt: new Date().toISOString() });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.discountPercentage
            ? item.product.price * (1 - item.product.discountPercentage / 100)
            : item.product.price;
          return total + price * item.quantity;
        }, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = subtotal > 5000000 ? 0 : 50000; // Free shipping over 5M
        return subtotal + shipping;
      },
    }),
    {
      name: "furniture-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        updatedAt: state.updatedAt,
      }),
    },
  ),
);
```

#### 3. TanStack Query Hook Pattern

```typescript
// src/hooks/useProducts.ts
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { productsApi } from "@/lib/api/products";
import type { ProductsQuery } from "@/types";

// Query keys factory
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductsQuery) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Hook for products list
export function useProducts(filters: ProductsQuery = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsApi.getAll(filters),
    placeholderData: keepPreviousData, // Giữ data cũ khi filter thay đổi
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for related products
export function useRelatedProducts(category: string, excludeId: string) {
  return useQuery({
    queryKey: [...productKeys.list({ category }), "related", excludeId],
    queryFn: async () => {
      const response = await productsApi.getAll({
        category: category as any,
        limit: 4,
        status: "ACTIVE",
      });
      return {
        ...response,
        data: response.data.filter((p) => p.id !== excludeId),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

#### 4. React Router v7 Configuration

```typescript
// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Lazy load pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("@/pages/OrderConfirmationPage"),
);
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "products",
        element: (
          <SuspenseWrapper>
            <ProductsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "products/:id",
        element: (
          <SuspenseWrapper>
            <ProductDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "cart",
        element: (
          <SuspenseWrapper>
            <CartPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "checkout",
        element: (
          <SuspenseWrapper>
            <CheckoutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "order-confirmation/:orderId",
        element: (
          <SuspenseWrapper>
            <OrderConfirmationPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper>
              <ProfilePage />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
```

#### 5. Form với React Hook Form + Zod

```typescript
// src/components/auth/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      },
      onError: (error) => {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </Form>
  );
}
```

### Patterns & Best Practices

#### Component Pattern: Compound Components

```typescript
// Example: Product filters với compound components
<ProductFilters>
  <ProductFilters.Category />
  <ProductFilters.PriceRange />
  <ProductFilters.Material />
  <ProductFilters.ClearButton />
</ProductFilters>
```

#### Custom Hook Pattern: useDisclosure

```typescript
// src/hooks/useDisclosure.ts
import { useState, useCallback } from "react";

export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

// Usage
const { isOpen, open, close } = useDisclosure();
<Sheet open={isOpen} onOpenChange={close}>
  ...
</Sheet>;
```

#### Error Handling Pattern

```typescript
// src/components/shared/QueryWrapper.tsx
import type { UseQueryResult } from "@tanstack/react-query";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";

interface QueryWrapperProps<T> {
  query: UseQueryResult<T>;
  children: (data: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export function QueryWrapper<T>({
  query,
  children,
  loadingComponent,
  errorComponent,
}: QueryWrapperProps<T>) {
  if (query.isLoading) {
    return loadingComponent ?? <LoadingSpinner />;
  }

  if (query.isError) {
    return (
      errorComponent ?? (
        <ErrorState message="Có lỗi xảy ra" onRetry={() => query.refetch()} />
      )
    );
  }

  if (!query.data) {
    return null;
  }

  return <>{children(query.data)}</>;
}

// Usage
<QueryWrapper query={productsQuery}>
  {(data) => <ProductGrid products={data.data} />}
</QueryWrapper>;
```

## Integration Points

### API Integration

| Feature        | API Endpoint       | Hook              | Notes                    |
| -------------- | ------------------ | ----------------- | ------------------------ |
| List products  | GET /products      | `useProducts()`   | With filters, pagination |
| Product detail | GET /products/:id  | `useProduct(id)`  | -                        |
| Login          | POST /auth/login   | `useLogin()`      | Mutation                 |
| Register       | POST /users        | `useRegister()`   | Mutation                 |
| Refresh token  | POST /auth/refresh | Axios interceptor | Auto-refresh             |
| Logout         | POST /auth/logout  | `useLogout()`     | Mutation                 |
| Get user       | GET /users/:id     | `useUser(id)`     | -                        |
| Update user    | PATCH /users/:id   | `useUpdateUser()` | Mutation                 |

### LocalStorage Integration

| Key                | Purpose              | Store                       |
| ------------------ | -------------------- | --------------------------- |
| `furniture-cart`   | Cart items           | cartStore (Zustand persist) |
| `furniture-auth`   | Auth tokens & user   | authStore (Zustand persist) |
| `furniture-orders` | Order history (mock) | ordersStore                 |

## Error Handling

### API Error Handling Strategy

```typescript
// src/lib/api/errors.ts
import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      code: error.response?.data?.code,
      status: error.response?.status || 500,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: "Đã có lỗi xảy ra",
    status: 500,
  };
}
```

### Error Boundary

```typescript
// src/components/shared/ErrorBoundary.tsx
import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <h2 className="text-xl font-semibold mb-2">Đã có lỗi xảy ra</h2>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message}
            </p>
            <Button onClick={() => window.location.reload()}>
              Tải lại trang
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

## Performance Considerations

### Optimization Strategies

1. **Code Splitting:**

   - Lazy load pages với `React.lazy()`
   - Dynamic import cho large components

2. **Image Optimization:**

   - Lazy loading với `loading="lazy"`
   - Skeleton placeholder
   - Responsive images với srcset (nếu backend hỗ trợ)

3. **State Management:**

   - TanStack Query caching (staleTime: 5 phút)
   - Zustand selector để tránh re-render không cần thiết

4. **React Optimizations:**
   - `React.memo()` cho expensive components
   - `useMemo()` cho computed values
   - `useCallback()` cho event handlers passed to children

### Bundle Size Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
        },
      },
    },
  },
});
```

## Security Notes

### Token Management

- **Access Token:** Stored in Zustand (memory), persisted to localStorage
- **Refresh Token:** Stored in Zustand, persisted to localStorage
- **Auto Refresh:** Axios interceptor handles 401 và auto-refresh
- **Logout:** Clear all tokens, redirect to login

### Input Validation

- Zod schemas validate all form inputs
- Server-side validation là source of truth
- Sanitize display data (React đã escape by default)

### XSS Prevention

- Không dùng `dangerouslySetInnerHTML`
- React escape tất cả text content
- Validate URLs trước khi dùng trong `<img src="">`

## Implementation Checklist

### Before Starting

- [ ] Backend API running at configured URL
- [ ] Environment variables configured
- [ ] Dependencies installed

### During Development

- [ ] TypeScript strict mode enabled
- [ ] ESLint passing
- [ ] Components responsive
- [ ] Error states handled
- [ ] Loading states implemented

### Before Completion

- [ ] All pages accessible via routing
- [ ] Cart persistence working
- [ ] Auth flow complete
- [ ] No console errors
- [ ] Performance acceptable
