---
phase: requirements
title: Requirements & Problem Understanding
description: Clarify the problem space, gather requirements, and define success criteria
feature: furniture-frontend
---

# Requirements & Problem Understanding

## Problem Statement

**What problem are we solving?**

- **Core problem**: Cần xây dựng giao diện frontend hoàn chỉnh cho website bán đồ nội thất, cho phép khách hàng duyệt, tìm kiếm, và mua sản phẩm nội thất trực tuyến.
- **Who is affected**: Khách hàng muốn mua đồ nội thất online, và doanh nghiệp cần kênh bán hàng trực tuyến.
- **Current situation**: Đã có backend API NestJS hoàn chỉnh, cần frontend để kết nối và hiển thị.

## Goals & Objectives

**What do we want to achieve?**

### Primary Goals

- Xây dựng UI hoàn chỉnh với Vite + React + TypeScript + shadcn/ui
- Tích hợp đầy đủ API backend (Products, Auth, Users)
- Trải nghiệm người dùng mượt mà với animation nhẹ nhàng
- Responsive trên mọi thiết bị

### Secondary Goals

- SEO-friendly structure
- Performance optimization (lazy loading, code splitting)
- Accessibility (WCAG 2.1)

### Non-goals (out of scope)

- Admin dashboard (phase sau)
- Real payment integration (chỉ giả lập)
- Wishlist API (lưu localStorage)
- Cart API (lưu localStorage)
- Product comparison (lưu localStorage)

## User Stories & Use Cases

**How will users interact with the solution?**

### Guest User

- [ ] **US-01**: Là khách, tôi muốn xem trang chủ với sản phẩm nổi bật để có cái nhìn tổng quan về cửa hàng
- [ ] **US-02**: Là khách, tôi muốn duyệt danh sách sản phẩm với filter/sort để tìm sản phẩm phù hợp
- [ ] **US-03**: Là khách, tôi muốn xem chi tiết sản phẩm để quyết định mua hàng
- [ ] **US-04**: Là khách, tôi muốn thêm sản phẩm vào giỏ hàng để mua sau
- [ ] **US-05**: Là khách, tôi muốn đăng ký tài khoản để lưu thông tin và theo dõi đơn hàng

### Authenticated User

- [ ] **US-06**: Là user, tôi muốn đăng nhập để truy cập tài khoản
- [ ] **US-07**: Là user, tôi muốn xem và cập nhật hồ sơ cá nhân
- [ ] **US-08**: Là user, tôi muốn thanh toán giỏ hàng (giả lập)
- [ ] **US-09**: Là user, tôi muốn đăng xuất khỏi tài khoản

### Edge Cases

- Xử lý khi API không khả dụng
- Giỏ hàng với sản phẩm hết hàng
- Session timeout và refresh token
- Validation lỗi form

## Success Criteria

**How will we know when we're done?**

### Functional Criteria

- [ ] Tất cả 8 pages hoạt động đúng
- [ ] Tích hợp thành công tất cả API endpoints
- [ ] Cart và checkout flow hoàn chỉnh
- [ ] Authentication flow (login/register/logout) hoạt động

### Performance Criteria

- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3s
- [ ] Bundle size < 500KB (gzipped)

### UX Criteria

- [ ] Responsive trên mobile, tablet, desktop
- [ ] Animation mượt mà (60fps)
- [ ] Accessibility score > 90 (Lighthouse)

## Constraints & Assumptions

**What limitations do we need to work within?**

### Technical Constraints

- Sử dụng đúng stack: Vite + React + TypeScript + shadcn/ui
- Chỉ gọi API có sẵn từ backend
- Màu base: Neutral (đã config trong components.json)
- React Router v7 cho routing

### Business Constraints

- Cart/Wishlist/Compare lưu localStorage (không có API)
- Payment là giả lập, không tích hợp payment gateway thật

### Assumptions

- Backend API đã hoạt động ổn định
- Có sample data trong database
- User sẽ sử dụng browser hiện đại (ES2020+)

## API Endpoints Available

**Backend APIs to integrate:**

### Products API

| Method | Endpoint              | Description                                       |
| ------ | --------------------- | ------------------------------------------------- |
| GET    | `/products`           | Lấy danh sách sản phẩm (pagination, filter, sort) |
| GET    | `/products/:id`       | Lấy chi tiết sản phẩm                             |
| POST   | `/products`           | Tạo sản phẩm mới (Admin)                          |
| PATCH  | `/products/:id`       | Cập nhật sản phẩm (Admin)                         |
| DELETE | `/products/:id`       | Xóa sản phẩm (Admin)                              |
| PATCH  | `/products/:id/stock` | Cập nhật stock (Admin)                            |

### Auth API

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | `/auth/login`   | Đăng nhập     |
| POST   | `/auth/refresh` | Refresh token |
| POST   | `/auth/logout`  | Đăng xuất     |

### Users API

| Method | Endpoint     | Description                 |
| ------ | ------------ | --------------------------- |
| GET    | `/users`     | Lấy danh sách users (Admin) |
| GET    | `/users/:id` | Lấy thông tin user          |
| POST   | `/users`     | Tạo user mới (Register)     |
| PATCH  | `/users/:id` | Cập nhật user               |
| DELETE | `/users/:id` | Xóa user (Admin)            |

## Questions & Open Items

**What do we still need to clarify?**

- [x] Màu base đã chọn: Neutral (từ components.json)
- [x] State management: Cần quyết định (Zustand vs TanStack Query vs Jotai)
- [ ] Base URL của API backend là gì? (cần config .env)
- [ ] Có cần i18n (đa ngôn ngữ) không?
- [ ] Có cần dark mode không?
