# Base image with pnpm pre-installed
FROM node:20-alpine AS base
RUN npm install -g pnpm@latest
WORKDIR /app

# Dependencies stage - cached layer
FROM base AS deps
COPY package*.json ./
RUN pnpm install --frozen-lockfile --prod=false

# Build stage
FROM base AS builder
COPY package*.json ./
RUN pnpm install --frozen-lockfile --prod=false
COPY . .
RUN pnpm run build:no-lint

# Production stage - minimal image
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3366
ENV PORT=3366
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]