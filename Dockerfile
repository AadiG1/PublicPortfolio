FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Remove test files
RUN rm -f vitest.config.ts vitest.config.mjs vitest.setup.ts 2>/dev/null || true

# Verify images exist before build
RUN ls -la public/images/ 2>/dev/null || echo "WARNING: public/images directory not found"
RUN test -f public/images/headshot.jpeg && echo "✓ headshot.jpeg found" || echo "✗ headshot.jpeg NOT FOUND"

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# CRITICAL: Copy public folder - Next.js standalone does NOT include it automatically
# This must be at the root level where server.js can access it
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Verify public folder was copied correctly
RUN ls -la public/images/ 2>/dev/null && echo "✓ public/images copied successfully" || echo "✗ ERROR: public/images not found in final image"

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
