# syntax=docker/dockerfile:1.4
# =============================================================================
# API Gateway Dockerfile
# Works on: Linux (AMD64), macOS (Intel/M-series)
# =============================================================================

# Stage 1: Dependencies
FROM --platform=$BUILDPLATFORM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Builder
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps ./apps
COPY libs ./libs

# Generate Prisma Client
RUN npx prisma generate --schema=libs/prisma/prisma/schema.prisma

# Build application
RUN npm run build api-gateway

# Stage 3: Production
FROM node:20-alpine

LABEL maintainer="Furniture Store Team"
LABEL description="API Gateway for Furniture Store"

# Install runtime dependencies
RUN apk add --no-cache wget curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy Prisma generated files
COPY --from=builder /app/libs/prisma/src/generated ./libs/prisma/src/generated

RUN chown -R nestjs:nodejs /app

USER nestjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/apps/api-gateway/main.js"]
