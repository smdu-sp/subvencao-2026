# Stage 1: instalar e compilar dependências (inclui módulos nativos)
FROM node:20-slim AS deps
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: build da aplicação Next.js
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# Stage 3: imagem de produção mínima
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Arquivos públicos e output standalone do Next.js
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cliente Prisma gerado em caminho customizado (output = "../lib/prisma/")
COPY --from=builder --chown=nextjs:nodejs /app/lib/prisma ./lib/prisma

USER nextjs
EXPOSE 3301
ENV PORT=3301
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
