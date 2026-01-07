# Monorepo (pnpm + Vitest) — Affected packages CI

This repository contains two simple packages managed with **pnpm workspaces** and tested with **Vitest**. The CI workflow only runs tests for the packages affected by a change.

## Structure

```
monorepo-vitest-pnpm/
├─ .github/workflows/ci.yml
├─ package.json
├─ pnpm-workspace.yaml
├─ packages/
│  ├─ app-a/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ vitest.config.ts
│  │  ├─ src/index.ts
│  │  └─ tests/index.test.ts
│  └─ app-b/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vitest.config.ts
│     ├─ src/index.ts
│     └─ tests/index.test.ts
```

## Getting started

1. Install pnpm (if you don't have it): `npm i -g pnpm`
2. Install deps: `pnpm install`
3. Run all tests (locally): `pnpm -r test`
4. Run tests for a single package: `pnpm -F app-a test` or `pnpm -F app-b test`

## CI behavior

The workflow uses `dorny/paths-filter` to detect which workspace packages changed:

- If only files under `packages/app-a/**` changed → it runs tests for **app-a**.
- If only files under `packages/app-b/**` changed → it runs tests for **app-b**.
- If root config (`package.json`, `pnpm-workspace.yaml`, lockfile, or workflow) changed → it runs tests for **both** packages.

## Notes

- Dev dependencies (`vitest`, `typescript`) are declared at the root and shared by all packages.
- Each package defines its own `test` script and `vitest.config.ts` so tests can be executed independently.
- You can add more packages under `packages/` and extend the filter rules in `.github/workflows/ci.yml`.
