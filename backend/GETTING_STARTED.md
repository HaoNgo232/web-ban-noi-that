# 🏠 Hướng Dẫn Chạy Ứng Dụng Furniture Store

## 📋 Mục lục

1. [🚀 Chạy bằng Docker (Nhanh nhất)](#-chạy-bằng-docker-nhanh-nhất)
2. [Chuẩn bị môi trường](#chuẩn-bị-môi-trường)
3. [Cài đặt phát triển (Development)](#cài-đặt-phát-triển)
4. [Seed Data](#seed-data)
5. [API Documentation](#api-documentation)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Chạy bằng Docker (Nhanh nhất)

### ⚡ Cách 1: Docker Compose (Khuyên nghị)

**Chạy tất cả services (Database + 3 Microservices) với một lệnh:**

```bash
cd /media/hao/Data/Apps/web-ban-noi-that/backend
docker-compose up -d
```

**Kiểm tra services đang chạy:**

```bash
# Xem tất cả containers
docker ps

# Test API Gateway
curl http://localhost:3000/health
```

**Dừng services:**

```bash
docker-compose down

# Xóa database volumes (xóa tất cả data)
docker-compose down -v
```

---

### 🔧 Cách 2: Docker Run (Manual - từng container)

#### 1️⃣ Chạy MySQL Database

```bash
docker run -d \
  --name furniture_db \
  --restart always \
  --network host \
  -e MYSQL_DATABASE=furniture_db \
  -e MYSQL_USER=furniture \
  -e MYSQL_PASSWORD=password \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -p 3306:3306 \
  -v furniture_db_data:/var/lib/mysql \
  mysql:8.0

# Chờ database ready (khoảng 10-15 giây)
sleep 15
```

#### 2️⃣ Chạy Users Microservice

```bash
docker run -d \
  --name furniture_users_service \
  --restart always \
  -e NODE_ENV=production \
  -e PORT=3002 \
  -e DATABASE_URL="mysql://furniture:password@localhost:3306/furniture_db" \
  -e JWT_SECRET=your-jwt-secret \
  -e JWT_REFRESH_SECRET=your-jwt-refresh-secret \
  -p 3002:3002 \
  --network host \
  haongo123/furniture-users-app:latest
```

#### 3️⃣ Chạy Products Microservice

```bash
docker run -d \
  --name furniture_products_service \
  --restart always \
  -e NODE_ENV=production \
  -e PORT=3001 \
  -e DATABASE_URL="mysql://furniture:password@localhost:3306/furniture_db" \
  -p 3001:3001 \
  --network host \
  haongo123/furniture-products-app:latest
```

#### 4️⃣ Chạy API Gateway

```bash
docker run -d \
  --name furniture_api_gateway \
  --restart always \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e USERS_SERVICE_HOST=localhost \
  -e USERS_SERVICE_PORT=3002 \
  -e PRODUCTS_SERVICE_HOST=localhost \
  -e PRODUCTS_SERVICE_PORT=3001 \
  -e JWT_SECRET=your-jwt-secret \
  -e JWT_REFRESH_SECRET=your-jwt-refresh-secret \
  -p 3000:3000 \
  --network host \
  haongo123/furniture-api-gateway:latest
```

**Kiểm tra logs:**

```bash
docker logs -f furniture_api_gateway
docker logs -f furniture_users_service
docker logs -f furniture_products_service
```

**Dừng containers:**

```bash
docker stop furniture_api_gateway
docker stop furniture_users_service
docker stop furniture_products_service
docker stop furniture_db

# Xóa containers
docker rm furniture_api_gateway
docker rm furniture_users_service
docker rm furniture_products_service
docker rm furniture_db

# Xóa volume
docker volume rm furniture_db_data
```

---

### 📊 So sánh 2 cách

| Tiêu chí          | Docker Compose      | Docker Run    |
| ----------------- | ------------------- | ------------- |
| **Dễ dùng**       | ✅ Một lệnh         | ❌ 4 lệnh     |
| **Tự động setup** | ✅ Network, volumes | ❌ Manual     |
| **Bảo trì**       | ✅ Config file      | ❌ Script dài |
| **Mục đích**      | 👍 Production-ready | Học tập/debug |

**Khuyên cáo:** Dùng **Docker Compose** cho dễ quản lý! ✨

---

## 🔧 Chuẩn bị môi trường

### Yêu cầu

- **Node.js**: v18+ hoặc v20+ (khuyên nghị v20-alpine)
- **npm**: v9+
- **Docker & Docker Compose**: v20+
- **PostgreSQL**: v16 (nếu chạy local không dùng Docker)
- **Git**

### Clone project

```bash
git clone https://github.com/HaoNgo232/web-ban-noi-that.git
cd web-ban-noi-that/backend
```

### Cài đặt dependencies

```bash
npm install
```

### Cấu hình Environment

Tạo file `.env` tại thư mục `/backend`:

```bash
# Database
DATABASE_URL="postgresql://furniture:password@localhost:5432/furniture_db"

# JWT Secrets (tạo random tokens)
JWT_SECRET="your-secret-key-here-generate-random-string"
JWT_REFRESH_SECRET="your-refresh-secret-key-here-generate-random-string"

# Service Configuration
USERS_SERVICE_HOST=localhost
USERS_SERVICE_PORT=3002
PRODUCTS_SERVICE_HOST=localhost
PRODUCTS_SERVICE_PORT=3001

# Environment
NODE_ENV=development
PORT=3000
```

**Sinh random secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Cài đặt Phát triển

### Option 1: Chạy toàn bộ với Docker (Khuyên nghị)

#### 1. Build images

```bash
docker-compose build
```

#### 2. Chạy services

```bash
docker-compose up -d
```

#### 3. Seed data

```bash
npm run db:seed
```

#### 4. Kiểm tra health

- **API Gateway**: http://localhost:3000/health
- **Users Microservice**: TCP port 3002
- **Products Microservice**: TCP port 3001
- **PostgreSQL Database**: localhost:5432

#### 5. Dừng services

```bash
docker-compose down

# Xóa volumes (database)
docker-compose down -v
```

---

### Option 2: Chạy local (without Docker)

#### 1. Chuẩn bị PostgreSQL

```bash
# Tạo database
createdb -U postgres furniture_db

# Hoặc dùng Docker chỉ cho database
docker run --name furniture_db -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=furniture_db -p 5432:5432 -d postgres:16-alpine
```

#### 2. Push schema

```bash
npm run db:push
```

#### 3. Seed data

```bash
npm run db:seed
```

#### 4. Chạy từng service

**Terminal 1 - API Gateway:**

```bash
npm run start api-gateway
```

**Terminal 2 - Users Microservice:**

```bash
npm run start users-app
```

**Terminal 3 - Products Microservice:**

```bash
npm run start products-app
```

---

## 🌱 Seed Data

### Cơ bản

```bash
npm run db:seed
```

### Seed data được tạo

#### 👥 Users (3 accounts)

| Email               | Password     | Role     | Status |
| ------------------- | ------------ | -------- | ------ |
| admin@furniture.com | Admin@123    | ADMIN    | ACTIVE |
| staff@furniture.com | Staff@123    | STAFF    | ACTIVE |
| customer1@gmail.com | Customer@123 | CUSTOMER | ACTIVE |

#### 🛋️ Products (10+ sản phẩm)

- **Categories**: SOFA, TABLE, CHAIR, BED, CABINET, SHELF, LIGHTING, DECORATION
- **Prices**: 1,500,000 VNĐ - 15,000,000 VNĐ
- **Status**: Tất cả ACTIVE

### Reset Database

⚠️ **CẢNH BÁO**: Sẽ xóa tất cả data!

```bash
npm run db:reset
```

---

## 🐳 Build Multi-Platform Images

### Build lại images (tùy chọn)

```bash
# Build local
docker-compose build

# Hoặc build multi-platform (linux/amd64 + linux/arm64)
cd /media/hao/Data/Apps/web-ban-noi-that/backend
docker buildx bake

# Push lên Docker Hub (cần: docker login)
docker buildx bake --push
```

**Lưu ý:** Images đã được build và push lên Docker Hub (`haongo123/furniture-*`), nên bạn có thể dùng ngay!

---

## 📚 API Documentation

### Authentication

#### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@furniture.com",
    "password": "Admin@123"
  }'
```

**Response:**

```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "admin@furniture.com",
    "firstName": "Admin",
    "lastName": "System",
    "role": "ADMIN"
  }
}
```

#### Refresh Token

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGc..."
  }'
```

#### Logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid"
  }'
```

### Users API

#### Lấy danh sách users (cần JWT)

```bash
curl http://localhost:3000/users?page=1&limit=20 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Lấy user theo ID

```bash
curl http://localhost:3000/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Tạo user mới

```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password@123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0909123456",
    "address": "123 Street"
  }'
```

#### Cập nhật user

```bash
curl -X PATCH http://localhost:3000/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "phone": "0909654321"
  }'
```

#### Xóa user

```bash
curl -X DELETE http://localhost:3000/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Products API

#### Lấy danh sách products (công khai)

```bash
curl http://localhost:3000/products?page=1&limit=20
```

#### Lọc theo category

```bash
curl http://localhost:3000/products?category=SOFA&sortBy=price&sortOrder=asc
```

#### Lấy chi tiết product

```bash
curl http://localhost:3000/products/PRODUCT_ID
```

#### Tạo product (cần JWT)

```bash
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sofa Luxury",
    "description": "Ghế sofa cao cấp",
    "price": 8500000,
    "stock": 15,
    "category": "SOFA",
    "material": "Fabric"
  }'
```

#### Cập nhật product

```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 7500000,
    "stock": 12
  }'
```

#### Cập nhật stock

```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID/stock \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 30}'
```

#### Xóa product

```bash
curl -X DELETE http://localhost:3000/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Database Management

### Migrations

```bash
# Tạo migration mới
npm run db:migrate

# Push schema (without migration file)
npm run db:push

# Reset database (destructive!)
npm run db:reset
```

### Prisma Studio (GUI Database)

```bash
npx prisma studio --schema=libs/prisma/prisma/schema.prisma
```

Mở browser: http://localhost:5555

---

## 🐛 Troubleshooting

### 1. Port đã được sử dụng

```bash
# Tìm process dùng port
lsof -i :3000
lsof -i :3001
lsof -i :3002
lsof -i :5432

# Kill process
kill -9 <PID>
```

### 2. Database connection failed

```bash
# Kiểm tra PostgreSQL running
psql -U furniture -d furniture_db -c "SELECT 1"

# Reset docker container
docker-compose down -v
docker-compose up -d
```

### 3. Prisma generate errors

```bash
# Regenerate Prisma client
npx prisma generate --schema=libs/prisma/prisma/schema.prisma

# Clear cache
rm -rf node_modules/.prisma
npm install
```

### 4. Token invalid/expired

- Token hết hạn: Dùng `POST /auth/refresh` để lấy token mới
- Format sai: Phải là `Authorization: Bearer <token>`
- Secret thay đổi: Tất cả token cũ sẽ invalid

### 5. CORS issues

- API Gateway và client cần trên same domain hoặc CORS được enable
- Mặc định: localhost:3000 accept all origins

---

## 📦 Postman Collection

File: `postman_collection.json`

Import vào Postman:

1. Mở Postman
2. **Import** → **File** → Chọn `postman_collection.json`
3. Set variables:
   - `baseUrl`: http://localhost:3000
   - Tạo login trước để auto-set token

---

## 🔐 Security Tips

- ✅ Đổi `JWT_SECRET` và `JWT_REFRESH_SECRET` trong production
- ✅ Đổi `POSTGRES_PASSWORD` trong docker-compose.yml
- ✅ Enable HTTPS trong production
- ✅ Setup rate limiting
- ✅ Enable CORS properly

---

## 📞 Support

Có vấn đề? Kiểm tra:

1. Docker containers running: `docker ps`
2. Logs: `docker-compose logs -f`
3. Database: `psql -U furniture -d furniture_db`
4. Network: Ping từ container tới host
5. Environment variables: `cat .env`

---

**Last Updated**: November 25, 2025
