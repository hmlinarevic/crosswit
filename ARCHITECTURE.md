# Crosswit – Full-Stack Next.js Architecture

Single Next.js 16 app: App Router, API routes, Auth.js v5, Prisma (PostgreSQL). No separate backend server.

## Stack

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Auth** | Auth.js v5 (Credentials: email + password) |
| **Database** | PostgreSQL + Prisma (User, GameScore, NextAuth tables) |
| **API** | Next.js Route Handlers under `app/api/` |

## Auth & User Data

- **Login / signup**: Auth.js in `auth.js`; routes: `app/api/auth/[...nextauth]`, `app/api/auth/register`.
- **Session**: JWT (no DB session table). Use `auth()` in server code and `useSession()` in client.
- **Users**: Stored in Prisma `User` (email, hashedPassword, name). Registration hashes passwords with bcrypt.

## Game & Leaderboard

- **Puzzle generation**: `lib/game/` (word-search + random-words). Exposed as:
  - **GET** `app/api/wordsearch/level/[level]` – returns `{ size, squares, insertedWords, timeAllocation }` for level 1–10.
- **Leaderboard**: Prisma `GameScore` (userId, level, score, timeLeft, wordsFound).
  - **GET** `app/api/scores` – leaderboard (query: `?limit=&level=`).
  - **POST** `app/api/scores` – submit score (requires auth).

## Directory Layout (conventions)

```
Root
├── app/                    # App Router (all routes + API)
│   ├── layout.js           # Root layout, metadata, providers
│   ├── page.js             # Home
│   ├── globals.css         # Global styles (only CSS entry)
│   ├── providers.js        # Client providers (Session, Theme, UserProfile)
│   ├── play/, about/, tutorial/   # Page routes
│   ├── auth/signin/, auth/signup/
│   └── api/                # Route Handlers
│       ├── auth/[...nextauth]/route.js
│       ├── auth/register/route.js
│       ├── scores/route.js
│       └── wordsearch/level/[level]/route.js
├── auth.js                 # Auth.js v5 config (root per Auth.js convention)
├── components/             # React UI components
├── context/               # React context (e.g. UserContext)
├── hooks/                  # Custom hooks (e.g. useCountdown)
├── lib/                    # Shared non-UI code
│   ├── prisma.js           # Prisma client singleton
│   └── game/               # Word-search puzzle logic (used by API only)
├── prisma/
│   └── schema.prisma       # DB schema
├── public/                 # Static assets
├── utils/                  # App helpers (e.g. calcGameScore)
├── jsconfig.json           # Path alias @/* → root
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Deployment

Deploy the **Next.js app** (build + `next start`). No separate backend process. Set env: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`. Use `.github/workflows/deploy.yml` for CI (SSH + PM2).

