# chealt starter

Local-first monorepo using Yarn workspaces, Astro + Vite + Web Components, and Cloudflare Workers with Turso sync.

## Stack

- Yarn workspaces (monorepo)
- Astro static site output
- Vanilla Web Components + CSS
- Cloudflare Worker API for sync
- IndexedDB-first client data model
- Turso/libSQL persistence in worker
- oxlint + oxfmt for linting/formatting

## Quick start

1. Install deps

```sh
yarn install
```

2. Run web and worker in parallel

```sh
yarn dev
```

3. Build all

```sh
yarn build
```

## Packages

- `packages/web`: Astro static frontend
- `packages/worker`: Cloudflare Worker sync API

## Environment

Copy examples and fill in values:

- `packages/worker/.dev.vars.example` -> `packages/worker/.dev.vars`
- `packages/web/.env.example` -> `packages/web/.env`

Worker vars:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `SYNC_API_KEY`

Web vars:

- `PUBLIC_SYNC_API_URL` (default `http://127.0.0.1:8787`)
- `PUBLIC_SYNC_API_KEY`

## Local-first flow

1. Web app writes records to IndexedDB immediately.
2. Records are marked `dirty`.
3. Background sync sends only dirty records to Worker.
4. Worker upserts records into Turso and returns acked ids.
5. Client marks those records clean.
