# reinvent.one — Project Guide

## What Is This

Static marketing site for **ReinventONE, Inc.** (Konstantin's AI/engineering consultancy) at <https://reinvent.one>.

## Stack

- **Next.js 16** (App Router) with `output: 'export'` — static HTML build to `out/`
- **React 19**, **TypeScript 5.9**
- **Tailwind CSS 4** via `@tailwindcss/postcss` (PostCSS plugin, not the old config-based setup)
- **Vitest 4** — tests live in `scripts/` (`scripts/**/*.test.ts`)
- **Google Analytics** — gtag `G-SBSJZBV4E9` injected in `layout.tsx`

## Project Layout

```
src/
  app/
    layout.tsx        — Root layout, metadata, GA scripts
    page.tsx          — Single-page site: Header → Hero → Services → About → Portfolio → OpenSource → Contact → Footer
    globals.css       — Tailwind directives, Google Fonts import, diagonal section styles
  components/         — One file per section (Hero, Services, About, Portfolio, OpenSource, Contact, Header, Footer)
  data/               — Static data (clients.ts, team.ts, company.ts, footer.ts)
  lib/
    openSourceTypes.ts          — RepoProject interface
    openSourceData.ts           — getOpenSourceProjects() loader
    openSourceData.generated.ts — Auto-generated from repo JSON
    kigster.repositories.json   — Raw GitHub repo data
    component.repositories.json — Processed repo data
scripts/              — Build-time data pipeline: JSON → component JSON → TypeScript
public/images/        — backgrounds/, clients/, team/, re1/favicon/
public/downloads/     — Downloadable assets (e.g. presentation slides)
```

## Key Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Static export to `out/` |
| `npm run test` | Vitest (scripts tests) |
| `npm run convert` | Rebuild open-source data pipeline (JSON → TS) |
| `just run` | Install deps + dev server |
| `just test` | Run tests |
| `just convert` | Run data conversion pipeline |

## Design System

- **Colors:** `brand-dark` (#1a1a2e), `brand-darker` (#16213e), `brand-accent` (#ff5000), `brand-light` (#f5f5f5)
- **Fonts:** Teko (headings), Open Sans (body), Abel (accent)
- **Diagonal sections** via CSS transforms (`.section-diagonal`, `.diagonal-dark`, etc.)

## Open Source Data Pipeline

1. `kigster.repositories.json` — raw GitHub API data
2. `scripts/convert-repos-to-component.ts` → `component.repositories.json` (cleaned/filtered)
3. `scripts/json-to-open-source-ts.ts` → `openSourceData.generated.ts` (typed TS export)
4. `openSourceData.ts` imports generated data and exposes `getOpenSourceProjects()`

## Deployment

Static export (`next build` → `out/`). No server runtime needed. Uses `volta` for Node version management.

## Notes

- Path alias: `@/*` → `./src/*`
- Images are unoptimized (static export constraint)
- OpenSource component is dynamically imported with SSR enabled
