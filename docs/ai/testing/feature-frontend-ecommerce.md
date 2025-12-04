---
phase: testing
title: Testing Strategy
description: Chiến lược testing cho frontend ecommerce
feature: frontend-ecommerce
created: 2024-12-04
---

# Testing Strategy

## Test Coverage Goals

| Type              | Target            | Priority | Tools                         |
| ----------------- | ----------------- | -------- | ----------------------------- |
| Unit Tests        | ≥ 80% coverage    | High     | Vitest, React Testing Library |
| Integration Tests | Critical paths    | High     | Vitest, MSW                   |
| E2E Tests         | Key user journeys | Medium   | Playwright (future)           |
| Manual Testing    | All features      | Required | Browser DevTools              |

### Coverage Focus Areas

- Zustand stores (cart, auth) - 100%
- Custom hooks - 100%
- API layer - 100%
- Form validation - 100%
- Utility functions - 100%
- Components - ≥ 80%

## Unit Tests

### Stores Testing

#### Cart Store (`src/stores/cartStore.ts`)

```typescript
// src/stores/__tests__/cartStore.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "../cartStore";

const mockProduct = {
  id: "1",
  name: "Test Sofa",
  price: 1000000,
  stock: 10,
  status: "ACTIVE" as const,
  category: "SOFA" as const,
  description: "A comfortable sofa",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("cartStore", () => {
  beforeEach(() => {
    // Reset store trước mỗi test
    useCartStore.getState().clearCart();
  });

  describe("addItem", () => {
    it("should add new item to empty cart", () => {
      useCartStore.getState().addItem(mockProduct, 1);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].productId).toBe("1");
      expect(items[0].quantity).toBe(1);
    });

    it("should increase quantity for existing item", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().addItem(mockProduct, 2);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3);
    });

    it("should handle default quantity of 1", () => {
      useCartStore.getState().addItem(mockProduct);

      const { items } = useCartStore.getState();
      expect(items[0].quantity).toBe(1);
    });
  });

  describe("removeItem", () => {
    it("should remove item from cart", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().removeItem("1");

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it("should not throw when removing non-existent item", () => {
      expect(() => {
        useCartStore.getState().removeItem("non-existent");
      }).not.toThrow();
    });
  });

  describe("updateQuantity", () => {
    it("should update quantity", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().updateQuantity("1", 5);

      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it("should remove item when quantity is 0", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().updateQuantity("1", 0);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it("should remove item when quantity is negative", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().updateQuantity("1", -1);

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("clearCart", () => {
    it("should remove all items", () => {
      useCartStore.getState().addItem(mockProduct, 1);
      useCartStore.getState().addItem({ ...mockProduct, id: "2" }, 2);
      useCartStore.getState().clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("getItemCount", () => {
    it("should return total quantity of all items", () => {
      useCartStore.getState().addItem(mockProduct, 2);
      useCartStore.getState().addItem({ ...mockProduct, id: "2" }, 3);

      expect(useCartStore.getState().getItemCount()).toBe(5);
    });

    it("should return 0 for empty cart", () => {
      expect(useCartStore.getState().getItemCount()).toBe(0);
    });
  });

  describe("getSubtotal", () => {
    it("should calculate subtotal without discount", () => {
      useCartStore.getState().addItem(mockProduct, 2);

      // 1,000,000 * 2 = 2,000,000
      expect(useCartStore.getState().getSubtotal()).toBe(2000000);
    });

    it("should calculate subtotal with discount", () => {
      const discountedProduct = { ...mockProduct, discountPercentage: 10 };
      useCartStore.getState().addItem(discountedProduct, 2);

      // 1,000,000 * 0.9 * 2 = 1,800,000
      expect(useCartStore.getState().getSubtotal()).toBe(1800000);
    });
  });

  describe("getTotal", () => {
    it("should add shipping fee for orders under 5M", () => {
      useCartStore.getState().addItem(mockProduct, 1);

      // 1,000,000 + 50,000 shipping = 1,050,000
      expect(useCartStore.getState().getTotal()).toBe(1050000);
    });

    it("should have free shipping for orders over 5M", () => {
      useCartStore.getState().addItem({ ...mockProduct, price: 6000000 }, 1);

      // 6,000,000 + 0 shipping = 6,000,000
      expect(useCartStore.getState().getTotal()).toBe(6000000);
    });
  });
});
```

#### Auth Store (`src/stores/authStore.ts`)

```typescript
// src/stores/__tests__/authStore.test.ts
describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  describe("setAuth", () => {
    it("should set tokens and user", () => {
      const authData = {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        expiresIn: 3600,
        user: {
          id: "1",
          email: "test@test.com",
          firstName: "John",
          lastName: "Doe",
          role: "CUSTOMER",
        },
      };

      useAuthStore.getState().setAuth(authData);

      const state = useAuthStore.getState();
      expect(state.accessToken).toBe("access-token");
      expect(state.refreshToken).toBe("refresh-token");
      expect(state.user?.email).toBe("test@test.com");
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe("logout", () => {
    it("should clear all auth data", () => {
      useAuthStore.getState().setAuth({
        /* ... */
      });
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.accessToken).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("setAccessToken", () => {
    it("should update only access token", () => {
      useAuthStore.getState().setAuth({
        /* ... */
      });
      useAuthStore.getState().setAccessToken("new-access-token");

      expect(useAuthStore.getState().accessToken).toBe("new-access-token");
    });
  });
});
```

### Hooks Testing

#### useProducts Hook

```typescript
// src/hooks/__tests__/useProducts.test.ts
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "../useProducts";
import { productsApi } from "@/lib/api/products";

vi.mock("@/lib/api/products");

const wrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts", () => {
  it("should fetch products successfully", async () => {
    const mockData = {
      data: [{ id: "1", name: "Test Product" }],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    };

    vi.mocked(productsApi.getAll).mockResolvedValue(mockData);

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("should pass filters to API", async () => {
    const filters = { category: "SOFA", page: 2 };

    renderHook(() => useProducts(filters), { wrapper });

    await waitFor(() => {
      expect(productsApi.getAll).toHaveBeenCalledWith(filters);
    });
  });

  it("should handle error", async () => {
    vi.mocked(productsApi.getAll).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
```

### Utility Functions Testing

#### Formatters

```typescript
// src/lib/__tests__/formatters.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice, formatDate, formatPhoneNumber } from "../formatters";

describe("formatPrice", () => {
  it("should format Vietnamese currency", () => {
    expect(formatPrice(1000000)).toBe("1.000.000 ₫");
  });

  it("should handle zero", () => {
    expect(formatPrice(0)).toBe("0 ₫");
  });

  it("should handle decimal prices", () => {
    expect(formatPrice(1500.5)).toBe("1.501 ₫");
  });
});

describe("formatDate", () => {
  it("should format date in Vietnamese locale", () => {
    const date = new Date("2024-12-04T10:00:00Z");
    expect(formatDate(date)).toMatch(/04\/12\/2024/);
  });

  it("should handle ISO string input", () => {
    expect(formatDate("2024-12-04T10:00:00Z")).toMatch(/04\/12\/2024/);
  });
});

describe("formatPhoneNumber", () => {
  it("should format Vietnamese phone number", () => {
    expect(formatPhoneNumber("0901234567")).toBe("090 123 4567");
  });
});
```

### API Layer Testing

```typescript
// src/lib/api/__tests__/products.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { productsApi } from "../products";
import { api } from "../index";

vi.mock("../index", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("productsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call GET /products with params", async () => {
      const params = { page: 1, limit: 20, category: "SOFA" };
      vi.mocked(api.get).mockResolvedValue({ data: { data: [] } });

      await productsApi.getAll(params);

      expect(api.get).toHaveBeenCalledWith("/products", { params });
    });
  });

  describe("getById", () => {
    it("should call GET /products/:id", async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { id: "1" } });

      await productsApi.getById("123");

      expect(api.get).toHaveBeenCalledWith("/products/123");
    });
  });
});
```

### Component Testing

#### ProductCard Component

```typescript
// src/components/products/__tests__/ProductCard.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../ProductCard";
import { useCartStore } from "@/stores/cartStore";

vi.mock("@/stores/cartStore");

const mockProduct = {
  id: "1",
  name: "Modern Sofa",
  price: 5000000,
  stock: 10,
  status: "ACTIVE" as const,
  category: "SOFA" as const,
  description: "A beautiful modern sofa",
  images: ["https://example.com/sofa.jpg"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ProductCard", () => {
  it("should render product name and price", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Modern Sofa")).toBeInTheDocument();
    expect(screen.getByText(/5.000.000/)).toBeInTheDocument();
  });

  it("should show discounted price when discount exists", () => {
    const discountedProduct = { ...mockProduct, discountPercentage: 20 };
    render(<ProductCard product={discountedProduct} />);

    // Original price with strikethrough
    expect(screen.getByText(/5.000.000/)).toHaveClass("line-through");
    // Discounted price
    expect(screen.getByText(/4.000.000/)).toBeInTheDocument();
  });

  it("should disable add to cart button when out of stock", () => {
    const outOfStockProduct = {
      ...mockProduct,
      stock: 0,
      status: "OUT_OF_STOCK" as const,
    };
    render(<ProductCard product={outOfStockProduct} />);

    const button = screen.getByRole("button", { name: /hết hàng/i });
    expect(button).toBeDisabled();
  });

  it("should call addItem when add to cart clicked", () => {
    const addItem = vi.fn();
    vi.mocked(useCartStore).mockReturnValue({ addItem });

    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByRole("button", { name: /thêm vào giỏ/i }));

    expect(addItem).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("should show category badge", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("SOFA")).toBeInTheDocument();
  });
});
```

#### LoginForm Component

```typescript
// src/components/auth/__tests__/LoginForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";
import { useLogin } from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
  });

  it("should render email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
  });

  it("should show validation errors for invalid input", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText(/email không hợp lệ/i)).toBeInTheDocument();
    });
  });

  it("should call login mutation with form data", async () => {
    const mockLogin = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      mutate: mockLogin,
      isPending: false,
    });

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/mật khẩu/i), "Password123!");

    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { email: "test@test.com", password: "Password123!" },
        expect.any(Object),
      );
    });
  });

  it("should disable button when loading", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<LoginForm />);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/đang đăng nhập/i)).toBeInTheDocument();
  });
});
```

## Integration Tests

### Cart Flow Integration

```typescript
// src/__tests__/integration/cart-flow.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductCard } from "@/components/products/ProductCard";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCartStore } from "@/stores/cartStore";

const mockProduct = {
  /* ... */
};

describe("Cart Flow Integration", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("should add product to cart and show in drawer", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
          <CartDrawer isOpen={true} onClose={() => {}} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    // Add to cart
    fireEvent.click(screen.getByRole("button", { name: /thêm vào giỏ/i }));

    // Verify in drawer
    expect(screen.getByText("Modern Sofa")).toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("should update quantity in cart", async () => {
    useCartStore.getState().addItem(mockProduct, 1);

    // Render cart drawer
    render(<CartDrawer isOpen={true} onClose={() => {}} />);

    // Increase quantity
    fireEvent.click(screen.getByRole("button", { name: /\+/i }));

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });
});
```

### Auth Flow Integration

```typescript
// src/__tests__/integration/auth-flow.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "@/lib/api/auth";

vi.mock("@/lib/api/auth");

describe("Auth Flow Integration", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it("should login and redirect to home", async () => {
    vi.mocked(authApi.login).mockResolvedValue({
      accessToken: "access",
      refreshToken: "refresh",
      expiresIn: 3600,
      user: {
        id: "1",
        email: "test@test.com",
        firstName: "John",
        lastName: "Doe",
        role: "CUSTOMER",
      },
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/mật khẩu/i), "Password123!");
    await userEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });
});
```

## E2E Tests (Future - Playwright)

```typescript
// e2e/checkout.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test("should complete checkout process", async ({ page }) => {
    // Go to products
    await page.goto("/products");

    // Add product to cart
    await page.click('[data-testid="add-to-cart-1"]');

    // Open cart drawer
    await page.click('[data-testid="cart-icon"]');

    // Go to checkout
    await page.click("text=Thanh toán");

    // Fill shipping form
    await page.fill('input[name="fullName"]', "Nguyễn Văn A");
    await page.fill('input[name="phone"]', "0901234567");
    await page.fill('textarea[name="address"]', "123 Đường ABC");

    // Select payment method
    await page.click("text=Thanh toán khi nhận hàng");

    // Place order
    await page.click("text=Đặt hàng");

    // Verify confirmation
    await expect(page.locator("text=Đặt hàng thành công")).toBeVisible();
  });
});
```

## Test Data

### Mock Products

```typescript
// src/__tests__/fixtures/products.ts
export const mockProducts = [
  {
    id: "1",
    name: "Modern Leather Sofa",
    description: "A premium leather sofa with modern design",
    price: 15000000,
    stock: 10,
    status: "ACTIVE",
    category: "SOFA",
    material: "Leather",
    images: ["https://placehold.co/400x300?text=Sofa"],
    discountPercentage: 10,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // ... more mock products
];

export const mockProductsResponse = {
  data: mockProducts,
  total: 20,
  page: 1,
  limit: 20,
  totalPages: 1,
};
```

### Mock Users

```typescript
// src/__tests__/fixtures/users.ts
export const mockUser = {
  id: "1",
  email: "customer@test.com",
  firstName: "Nguyễn",
  lastName: "Văn A",
  phone: "0901234567",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  role: "CUSTOMER",
  status: "ACTIVE",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

export const mockAuthResponse = {
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  expiresIn: 3600,
  user: {
    id: "1",
    email: "customer@test.com",
    firstName: "Nguyễn",
    lastName: "Văn A",
    role: "CUSTOMER",
  },
};
```

### MSW Handlers

```typescript
// src/__tests__/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { mockProductsResponse, mockProducts } from "../fixtures/products";
import { mockAuthResponse, mockUser } from "../fixtures/users";

export const handlers = [
  // Products
  http.get("/products", () => {
    return HttpResponse.json(mockProductsResponse);
  }),

  http.get("/products/:id", ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  // Auth
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    if (body.email === "test@test.com" && body.password === "Password123!") {
      return HttpResponse.json(mockAuthResponse);
    }
    return new HttpResponse(null, { status: 401 });
  }),

  http.post("/auth/refresh", () => {
    return HttpResponse.json({
      accessToken: "new-access-token",
      expiresIn: 3600,
    });
  }),

  // Users
  http.get("/users/:id", () => {
    return HttpResponse.json(mockUser);
  }),

  http.post("/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      ...mockUser,
      ...body,
      id: "new-user-id",
    });
  }),
];
```

## Test Reporting & Coverage

### Commands

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test src/stores/__tests__/cartStore.test.ts

# Run in watch mode
pnpm test:watch
```

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.d.ts",
        "**/*.config.*",
        "src/main.tsx",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Test Setup

```typescript
// src/__tests__/setup.ts
import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Manual Testing Checklist

### Home Page

- [ ] Hero section displays correctly
- [ ] Featured products load and display
- [ ] Category showcase links work
- [ ] Responsive on mobile/tablet

### Products Page

- [ ] Products load with pagination
- [ ] Category filter works
- [ ] Sort by price/date works
- [ ] Search functionality works
- [ ] Empty state displays when no results

### Product Detail Page

- [ ] Product info displays correctly
- [ ] Image gallery works (thumbnails, zoom)
- [ ] Add to cart button works
- [ ] Out of stock state displays
- [ ] Related products load

### Cart

- [ ] Items display correctly
- [ ] Quantity update works
- [ ] Remove item works
- [ ] Totals calculate correctly
- [ ] Cart persists after refresh
- [ ] Empty cart state displays

### Checkout

- [ ] Form validation works
- [ ] Payment method selection works
- [ ] Order summary displays correctly
- [ ] Place order works
- [ ] Confirmation page displays

### Auth

- [ ] Login form validation works
- [ ] Login succeeds with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Register form validation works
- [ ] Logout works
- [ ] Token refresh works (check after expired)

### Profile

- [ ] User info displays
- [ ] Edit profile works
- [ ] Protected route redirects when not logged in

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

## Bug Tracking

### Issue Template

```markdown
## Bug Description

[Clear description of the issue]

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Observe '...'

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Screenshots

[If applicable]

## Environment

- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen size: [e.g., 1920x1080]

## Severity

- [ ] Critical (blocks core functionality)
- [ ] High (major feature broken)
- [ ] Medium (minor feature issue)
- [ ] Low (cosmetic issue)
```

### Regression Testing

After bug fixes:

1. Verify the specific bug is fixed
2. Run related unit tests
3. Run integration tests for affected flow
4. Manual test the affected feature
5. Check for side effects on related features
