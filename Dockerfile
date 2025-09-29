
FROM node:20.8-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

FROM node:20.8-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3333

USER node

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]

FROM node:20.8-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=development

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
