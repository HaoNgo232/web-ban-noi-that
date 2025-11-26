group "default" {
  targets = ["api-gateway", "users-app", "products-app"]
}

target "api-gateway" {
  context = "."
  dockerfile = "apps/api-gateway/Dockerfile"
  tags = ["haongo123/furniture-api-gateway:latest"]
  platforms = ["linux/amd64", "linux/arm64"]
}

target "users-app" {
  context = "."
  dockerfile = "apps/users-app/Dockerfile"
  tags = ["haongo123/furniture-users-app:latest"]
  platforms = ["linux/amd64", "linux/arm64"]
}

target "products-app" {
  context = "."
  dockerfile = "apps/products-app/Dockerfile"
  tags = ["haongo123/furniture-products-app:latest"]
  platforms = ["linux/amd64", "linux/arm64"]
}
