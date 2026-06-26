# Deploying PESTOSOT

- **Frontend (`apps/web`) → Vercel** (Next.js).
- **API (`apps/api`)** → **Vercel serverless** (Option A, below) *or* **Railway/Render/Fly** via the Dockerfile (Option B).

---

## Option A — API on Vercel (NestJS preset)

Vercel's built-in **NestJS** framework preset wraps `src/main.ts` into a serverless function automatically — no custom adapter needed.

**Important:** serverless functions open a DB connection per cold start, so use a **pooled Postgres** — [Neon](https://neon.tech) (pooled connection string) or [Supabase](https://supabase.com) (port `6543`, pgbouncer). A raw single-connection Postgres will exhaust connections.

1. Create the API project on Vercel: import `kssumeet/PESTOSOT`, **Root Directory = `apps/api`**, **Framework Preset = NestJS**.
2. Provision a **pooled Postgres** (Neon/Supabase). Keep both the **pooled** URL (runtime) and the **direct** URL (migrations).
3. **Environment Variables** (Project → Settings → Environment Variables → all environments):
   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | the **pooled** connection string |
   | `JWT_SECRET` | 32+ char random (`openssl rand -hex 48`) — **required, the API refuses to boot without it** |
   | `JWT_EXPIRES_IN` | `7d` |
   | `WEB_ORIGIN` | the frontend URL, e.g. `https://pestosot.vercel.app` |
   | `COOKIE_SAMESITE` | `none` (frontend & API are different `*.vercel.app` sites) |
4. **Run migrations once** (serverless can't migrate on boot) — from your machine, against the **direct** URL:
   ```bash
   cd apps/api
   DATABASE_URL="<DIRECT_postgres_url>" bunx prisma migrate deploy
   DATABASE_URL="<DIRECT_postgres_url>" bun run seed   # creates the admin user
   ```
5. **Deploy.** Test: `https://<api>.vercel.app/health` → `{"status":"ok"}`.

> Notes: `prisma generate` runs automatically via the `postinstall` hook. `schema.prisma` already targets `rhel-openssl-3.0.x` (Vercel's runtime) — if you see "engine not found", add `rhel-openssl-1.0.x` to `binaryTargets` and redeploy. If the build still says *"No entrypoint found which imports nestjs"*, make sure the Framework Preset is **NestJS** and Root Directory is **apps/api**.

Then deploy the **web** (next section) and set its `NEXT_PUBLIC_API_URL` to the API's Vercel URL.

---

## Option B — API on Railway / Render / Fly (Docker)

The Dockerfile runs a persistent server and applies migrations on start (`start:prod`). Works on any container host.

### Railway

1. **New Project → Deploy from GitHub repo** → select `kssumeet/PESTOSOT`.
2. In the service **Settings → Root Directory**, set `apps/api`. Railway will use `apps/api/Dockerfile` and `apps/api/railway.json` automatically (Docker build, `/health` healthcheck).
3. **Add a Postgres database**: New → Database → PostgreSQL. Railway exposes `DATABASE_URL`.
4. **Service → Variables** — set:
   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | reference the Postgres plugin's connection string |
   | `JWT_SECRET` | 32+ char random (`openssl rand -hex 48`) — **required, API won't boot without it** |
   | `JWT_EXPIRES_IN` | `7d` |
   | `WEB_ORIGIN` | your Vercel URL, e.g. `https://pestosot.vercel.app` |
   | `COOKIE_SAMESITE` | `none` (frontend and API are on different domains) |
   | `NODE_ENV` | `production` (Railway usually sets this) |
   | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | for the first admin |
   *(SMTP_* optional — blank logs lead emails to the server console.)*
5. **Deploy.** The container runs `prisma migrate deploy` on start, so the schema is applied automatically.
6. **Seed the admin once** — in the service shell: `bun run seed`.
7. Note the public API URL (e.g. `https://pestosot-api.up.railway.app`).

## Web on Vercel (used with either option)

1. **New Project** → import `kssumeet/PESTOSOT` → **Root Directory: `apps/web`** (Framework: Next.js — auto-detected).
2. **Environment Variables**:
   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | the deployed API URL from Option A or B (no trailing slash) |
   | `NEXT_PUBLIC_SITE_URL` | your Vercel URL |
3. **Deploy.** Then make sure the API's `WEB_ORIGIN` matches the final web URL.

## 3. Cookies across domains

The session is an httpOnly cookie set by the API. For a `*.vercel.app` + `*.railway.app` split (different sites), set **`COOKIE_SAMESITE=none`** on the API so the browser sends it cross-site (Secure is forced on automatically over HTTPS). CORS still restricts calls to `WEB_ORIGIN`.

**Cleaner production option:** put both under one parent domain — `pestosot.com` (web) and `api.pestosot.com` (API). Then set `COOKIE_DOMAIN=.pestosot.com`, leave `COOKIE_SAMESITE` at the default `strict`, and point `NEXT_PUBLIC_API_URL` at `https://api.pestosot.com`.

## Local production test (optional)

```bash
cd apps/api
docker build -t pestosot-api .
docker run --rm -p 4000:4000 \
  -e DATABASE_URL="postgresql://pestosot:pestosot@host.docker.internal:5544/pestosot?schema=public" \
  -e JWT_SECRET="$(openssl rand -hex 48)" \
  -e WEB_ORIGIN="http://localhost:3001" \
  pestosot-api
```
