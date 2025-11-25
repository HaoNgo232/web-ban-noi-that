#!/bin/bash
# =============================================================================
# Build Multi-Platform Docker Images
# Hỗ trợ: macOS (M-series ARM64), Windows (AMD64), Linux (AMD64/ARM64)
# =============================================================================

set -e

# Configuration
REGISTRY="${DOCKER_REGISTRY:-docker.io}"
USERNAME="${DOCKER_USERNAME:-your-username}"
VERSION="${VERSION:-latest}"
PLATFORMS="linux/amd64,linux/arm64"

# Image names
API_GATEWAY_IMAGE="${USERNAME}/furniture-api-gateway"
USERS_APP_IMAGE="${USERNAME}/furniture-users-app"
PRODUCTS_APP_IMAGE="${USERNAME}/furniture-products-app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# Step 1: Setup buildx builder
# =============================================================================
setup_builder() {
    echo_info "Setting up Docker buildx builder..."
    
    # Check if builder exists
    if ! docker buildx inspect multiplatform-builder &>/dev/null; then
        echo_info "Creating new buildx builder 'multiplatform-builder'..."
        docker buildx create --name multiplatform-builder --driver docker-container --use
    else
        echo_info "Using existing buildx builder 'multiplatform-builder'..."
        docker buildx use multiplatform-builder
    fi
    
    # Bootstrap the builder
    docker buildx inspect --bootstrap
    
    echo_info "Builder setup complete!"
}

# =============================================================================
# Step 2: Build and push images
# =============================================================================
build_and_push() {
    local app_name=$1
    local dockerfile=$2
    local image_name=$3
    
    echo_info "Building ${app_name} for platforms: ${PLATFORMS}..."
    
    docker buildx build \
        --platform ${PLATFORMS} \
        --file ${dockerfile} \
        --tag ${image_name}:${VERSION} \
        --tag ${image_name}:latest \
        --push \
        .
    
    echo_info "${app_name} built and pushed successfully!"
}

# =============================================================================
# Step 3: Build for local use (single platform)
# =============================================================================
build_local() {
    local app_name=$1
    local dockerfile=$2
    local image_name=$3
    
    echo_info "Building ${app_name} for local platform..."
    
    docker buildx build \
        --file ${dockerfile} \
        --tag ${image_name}:${VERSION} \
        --tag ${image_name}:local \
        --load \
        .
    
    echo_info "${app_name} built for local use!"
}

# =============================================================================
# Main Script
# =============================================================================
main() {
    local action=${1:-"local"}
    
    echo "=============================================="
    echo "  Furniture Store - Docker Build Script"
    echo "=============================================="
    echo ""
    
    case $action in
        "setup")
            setup_builder
            ;;
        "push")
            echo_info "Building and pushing multi-platform images..."
            setup_builder
            
            build_and_push "API Gateway" "apps/api-gateway/Dockerfile" "${API_GATEWAY_IMAGE}"
            build_and_push "Users App" "apps/users-app/Dockerfile" "${USERS_APP_IMAGE}"
            build_and_push "Products App" "apps/products-app/Dockerfile" "${PRODUCTS_APP_IMAGE}"
            
            echo ""
            echo_info "All images built and pushed!"
            echo_info "Images are available at:"
            echo "  - ${API_GATEWAY_IMAGE}:${VERSION}"
            echo "  - ${USERS_APP_IMAGE}:${VERSION}"
            echo "  - ${PRODUCTS_APP_IMAGE}:${VERSION}"
            ;;
        "local")
            echo_info "Building images for local development..."
            
            build_local "API Gateway" "apps/api-gateway/Dockerfile" "furniture-api-gateway"
            build_local "Users App" "apps/users-app/Dockerfile" "furniture-users-app"
            build_local "Products App" "apps/products-app/Dockerfile" "furniture-products-app"
            
            echo ""
            echo_info "All images built for local use!"
            echo_info "Run with: docker-compose up"
            ;;
        "api-gateway")
            build_local "API Gateway" "apps/api-gateway/Dockerfile" "furniture-api-gateway"
            ;;
        "users-app")
            build_local "Users App" "apps/users-app/Dockerfile" "furniture-users-app"
            ;;
        "products-app")
            build_local "Products App" "apps/products-app/Dockerfile" "furniture-products-app"
            ;;
        *)
            echo "Usage: $0 {setup|push|local|api-gateway|users-app|products-app}"
            echo ""
            echo "Commands:"
            echo "  setup        - Setup buildx builder for multi-platform builds"
            echo "  push         - Build and push multi-platform images to registry"
            echo "  local        - Build all images for local development"
            echo "  api-gateway  - Build only API Gateway for local development"
            echo "  users-app    - Build only Users App for local development"
            echo "  products-app - Build only Products App for local development"
            echo ""
            echo "Environment variables:"
            echo "  DOCKER_USERNAME - Docker Hub username (default: your-username)"
            echo "  VERSION         - Image version tag (default: latest)"
            exit 1
            ;;
    esac
}

main "$@"
