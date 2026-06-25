# PESTOSOT — Premium Pest Control & Deep Cleaning Platform

Bangalore-first, enterprise-grade lead-generation platform. Bun monorepo with a Next.js 15 frontend and a NestJS backend backed by PostgreSQL.

> **Package manager: Bun only.** Never use `npm`, `npx`, `pnpm`, or `yarn`. No `package-lock.json` should ever exist.

## Stack

| Layer    | Tech |
|----------|------|
| Frontend | Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis · React Three Fiber · Lottie · React Hook Form · Zod |
| Backend  | NestJS · Prisma · PostgreSQL · JWT + RBAC · Swagger · Helmet · Throttler · Nodemailer |
| Tooling  | Bun workspaces · Docker (Postgres) |

```
pestosot/
├── apps/
│   ├── web/        # Next.js frontend
│   └── api/        # NestJS backend
├── packages/
│   └── config/     # shared brand/business constants
└── docker-compose.yml
```

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.3
- Docker (for local Postgres) — or your own Postgres instance

## Setup

```bash
# 1. Install all workspace dependencies
bun install

# 2. Start Postgres
bun run db:up           # docker compose up -d db

# 3. Configure env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 4. Run migrations + seed (creates admin user + sample data)
bun run api:migrate     # prisma migrate dev
bun run api:seed
```

## Develop

```bash
# Terminal 1 — API (http://localhost:4000, Swagger at /api/docs)
bun run dev:api

# Terminal 2 — Web (http://localhost:3000)
bun run dev:web
```

## Common commands

```bash
bun install                    # install everything
bun add <pkg> --filter web     # add a dep to the web app
bun add <pkg> --filter api     # add a dep to the api
bun run typecheck              # typecheck both apps
bun run build:web              # production build (frontend)
bun run build:api              # production build (backend)
bun run db:up / db:down        # start / stop Postgres
```

## Lead flow (end-to-end)

1. Visitor submits the inspection form on the site.
2. Frontend `POST`s to `${NEXT_PUBLIC_API_URL}/leads`.
3. NestJS validates, persists a `Lead` row, and fires a notification email (logged to console in dev).
4. Authenticated staff read/manage leads via `GET /leads` / `PATCH /leads/:id` (JWT + RBAC).

Seeded admin login (change in `.env`): `admin@pestosot.com` / `Admin@12345`.

## Roadmap (post Phase 1)

Service / location / industry / blog page breadth · admin dashboard & CRM UI · blog CMS with rich editor · media library · full SEO page generation. The current architecture is built to absorb these without a rewrite.
