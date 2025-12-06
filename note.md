backend:

- api-gateway: port: `3000` map với port `3000` trong container

- products-app: port: `3001` map với port `3001` trong container

- users-app: port: `3002` map với port `3002` trong container

frontend:

- port: `3000` map với port `4173` trong container

Lỗi không chạy migrate được?
-> exec vào mysql container gõ `mysql -u root -p` nhập root password `rootpassword` sau đó nhập lệnh cấp quyền shadow db cho web_user `GRANT ALL PRIVILEGES ON web_db.* TO 'web_user'@'%' WITH GRANT OPTION;` rồi `FLUSH PRIVILEGES;` nếu cần thiết

Chạy container backend:

- api-gateway: `docker run -e PRODUCTS_SERVICE_HOST=host-domain.com -e USERS_SERVICE_HOST=host-domain.com haongo123/web-ban-noi-that-api-gateway:latest`

- users-app: `docker run -e DATABASE_URL=mysql://web_user:web_password@host-domain.com/web_db haongo123/web-ban-noi-that-users-service:latest`

- products-app: `docker run -e DATABASE_URL=mysql://web_user:web_password@host-domain.com/web_db haongo123/web-ban-noi-that-products-service:latest`

Chạy container frontend:

- frontend: `docker run -e VITE_API_URL=host-domain.com haongo123/web-ban-noi-that-frontend:latest`

- Khi deploy xong, cd vào backend (source code trên máy tính cá nhân) chạy lệnh `npm run db:push` để push schema vào database và chạy `npm run db:seed` để seed data đến database server, nhớ cấu hình environment variables trong file `.env` là url của database server đang hosting .

- Kiểm tra kiến trúc của image: docker manifest inspect [image_name] | grep architecture

Các lệnh đã test thành công:

- docker run \
  -e VITE_API_URL=http://192.168.1.12:3003 \
  -p 3000:4173 haongo123/web-ban-noi-that-frontend

- docker run \
  -e PRODUCTS_SERVICE_HOST=192.168.1.12 \
  -e PRODUCTS_SERVICE_PORT=3001 \
  -e USERS_SERVICE_HOST=192.168.1.12 \
  -e USERS_SERVICE_PORT=3002 \

  -p 3003:3000 \
  haongo123/web-ban-noi-that-api-gateway

- docker run \
  -e DATABASE_URL="mysql://web_user:web_password@192.168.1.12:3306/web_db" \
  -p 3001:3001 \
  haongo123/web-ban-noi-that-products-app

- docker run \
  -e DATABASE_URL="mysql://web_user:web_password@192.168.1.12:3306/web_db" \
  -p 3002:3002 \
  haongo123/web-ban-noi-that-users-app
