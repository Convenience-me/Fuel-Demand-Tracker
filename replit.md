# ViscoFuel - Fake Door Landing Page

## Overview

A "fake door" landing page for ViscoFuel, an on-demand fuel delivery startup in Nairobi. The page looks like a real service but collects waitlist signups instead of actual orders, measuring demand through page views vs. signup conversion.

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

- Two-step waitlist flow:
  - Step 1: Select neighborhood + enter phone number → saved to DB immediately
  - Step 2: Modal asks for name → updates existing entry
- Page view tracking for conversion analytics
- Analytics summary endpoint (page views, signups, conversion rate)

## Database Tables

- `waitlist` — id, neighborhood, phone, name (nullable), created_at
- `page_views` — id, page, created_at

## API Endpoints

- `POST /api/waitlist` — Create waitlist entry (Step 1)
- `PATCH /api/waitlist/:id/name` — Update name (Step 2)
- `POST /api/analytics/track` — Track page view
- `GET /api/analytics/summary` — Get analytics summary
- `GET /api/healthz` — Health check

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
