# Installation

## Requirements

- Node.js 26 LTS (see `.nvmrc`)
- npm 10+
- Git

## Local setup

```bash
nvm install
nvm use
npm install
cp .env.example .env
npm run dev
```

Health: `GET http://localhost:3000/api/v1/health`  
Liveness: `GET http://localhost:3000/health/live`  
OpenAPI UI: `http://localhost:3000/api-docs`

> The initial scaffold does not include a generated lockfile. Run `npm install` once in a network-enabled environment, commit the generated `package-lock.json`, and then use `npm ci` in CI and deployment pipelines.
