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
RUN echo "=== Verifying images before build ===" && \
    ls -la public/images/ 2>/dev/null || echo "WARNING: public/images directory not found" && \
    test -f public/images/headshot.jpeg && echo "✓ headshot.jpeg found" || echo "✗ headshot.jpeg NOT FOUND" && \
    echo "Total image files:" && find public/images -type f 2>/dev/null | wc -l || echo "0"

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
# The public folder is served as static files by Next.js
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Verify public folder was copied correctly in final image
RUN echo "=== Verifying public folder in final image ===" && \
    ls -la public/ 2>/dev/null && echo "✓ public folder exists" || echo "✗ public folder NOT FOUND" && \
    ls -la public/images/ 2>/dev/null && echo "✓ public/images folder exists" || echo "✗ public/images folder NOT FOUND" && \
    test -f public/images/headshot.jpeg && echo "✓ headshot.jpeg found in final image" || echo "✗ headshot.jpeg NOT FOUND in final image" && \
    echo "Total image files in final image:" && find public/images -type f 2>/dev/null | wc -l || echo "0"

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
