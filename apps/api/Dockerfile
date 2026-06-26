# PESTOSOT API — Bun + NestJS + Prisma
# Build context = apps/api (the API is self-contained; no workspace deps).
FROM oven/bun:1.3 AS build
WORKDIR /app

# Install dependencies (postinstall runs `prisma generate`).
COPY package.json ./
COPY prisma ./prisma
RUN bun install

# Compile (prisma generate && nest build -> dist/main.js)
COPY . .
RUN bun run build

# ---- runtime image ----
FROM oven/bun:1.3 AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV API_PORT=4000

# Bring over installed deps (incl. prisma CLI for `migrate deploy`), build output,
# the generated client and the schema/migrations.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 4000
# Apply pending migrations, then start the server.
CMD ["bun", "run", "start:prod"]
