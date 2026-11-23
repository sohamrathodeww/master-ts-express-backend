# Master 1 — Express + TypeScript REST API

A reusable backend foundation. The default database implementation will live on `feature/mysql-connection-panel`; this `main` branch remains database-independent.

## Quick start

```bash
nvm install && nvm use
npm install
cp .env.example .env
npm run dev
```

- API health: `GET /api/v1/health`
- Liveness: `GET /health/live`
- Swagger UI: `/api-docs`

## Quality gates

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
```

## Branch strategy

- `main`: shared, database-independent foundation.
- `feature/mysql-connection-panel`: MySQL + Sequelize complete application.
- `feature/postgres-connection-panel`: PostgreSQL + Prisma complete application.
- `feature/mongoose-connection-panel`: MongoDB + Mongoose complete application.

Create each database branch from a clean `main`. Do not merge database-specific branches together or back into `main`. Propagate shared fixes deliberately and test them independently on each branch.

## Current phase

Phase 1 foundation. Database, authentication, RBAC, i18n, Redis integration and domain modules are intentionally deferred to their approved phases.
