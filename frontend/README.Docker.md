# Docker Setup cho Frontend

Hướng dẫn sử dụng Docker để build, push và run frontend React Vite.

## Cấu trúc Files

- `Dockerfile` - Multi-stage build với Node.js và Vite Preview
- `docker-compose.yml` - Cấu hình để chạy container
- `.dockerignore` - Loại trừ các file không cần thiết
- `Makefile` - Các lệnh tiện ích

**Lưu ý:** Setup này sử dụng `vite preview` để serve static files, không dùng Nginx.

## Cách sử dụng

### 1. Build Docker Image

```bash
# Build image
docker build -t web-ban-noi-that-frontend:latest .

# Hoặc sử dụng Makefile
make build

# Build với version cụ thể
make build VERSION=v1.0.0
```

### 2. Run Container

```bash
# Sử dụng docker-compose (khuyến nghị)
docker-compose up -d

# Hoặc
make run

# Xem logs
docker-compose logs -f
# Hoặc
make logs

# Chạy ở foreground (xem logs trực tiếp)
make run-fg
```

Ứng dụng sẽ chạy tại: http://localhost:3000 (port 3000 từ vite.config.ts)

### 3. Stop Container

```bash
docker-compose down
# Hoặc
make stop
```

### 4. Push Image lên Registry

```bash
# Tag image
docker tag web-ban-noi-that-frontend:latest your-registry.com/web-ban-noi-that-frontend:latest

# Push
docker push your-registry.com/web-ban-noi-that-frontend:latest

# Hoặc sử dụng Makefile
make tag REGISTRY=your-registry.com VERSION=latest
make push REGISTRY=your-registry.com VERSION=latest

# Hoặc build và push cùng lúc
make build-push REGISTRY=your-registry.com VERSION=v1.0.0
```

### 5. Sử dụng Image từ Registry

```bash
# Pull image
docker pull your-registry.com/web-ban-noi-that-frontend:latest

# Run
docker run -d -p 3000:80 --name frontend your-registry.com/web-ban-noi-that-frontend:latest
```

## Các lệnh Makefile

- `make build` - Build Docker image
- `make build-no-cache` - Build không dùng cache
- `make tag REGISTRY=...` - Tag image cho registry
- `make push REGISTRY=...` - Push image lên registry
- `make build-push REGISTRY=...` - Build, tag và push
- `make run` - Chạy container (background)
- `make run-fg` - Chạy container (foreground)
- `make stop` - Dừng container
- `make logs` - Xem logs
- `make clean` - Xóa container và image
- `make clean-all` - Xóa tất cả kể cả cache
- `make help` - Hiển thị help

## Biến môi trường

Có thể set các biến trong `docker-compose.yml`:

- `VERSION` - Version của image (mặc định: `dev`)
- `NODE_ENV` - Môi trường (mặc định: `production`)

## Tùy chỉnh

### Thay đổi Port

Sửa trong `docker-compose.yml` và `vite.config.ts`:

```yaml
ports:
  - "YOUR_PORT:3000"
```

Và trong `vite.config.ts`:

```typescript
server: {
  port: YOUR_PORT,
}
```

## Troubleshooting

### Container không start

```bash
# Kiểm tra logs
docker-compose logs

# Kiểm tra container status
docker ps -a
```

### Port đã được sử dụng

Thay đổi port trong `docker-compose.yml` hoặc dừng service đang dùng port đó.

### Build lỗi

```bash
# Build lại không dùng cache
make build-no-cache
```
