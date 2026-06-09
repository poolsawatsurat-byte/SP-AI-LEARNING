# AGENTS.md

## Critical: Next.js 16

This is **Next.js 16.2.7**, not 14 or 15. APIs and conventions differ from training data. Read the bundled guides at `node_modules/next/dist/docs/` before writing code. `cacheComponents: true` in `next.config.ts` is a v16 feature.

## Commands

- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config)
- No `typecheck` script; run `npx tsc --noEmit` manually if needed
- **No test suite exists** — no test files, no test config, no test scripts

## Prisma

- Schema: `prisma/schema.prisma`
- Output: `generated/prisma` (gitignored — run `npx prisma generate` before build or type imports)
- Uses **driver adapter** pattern: `@prisma/adapter-mariadb` with `PrismaClient` from `../../generated/prisma/client`
- `prisma.config.ts` loads env via `dotenv/config`
- `DATABASE_URL` points to local MariaDB

## Auth

Uses **better-auth** (not NextAuth). Config in `src/lib/auth.ts`, client in `src/lib/auth-client.ts`. API route: `src/app/api/auth/[...all]/`.

## Architecture

```
src/
  app/
    (front)/     — public pages (home, product, course, cart, about)
    (auth)/      — login, signup (has own layout with Thai fonts)
    api/auth/    — better-auth catch-all route
  components/    — shared UI + shadcn/ui (src/components/ui/)
  lib/           — prisma, auth, utils, zustand cart store
  repositories/  — data-fetching classes (e.g., CourseRepository)
  services/      — business logic wrapping repositories
```

Route groups `(front)` and `(auth)` each have their own `layout.tsx` with different font setups. Don't merge them.

## UI Stack

- **shadcn/ui** — `components.json` uses `radix-luma` style, `remixicon` icons
- **Tailwind CSS v4** — PostCSS plugin `@tailwindcss/postcss`, no `tailwind.config.*` file
- **zustand** for client state (cart store in `src/lib/cart-store.ts`, persisted to localStorage as `skill-cart`)
- UI text is **Thai** (`lang="th"`)

## Path Aliases

`@/*` → `./src/*` (configured in `tsconfig.json`)

## Docker / Deploy

Multi-stage Dockerfile: `deps` → `builder` → `runner`. Standalone output. Copies `generated/` and `prisma/` into runner stage.

## ESLint

Flat config in `eslint.config.mjs`. Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.

##ข้อกำหนดหลัก
- แยก TypeScript Type ทุกอย่าง ออกไปไว้ที่โฟลเดอร์ scr/types
- การตั้งชื่อไฟล์ TypeScript (.ts) ให้ตั้งตามตัวอย่างนี้ คือ course-service.ts
- ห้ามใช้คำสั่ง npx prisma db push
