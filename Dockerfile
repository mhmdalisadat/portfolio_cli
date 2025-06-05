# مرحله Build
FROM node:18-alpine AS builder

WORKDIR /app


ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]