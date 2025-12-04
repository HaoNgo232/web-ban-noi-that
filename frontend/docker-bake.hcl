group "default" {
  targets = ["frontend"]
}

target "frontend" {
  context = "."
  dockerfile = "Dockerfile"
  tags = ["haongo123/web-ban-noi-that-frontend:latest"]
  platforms = ["linux/amd64", "linux/arm64"]
}


