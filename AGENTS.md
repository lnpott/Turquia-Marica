# AGENTS.md — Turquia Lanches

Compact instruction file for OpenCode sessions. Every line answers: "Would an
agent likely miss this without help?" If not, it's left out.

## Developer commands (honor these exact forms)

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once, after clone) |
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run lint` | Run ESLint on `src/`, `tests/`, config files |
| `npm run test` | Run Vitest unit tests (jsdom) |
| `npm run test:e2e` | Run Playwright E2E against dev server (builds first) |
| `npm run test:e2e:demo` | Build with `VITE_VISUAL_QA_DEMO=true` and run visual-QA E2E; generates screenshots into `documentacao/qa/etapa-28/` per viewport |
| `npm run build` | `vite build && npm run audit:demo-leak` — **fails** if demo sentinels leak into `dist/` |
| `npm run build:demo` | `VITE_VISUAL_QA_DEMO=true vite build` |
| `npm run check` | `npm run lint && npm run test && npm run build` — the gate before any commit/PR |
| `npm run audit:demo-leak` | Node script that scans `dist/` for visual-QA sentinels; exit 1 if leaked in production build |

**Order matters**: always `npm run check` before commit. The CI job `quality.yml` runs `npm run check` then `npm run test:e2e`.

## Architecture (code is source of truth)

- **Single-page app**: React 18 + React Router 7 + Vite 8. Only one `index.html`.
- **Hash navigation**: Home at `/`, sections via `#cardapio`, `#sobre`, `#localizacao`, `#reviews`. `/cardapio` and `/localizacao` are `<Navigate>` SPA fallbacks in `src/App.jsx:30-31` that redirect to `/#cardapio` / `/#localizacao`. No independent pages.
- **Three routes generate static HTML in `dist`**: per README, but the real pattern (per code + `BEST_PLAN.MD:matrix técnica`) is Home única with anchor sections. Trust `src/App.jsx` and `BEST_PLAN.MD:36` over README.
- **Data sources**: `src/data/contact.js` is the single source of commercial truth (address, hours, channels). `src/data/menu.js` categories + images. Never invent prices, hours, addresses, or reviews — missing data → `"NÃO DISPONÍVEL / EM CONSTRUÇÃO"` (per `contact.js` contract).
- **Demo data**: `src/data/menu.demo.js` contains fictitious products for isolated visual QA only. **Never import in public flow.** The build auditor `scripts/audit-demo-leak.mjs` will fail the build if demo sentinels appear in `dist/`.
- **Images**: All `alt` text must be truthful; no product should be attributed to a photograph it doesn't represent (per `BEST_PLAN.MD:38` and `ASSETS.md`).

## Environment & secrets

| Variable | Where used | Notes |
|---|---|---|
| `VITE_VISUAL_QA_DEMO` | Gates `/visual-qa-demo` route and demo imports | Must be `false` in public builds. Off by default (`.env.example:3`). |
| `GOOGLE_PLACE_ID`, `GOOGLE_MAPS_API_KEY` | `api/reviews.js` server-side function (Vercel) | Never commit these. `.env/` is gitignored. Set only in secure server/Vercel env. |
| `mcp_servers.json` | Local only — contains GitHub PAT | Gitignored per `.gitignore:21`. Not tracked in git. |

**Node version**: `.nvmrc` says `20.20.2`, but `package.json engines` says `22.x` and CI matrix uses Node 22. Use Node 22 to match `package.json` / CI. The `.nvmrc` is stale.

## Governance — BEST_PLAN.MD is the operative record

Per user constraint: **"Tudo é registrado no arquivo BEST_PLAN.MD os planos, execução, o que foi feito e o que está pendente."**

- **Branch workflow** (from `BEST_PLAN.MD:8-13`):
  1. Update `origin/main`.
  2. Create a branch specific for the lote (e.g., `lote-27`).
  3. Validate locally (`npm run check`, `npm run test:e2e`, axe, screenshots).
  4. Open PR to `main`.
  5. Merge only after approval.
  - **Never implement directly on `main`.**
  - **Update `BEST_PLAN.MD` in the same commit** as the batch (rule: same commit).

- **States vocabulary**: `NÃO INICIADO`, `AGUARDANDO DECISÃO`, `BLOQUEADO`, `EM EXECUÇÃO`, `EM AUDITORIA`, `VALIDADO`, `CONCLUÍDO`.

- **Precedence** (from `BEST_PLAN.MD:62-66`): code/Git current → `BEST_PLAN.MD` → `Roadmap_Mestre_CLAUDE.md` (historical).

- **Per-lote evidence**: screenshots in `documentacao/qa/*-lote-<n>-<desktop|mobile>.png`; audits in `documentacao/qa/AUDITORIA_LOTE_<n>.md`.

- **CI workflow** (`.github/workflows/quality.yml`): triggers on push to `BEST_ONE` branch AND pull_request. Uses Node 22, `npm ci`, `npm run check`, `npx playwright install --with-deps chromium`, then `npm run test:e2e`. Note: operative integration branch per governance is `main`; CI trigger on `BEST_ONE` is a legacy configuration.

## Testing quirks

- **Unit tests** (`npm run test`): Vitest with jsdom, `tests/**/*.test.{js,jsx}`. Setup in `tests/setup.js` (auto-cleanup after each test).
- **E2E tests** (`npm run test:e2e`): Playwright against a dev server that auto-builds + preview (`playwright.config.js:18`). Requires Chromium: `npx playwright install chromium`. Tests run against `baseURL http://127.0.0.1:4173`. Retries: 0 locally, 2 in CI. Reporter: `list` locally, `github` in CI.
- **Visual-QA E2E** (`npm run test:e2e:demo`): Builds with `VITE_VISUAL_QA_DEMO=true`, serves at `http://127.0.0.1:4174/__visual-qa`, generates per-viewport screenshots into `documentacao/qa/etapa-28/`. 5 viewports: 320, 390, 768, 1280, 1440.
- **Axe accessibility** (`@axe-core/playwright`): `"critical"` and `"serious"` violations must be zero in e2e tests.
- **Focus order**: e2e tests verify no empty `href="#"` links, no `ifood` links in public sections, focus restoration after Escape/navigation.

## Repo-specific conventions (differ from defaults)

- **Language**: Entire repo — docs, commit messages, test descriptions, code comments — is in **Portuguese (pt-BR)**. Agents should write in Portuguese.
- **Route sentinels**: `visual-qa-demo`, `menu.demo`, `isMock`, `shortDescription`, `longDescription`, `imageUrl` (defined in `scripts/audit-demo-leak.mjs:6`). These are the tokens the build auditor checks for.
- **`__visual-qa` vs `/visual-qa-demo`**: The old route namespace `__visual-qa` was renamed to `/visual-qa-demo` in Etapa 29 (`BEST_PLAN.MD:1270-1271`). The demo E2E spec and `playwright.demo.config.js` still reference `/__visual-qa` (outdated). The build audit uses `visual-qa-demo` sentinel. When working in the demo/QA flow, prefer `/visual-qa-demo` and the `visual-qa-demo` sentinel.
- **Menu component**: `src/components/menu/MenuSection.jsx` uses `<MenuHighlights showAll />` for Home (per `BEST_PLAN.MD:111-118`). `/cardapio` uses a different rendering. Do not swap these without referencing the lote plan.

## Quick sanity before you start

1. `git pull origin main`
2. `npm run check` — must be green. If not, stop and report.
3. If adding a new route/page/lote: create a new entry in `BEST_PLAN.MD` first, record the Estado, then implement. Update `BEST_PLAN.MD` in the same commit.
4. Run `npm run build` — verify no demo leaks.
5. Run `npm run test` and `npm run test:e2e` — verify nothing breaks.
6. Commit with a descriptive message; update `BEST_PLAN.MD` in that commit.

**When in doubt, consult `BEST_PLAN.MD` first** — it is the living operational record for this repository, per the user's focus constraint.