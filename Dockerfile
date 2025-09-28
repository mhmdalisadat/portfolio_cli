FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build:no-lint

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install --prod
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./
COPY --from=build /app/next-i18next.config.ts ./
EXPOSE 3366
CMD ["pnpm", "start"]