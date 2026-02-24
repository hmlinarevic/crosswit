# Database setup (PostgreSQL)

The app uses **PostgreSQL** and **Prisma**. You need a database and a user for local dev and for the server.

## Format of `DATABASE_URL`

```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
```

- **USERNAME** – database user (e.g. `crosswit` or your system user).
- **PASSWORD** – that user’s password.
- **HOST** – `localhost` locally, or your server host/IP for production.
- **PORT** – usually `5432`.
- **DATABASE_NAME** – e.g. `crosswit`.

---

## 1. Local (development)

### Option A: PostgreSQL installed on your machine

1. **Create a user and database** (using the `postgres` superuser):

```bash
# Open the PostgreSQL shell (macOS: often 'psql postgres' or 'sudo -u postgres psql')
psql postgres

# In psql:
CREATE USER crosswit WITH PASSWORD 'your_secure_password';
CREATE DATABASE crosswit OWNER crosswit;
\q
```

2. **Set `.env`** in the project root:

```env
DATABASE_URL="postgresql://crosswit:your_secure_password@localhost:5432/crosswit?schema=public"
AUTH_SECRET="your-secret-from-openssl-rand-base64-32"
AUTH_URL="http://localhost:5001"
```

3. **Create tables** (first time and after schema changes):

```bash
cd /path/to/crosswit
npx prisma migrate dev --name init
```

If you already have migrations:

```bash
npx prisma migrate dev
```

### Option B: PostgreSQL in Docker

```bash
docker run -d --name crosswit-postgres \
  -e POSTGRES_USER=crosswit \
  -e POSTGRES_PASSWORD=your_secure_password \
  -e POSTGRES_DB=crosswit \
  -p 5432:5432 \
  postgres:16
```

Then in `.env`:

```env
DATABASE_URL="postgresql://crosswit:your_secure_password@localhost:5432/crosswit?schema=public"
```

Run migrations as in step 3 above.

---

## 2. Server (production)

1. **On the server**, create a dedicated user and database (e.g. as `postgres` or via your hosting panel):

```bash
# SSH into server, then:
sudo -u postgres psql

CREATE USER crosswit WITH PASSWORD 'strong_production_password';
CREATE DATABASE crosswit OWNER crosswit;
\q
```

2. **Set `DATABASE_URL` on the server** in the app directory:

- Either create `/home/hrvoje/apps/crosswit/.env` with:

  ```env
  DATABASE_URL="postgresql://crosswit:strong_production_password@localhost:5432/crosswit?schema=public"
  AUTH_SECRET="production-secret-from-openssl-rand-base64-32"
  AUTH_URL="https://your-domain.com"
  ```

- Or use your deploy workflow’s **ENV_FILE** secret (base64-encoded `.env`) so the pipeline writes `.env` on the server.

3. **Run migrations on the server** (once after deploy, or as part of deploy):

```bash
cd /home/hrvoje/apps/crosswit
npx prisma migrate deploy
```

Your `.github/workflows/deploy.yml` already runs `npx prisma migrate deploy` after `prisma generate`, so tables will be created/updated on deploy as long as `DATABASE_URL` is set.

---

## Quick checklist

| Step | Local | Server |
|------|--------|--------|
| Create DB user | `CREATE USER crosswit WITH PASSWORD '...';` | Same (as postgres or via panel) |
| Create database | `CREATE DATABASE crosswit OWNER crosswit;` | Same |
| Set `.env` | `DATABASE_URL=postgresql://...` (+ AUTH_*) | `.env` on server or ENV_FILE secret |
| Create tables | `npx prisma migrate dev` | `npx prisma migrate deploy` (or via deploy workflow) |

Use a **strong password** in production and keep `.env` (and ENV_FILE) out of git.
