#!/bin/bash
# =============================================================================
# Initialize Database and Seed Data
# Script chạy tự động khi start Docker
# =============================================================================

set -e

echo "==========================================="
echo "🚀 Initializing Database..."
echo "==========================================="

# Chờ PostgreSQL ready
echo "⏳ Waiting for PostgreSQL..."
until pg_isready -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# Push Prisma schema
echo ""
echo "📊 Pushing database schema..."
npx prisma db push --schema=libs/prisma/prisma/schema.prisma

# Seed data
echo ""
echo "🌱 Seeding database..."
npm run db:seed

echo ""
echo "==========================================="
echo "✅ Database initialization complete!"
echo "==========================================="
