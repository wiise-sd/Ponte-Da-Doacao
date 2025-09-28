# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Usa npm ci para instalações determinísticas
RUN npm ci

COPY . .

RUN npm run build

# --- Stage 2: Production ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copia apenas as dependências de produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json .

EXPOSE 3333

CMD [ "node", "dist/server.js" ]
