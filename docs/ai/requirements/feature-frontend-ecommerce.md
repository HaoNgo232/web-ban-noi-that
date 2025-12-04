---
phase: requirements
title: Requirements & Problem Understanding
description: Xây dựng giao diện frontend hoàn chỉnh cho website bán đồ nội thất
feature: frontend-ecommerce
created: 2024-12-04
---

# Requirements & Problem Understanding

## Problem Statement

**What problem are we solving?**

- **Core problem:** Website bán đồ nội thất hiện chỉ có backend API (NestJS microservices) mà chưa có giao diện người dùng. Khách hàng không thể xem, tìm kiếm, mua sản phẩm nội thất.
- **Who is affected:**
  - Khách hàng muốn mua đồ nội thất online
  - Admin/Staff cần quản lý sản phẩm (tương lai)
- **Current situation:** Backend đã hoàn thiện với đầy đủ API cho Products, Users, Auth. Frontend hiện chỉ là boilerplate Vite + React.

## Goals & Objectives

**What do we want to achieve?**

### Primary Goals

1. Xây dựng UI/UX hiện đại, chuyên nghiệp cho website nội thất
2. Tích hợp đầy đủ với backend APIs hiện có
3. Responsive design trên mọi thiết bị (Mobile-first)
4. Performance tốt (Core Web Vitals đạt chuẩn)

### Secondary Goals

1. Animation mượt mà, tăng trải nghiệm người dùng
2. SEO-friendly structure (chuẩn bị cho SSR/SSG sau này)
3. Accessible (WCAG 2.1 AA)
4. Dark mode support (tương lai)

### Non-goals (Out of scope)

1. ❌ Admin dashboard (phase sau)
2. ❌ Payment gateway thật (chỉ giả lập)
3. ❌ Real-time notifications
4. ❌ Multi-language support
5. ❌ PWA features
6. ❌ Backend API mới (chỉ dùng API có sẵn)

## User Stories & Use Cases

**How will users interact with the solution?**

### Epic 1: Khám phá sản phẩm

| ID     | User Story                                                                  | Priority | Acceptance Criteria                                          |
| ------ | --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| US-1.1 | Là khách, tôi muốn xem trang chủ với sản phẩm nổi bật để biết shop bán gì   | Must     | Hero section + Featured products hiển thị đúng               |
| US-1.2 | Là khách, tôi muốn xem danh sách sản phẩm với filter/sort để tìm đồ phù hợp | Must     | Filter by category, Sort by price/date, Pagination hoạt động |
| US-1.3 | Là khách, tôi muốn tìm kiếm sản phẩm theo tên để nhanh chóng tìm được       | Should   | Search input, gọi API với query `search`                     |
| US-1.4 | Là khách, tôi muốn xem chi tiết sản phẩm với gallery ảnh                    | Must     | Image gallery, Product info, Add to cart button              |
| US-1.5 | Là khách, tôi muốn xem sản phẩm liên quan (cùng category)                   | Should   | Related products section                                     |

### Epic 2: Giỏ hàng & Thanh toán

| ID     | User Story                                                   | Priority | Acceptance Criteria                            |
| ------ | ------------------------------------------------------------ | -------- | ---------------------------------------------- |
| US-2.1 | Là khách, tôi muốn thêm sản phẩm vào giỏ hàng                | Must     | Cart badge update, Toast notification          |
| US-2.2 | Là khách, tôi muốn xem và quản lý giỏ hàng                   | Must     | Cart drawer/page, Update quantity, Remove item |
| US-2.3 | Là khách, tôi muốn xem tổng tiền và tiến hành thanh toán     | Must     | Subtotal, Shipping, Total calculation          |
| US-2.4 | Là khách, tôi muốn điền thông tin giao hàng và thanh toán    | Must     | Checkout form với validation                   |
| US-2.5 | Là khách, tôi muốn nhận xác nhận đơn hàng sau khi thanh toán | Must     | Order confirmation page                        |

### Epic 3: Authentication

| ID     | User Story                                 | Priority | Acceptance Criteria              |
| ------ | ------------------------------------------ | -------- | -------------------------------- |
| US-3.1 | Là khách, tôi muốn đăng ký tài khoản mới   | Must     | Register form, API POST /users   |
| US-3.2 | Là khách, tôi muốn đăng nhập vào tài khoản | Must     | Login form, API POST /auth/login |
| US-3.3 | Là user, tôi muốn duy trì phiên đăng nhập  | Must     | Token refresh tự động            |
| US-3.4 | Là user, tôi muốn đăng xuất                | Must     | Logout, clear tokens             |

### Epic 4: User Profile

| ID     | User Story                                   | Priority | Acceptance Criteria                              |
| ------ | -------------------------------------------- | -------- | ------------------------------------------------ |
| US-4.1 | Là user, tôi muốn xem thông tin cá nhân      | Must     | Profile page với user info                       |
| US-4.2 | Là user, tôi muốn cập nhật thông tin cá nhân | Should   | Edit profile form, API PATCH /users/:id          |
| US-4.3 | Là user, tôi muốn xem lịch sử đơn hàng       | Could    | Order history (mock data - vì chưa có API Order) |

### Edge Cases

- Sản phẩm hết hàng (stock = 0) → Disable "Add to cart"
- Token hết hạn khi đang thao tác → Auto refresh hoặc redirect login
- Network error → Error boundary + Retry button
- Empty cart → Empty state với CTA
- No search results → Empty state với suggestions

## Success Criteria

**How will we know when we're done?**

### Functional Criteria

- [ ] Tất cả 8 pages hoạt động đúng theo user stories
- [ ] Tích hợp đầy đủ 12 API endpoints từ backend
- [ ] Cart persist qua localStorage
- [ ] Auth flow hoàn chỉnh (login → refresh → logout)

### Performance Criteria

- [ ] Lighthouse Performance score ≥ 90
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Bundle Size < 300KB gzipped

### Quality Criteria

- [ ] TypeScript strict mode, no `any`
- [ ] Unit test coverage ≥ 80% cho business logic
- [ ] No ESLint errors
- [ ] Responsive trên Mobile/Tablet/Desktop

## Constraints & Assumptions

**What limitations do we need to work within?**

### Technical Constraints

1. **Backend API cố định:** Chỉ sử dụng 12 endpoints đã liệt kê, không yêu cầu thêm
2. **No SSR:** Sử dụng Vite CSR (có thể migrate sang Next.js sau)
3. **No real payment:** Checkout chỉ giả lập, không tích hợp Stripe/PayPal

### Business Constraints

1. **Timeline:** Cần hoàn thành trong phase này
2. **Resources:** 1 developer
3. **Design:** Tự design, không có Figma mockup

### Assumptions

1. Backend API đang hoạt động ổn định tại `http://localhost:3000`
2. Hình ảnh sản phẩm được host ở external URL (Cloudinary, S3...)
3. User hiểu tiếng Việt (UI có thể dùng tiếng Việt hoặc Anh)

## API Inventory

**Backend APIs được sử dụng:**

### Products API

| Method | Endpoint              | Request                                                           | Response                 | Use Case                 |
| ------ | --------------------- | ----------------------------------------------------------------- | ------------------------ | ------------------------ |
| GET    | `/products`           | Query: `page, limit, category, status, search, sortBy, sortOrder` | `GetProductsResponseDto` | Danh sách + Filter       |
| GET    | `/products/:id`       | -                                                                 | `GetProductDto`          | Chi tiết sản phẩm        |
| POST   | `/products`           | `CreateProductDto`                                                | `GetProductDto`          | (Admin) Tạo sản phẩm     |
| PATCH  | `/products/:id`       | `UpdateProductDto`                                                | `GetProductDto`          | (Admin) Sửa sản phẩm     |
| DELETE | `/products/:id`       | -                                                                 | -                        | (Admin) Xóa sản phẩm     |
| PATCH  | `/products/:id/stock` | `{ stock: number }`                                               | `GetProductDto`          | (Admin) Cập nhật tồn kho |

### Auth API

| Method | Endpoint        | Request            | Response                  | Use Case      |
| ------ | --------------- | ------------------ | ------------------------- | ------------- |
| POST   | `/auth/login`   | `LoginDto`         | `AuthResponseDto`         | Đăng nhập     |
| POST   | `/auth/refresh` | `RefreshTokenDto`  | `RefreshTokenResponseDto` | Refresh token |
| POST   | `/auth/logout`  | `{ refreshToken }` | -                         | Đăng xuất     |

### Users API

| Method | Endpoint     | Request                                                       | Response              | Use Case                |
| ------ | ------------ | ------------------------------------------------------------- | --------------------- | ----------------------- |
| GET    | `/users`     | Query: `page, limit, role, status, search, sortBy, sortOrder` | `GetUsersResponseDto` | (Admin) Danh sách users |
| GET    | `/users/:id` | -                                                             | `UserResponseDto`     | Xem profile             |
| POST   | `/users`     | `CreateUserDto`                                               | `UserResponseDto`     | Đăng ký                 |
| PATCH  | `/users/:id` | `UpdateUserDto`                                               | `UserResponseDto`     | Cập nhật profile        |
| DELETE | `/users/:id` | -                                                             | -                     | (Admin) Xóa user        |

## Data Models

**Entities từ Backend:**

### Product

```typescript
interface Product {
  id: string; // UUID
  name: string; // 3-255 chars
  description: string; // min 10 chars
  price: number; // Decimal, positive
  stock: number; // Integer, positive
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  category:
    | "SOFA"
    | "TABLE"
    | "CHAIR"
    | "BED"
    | "CABINET"
    | "SHELF"
    | "LIGHTING"
    | "DECORATION";
  material?: string;
  images?: string[]; // Array of URLs
  discountPercentage?: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}
```

### User

```typescript
interface User {
  id: string; // UUID
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  address?: string;
  role: "ADMIN" | "CUSTOMER" | "STAFF";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Auth Response

```typescript
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
```

## Client-Side Only Features

**Features không có API backend, lưu localStorage:**

### Cart (localStorage key: `furniture-cart`)

```typescript
interface CartItem {
  productId: string;
  product: Product; // Cached product data
  quantity: number;
  addedAt: Date;
}

interface Cart {
  items: CartItem[];
  updatedAt: Date;
}
```

### Order History (localStorage key: `furniture-orders`)

```typescript
interface Order {
  id: string; // Client-generated UUID
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: Date;
}
```

## Questions & Open Items

**Resolved:**

- ✅ State management: TanStack Query + Zustand (đã thảo luận)
- ✅ UI Library: shadcn/ui với neutral/stone theme
- ✅ Cart: Client-side only với localStorage
- ✅ Payment: Giả lập, không tích hợp gateway thật

**Cần xác nhận:**

- [ ] Backend API base URL? (assume `http://localhost:3000`)
- [ ] Có sẵn sample images cho products không? (assume có trong DB)
- [ ] UI language: Tiếng Việt hay English? (assume mix)
