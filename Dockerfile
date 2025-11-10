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

# Copy standalone output (this includes the server and necessary files)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# CRITICAL: Copy public folder - Next.js standalone does NOT include it automatically
# The public folder MUST be at the same level as server.js for Next.js to serve it
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Verify everything is in place
RUN echo "=== Final verification ===" && \
    echo "Current directory:" && pwd && \
    echo "Files in /app:" && ls -la . 2>/dev/null | head -15 && \
    echo "---" && \
    echo "Public folder:" && ls -la public/ 2>/dev/null || echo "✗ public folder NOT FOUND" && \
    echo "Images:" && ls -la public/images/ 2>/dev/null || echo "✗ public/images NOT FOUND" && \
    test -f public/images/headshot.jpeg && echo "✓ headshot.jpeg EXISTS" || echo "✗ headshot.jpeg MISSING" && \
    echo "File count:" && find public/images -type f 2>/dev/null | wc -l || echo "0"

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
