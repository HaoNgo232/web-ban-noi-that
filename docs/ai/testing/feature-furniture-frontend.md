---
phase: testing
title: Testing Strategy
description: Define testing approach, test cases, and quality assurance
feature: furniture-frontend
---

# Testing Strategy

## Test Coverage Goals

**What level of testing do we aim for?**

- **Unit test coverage**: 80%+ for hooks, stores, utilities
- **Integration test scope**: Critical user flows (auth, cart, checkout)
- **E2E test scenarios**: Happy paths cho main features
- **Component tests**: All shared components

## Unit Tests

**What individual components need testing?**

### Stores (Zustand)

#### Auth Store

- [ ] `setAuth()` - sets user, tokens, isAuthenticated
- [ ] `setTokens()` - updates tokens
- [ ] `logout()` - clears all auth state
- [ ] Persistence: state persists across page reload

#### Cart Store

- [ ] `addItem()` - adds new item to cart
- [ ] `addItem()` - increases quantity if item exists
- [ ] `removeItem()` - removes item from cart
- [ ] `updateQuantity()` - updates item quantity
- [ ] `updateQuantity(0)` - removes item when quantity is 0
- [ ] `clearCart()` - empties cart
- [ ] `totalItems()` - calculates total items correctly
- [ ] `totalPrice()` - calculates total with discounts
- [ ] Persistence: cart persists across sessions

### Hooks

#### useProducts

- [ ] Returns loading state initially
- [ ] Returns products data on success
- [ ] Returns error on failure
- [ ] Respects query parameters (pagination, filters)

#### useProduct

- [ ] Returns loading state initially
- [ ] Returns product data on success
- [ ] Returns error on failure
- [ ] Disabled when id is empty

#### useAuth

- [ ] `login()` - calls API and updates store
- [ ] `logout()` - calls API and clears store
- [ ] `register()` - calls API and returns success
- [ ] Handles API errors correctly

### Utilities

#### formatPrice

- [ ] Formats number to VND currency
- [ ] Handles 0 correctly
- [ ] Handles decimal prices

#### calculateDiscount

- [ ] Calculates discounted price correctly
- [ ] Returns original price when no discount

### Components

#### ProductCard

- [ ] Renders product name, price, image
- [ ] Shows discount badge when applicable
- [ ] Shows "Hết hàng" when out of stock
- [ ] Calls onAddToCart when button clicked

#### Pagination

- [ ] Renders correct page numbers
- [ ] Disables prev on first page
- [ ] Disables next on last page
- [ ] Calls onPageChange with correct page

## Integration Tests

**How do we test component interactions?**

### Auth Flow

- [ ] User can login with valid credentials
- [ ] Login shows error with invalid credentials
- [ ] User can register new account
- [ ] Registration shows validation errors
- [ ] User can logout
- [ ] Protected routes redirect to login

### Products Flow

- [ ] Products page loads products from API
- [ ] Filters update URL and refetch products
- [ ] Sort changes order of products
- [ ] Pagination works correctly
- [ ] Product detail page loads correct product

### Cart Flow

- [ ] Can add product to cart from listing
- [ ] Can add product to cart from detail page
- [ ] Cart shows correct items
- [ ] Can update quantity in cart
- [ ] Can remove item from cart
- [ ] Cart persists after page reload

### Checkout Flow

- [ ] Checkout shows cart summary
- [ ] Form validates required fields
- [ ] Can submit order (simulated)
- [ ] Shows confirmation after order

## End-to-End Tests

**What user flows need validation?**

### Guest Shopping Flow

1. [ ] Visit homepage
2. [ ] Click on category
3. [ ] Browse products with filters
4. [ ] View product detail
5. [ ] Add to cart
6. [ ] View cart
7. [ ] Proceed to checkout
8. [ ] Prompted to login

### Authenticated Shopping Flow

1. [ ] Login
2. [ ] Browse products
3. [ ] Add to cart
4. [ ] Checkout
5. [ ] Fill shipping info
6. [ ] Complete order
7. [ ] See confirmation

### Registration Flow

1. [ ] Visit register page
2. [ ] Fill form with valid data
3. [ ] Submit registration
4. [ ] Redirected to login
5. [ ] Login with new account

## Test Data

**What data do we use for testing?**

### Mock Products

```typescript
export const mockProduct = {
  id: "prod-1",
  name: "Sofa Modern Grey",
  description: "Comfortable modern sofa",
  price: 15000000,
  stock: 10,
  category: "SOFA",
  status: "ACTIVE",
  images: ["/images/sofa-1.jpg"],
  discountPercentage: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockProducts = [
  mockProduct,
  // ... more products
];
```

### Mock User

```typescript
export const mockUser = {
  id: "user-1",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: "CUSTOMER",
};

export const mockAuthResponse = {
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  expiresIn: 3600,
  user: mockUser,
};
```

### MSW Handlers

```typescript
// Mock API with MSW
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json({
      data: mockProducts,
      total: 20,
      page: 1,
      limit: 10,
      totalPages: 2,
    });
  }),

  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    if (body.email === "test@example.com") {
      return HttpResponse.json(mockAuthResponse);
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }),
];
```

## Test Reporting & Coverage

**How do we verify and communicate test results?**

### Commands

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test --coverage

# Run specific tests
pnpm test -- ProductCard

# Run E2E tests
pnpm test:e2e
```

### Coverage Thresholds

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Manual Testing

**What requires human validation?**

### UI/UX Checklist

- [ ] Layout đúng trên mobile (375px)
- [ ] Layout đúng trên tablet (768px)
- [ ] Layout đúng trên desktop (1280px+)
- [ ] Animations mượt mà
- [ ] Hover effects hoạt động
- [ ] Focus states rõ ràng
- [ ] Loading states hiển thị đúng
- [ ] Error states hiển thị đúng
- [ ] Empty states hiển thị đúng

### Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] Focus trap trong modals
- [ ] Alt text cho images
- [ ] Form labels đúng

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

## Performance Testing

**How do we validate performance?**

### Lighthouse Targets

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 80

### Bundle Size Targets

- Main bundle: < 200KB gzipped
- Total initial load: < 500KB gzipped

### Runtime Metrics

- FCP: < 1.5s
- LCP: < 2.5s
- TTI: < 3s
- CLS: < 0.1

## Bug Tracking

**How do we manage issues?**

### Severity Levels

- **P0 (Critical)**: Blocks core functionality, no workaround
- **P1 (High)**: Major feature broken, workaround exists
- **P2 (Medium)**: Minor feature broken, usable
- **P3 (Low)**: UI polish, nice-to-have

### Regression Testing

- Run full test suite before merge
- Smoke test after deployment
- Monitor error rates post-deploy
