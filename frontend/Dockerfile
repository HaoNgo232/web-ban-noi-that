# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for vite preview)
RUN pnpm install --frozen-lockfile

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Default environment variables (can be overridden at runtime)
ENV VITE_API_URL=http://localhost:3000
ENV VITE_APP_NAME="Noi That Viet"

# Expose port 4173 (vite preview default port)
EXPOSE 4173

# Use entrypoint to inject env vars at runtime
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]

