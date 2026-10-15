# AGENTS.md — ad-group-project-vamos (Laravel + Inertia + React)

## Project Root
All commands run from `vms/` directory.

## Stack
- **Laravel 11** (PHP 8.2+)
- **Inertia.js** + **React 18** (TypeScript) via Vite
- **Tailwind CSS** + **MUI** components
- **PestPHP** for testing
- **Laravel Pint** for code style

---

## Commands

| Task | Command |
|------|---------|
| **Full dev stack** (server + queue + vite) | `composer dev` |
| **Backend server** | `php artisan serve` |
| **Queue worker** | `php artisan queue:listen --tries=1` |
| **Frontend dev (Vite)** | `npm run dev` |
| **Build assets (prod)** | `npm run build` |
| **Run all tests** | `./vendor/bin/pest` or `php artisan test` |
| **Run single test file** | `./vendor/bin/pest tests/Feature/Auth/AuthenticationTest.php` |
| **Lint/format (Pint)** | `./vendor/bin/pint` |
| **Type-check TypeScript** | `npx tsc --noEmit` |
| **Migrations** | `php artisan migrate` |
| **Fresh migrate + seed** | `php artisan migrate:fresh --seed` |

---

## Testing
- Framework: **PestPHP** (extends `Tests\TestCase` with `RefreshDatabase`)
- Suites: `Unit` (`tests/Unit`), `Feature` (`tests/Feature`)
- Test env: `APP_ENV=testing`, SQLite in-memory (see `phpunit.xml`)
- Run single test: `./vendor/bin/pest --filter=testName`

---

## Environment Setup
```bash
cd vms
cp .env.example .env
php artisan key:generate
php artisan migrate
```
- Default DB: SQLite (`database/database.sqlite`)
- Queue: `database` driver (run `php artisan queue:listen`)
- Real-time: Pusher (`laravel-echo` + `pusher-js`)

---

## Key Paths & Aliases
- **Entry point**: `resources/js/app.tsx`
- **TS path aliases** (`tsconfig.json`):
  - `@/*` → `resources/js/*`
  - `ziggy-js` → `vendor/tightenco/ziggy`
- **Vite input**: `resources/js/app.tsx` (`vite.config.js`)

---

## Notable Packages
- `spatie/laravel-permission` — RBAC
- `barryvdh/laravel-dompdf` — PDF generation
- `laravel/sanctum` — API auth
- `inertiajs/inertia-laravel` + `@inertiajs/react` — SPA
- `tightenco/ziggy` — Laravel route helpers in JS

---

## Gotchas
- **Always run commands from `vms/`** — not repo root
- `composer dev` requires `concurrently` (in `package.json`)
- No CI/CD workflows configured (`.github/workflows/` empty)
- `APP_KEY` must be set in `.env` before running
- Queue jobs need `php artisan queue:listen` running for async work