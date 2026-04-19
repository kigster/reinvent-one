[![Test](https://github.com/kigster/reinvent-one/actions/workflows/test.yml/badge.svg)](https://github.com/kigster/reinvent-one/actions/workflows/test.yml)

# ReinventONE 2.0

Marketing site for [ReinventONE, Inc.](https://reinvent.one) — Konstantin Gredeskoul's AI/engineering consultancy. Built with Next.js (App Router) compiled to a fully static site, with TailwindCSS for styling and assistance from Claude AI.

## Stack

- **Next.js 16** (App Router) with `output: 'export'` — produces a 100% static bundle in `out/`
- **React 19**, **TypeScript 5.9**
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Vitest 4** for tests in `scripts/` and `src/`
- **Volta** for pinning the Node toolchain version
- **just** as a thin task runner over `npm` scripts

No server runtime is required at deploy time — only static files.

## Prerequisites

- [Node.js](https://nodejs.org/) (managed via [Volta](https://volta.sh) — `volta install node` will pick up the version pinned in `package.json`)
- [npm](https://www.npmjs.com/) (also managed by Volta)
- [just](https://github.com/casey/just) (`brew install just`) — optional but recommended
- An SSH key whose corresponding IP is whitelisted on the EC2 host (deploy only, see [Deployment](#deployment))

## Local Development

First-time setup:

```bash
just sync          # installs Node + npm via Volta, then `npm install`
# or, without just:
npm install
```

Run the dev server:

```bash
just run           # opens http://localhost:3000/ in your browser and starts `next dev`
# or:
npm run dev
```

The site is then available at <http://localhost:3000/>. Hot-module reload is enabled — edits to anything under `src/` reload instantly.

### Useful commands

| Command          | Description                                                                  |
|------------------|------------------------------------------------------------------------------|
| `just run`       | Install deps and start the dev server (opens browser automatically)          |
| `just test`      | Run the Vitest suite                                                         |
| `just lint`      | Run `next lint`                                                              |
| `just convert`   | Rebuild the open-source data pipeline (`kigster.repositories.json` → TS)     |
| `just clean`     | Remove the local `out/` static export                                        |
| `just deploy`    | Deploy the site (see [Deployment](#deployment))                              |
| `just tag`       | Tag the current commit with `v$(version)` from `package.json` and push tags  |
| `npm run build`  | Produce a static export to `out/` (no dev server)                            |

### Project layout

```
src/
  app/             — Next.js App Router entry (layout.tsx, page.tsx, globals.css)
  components/      — One file per page section (Hero, Services, About, Portfolio, …)
  data/            — Static content (talks.ts, clients.ts, team.ts, footer.ts)
  lib/             — Open-source data pipeline + types
scripts/           — Build-time data conversion scripts (with Vitest tests)
public/            — Static assets served as-is (images, downloads, fonts)
```

## Building for Production

```bash
npm run build
```

Output goes to `out/`. That directory is the entire deployable artifact — drop it behind any static web server (nginx, S3, Cloudfront, GitHub Pages, etc.).

## Deployment

The production site is hosted on a single **AWS EC2 instance** at `kig.re` and served as static files via the system web server. Deployments are pull-based: the deploy script SSHes into the host, pulls the latest `main`, runs `npm install`, and rebuilds the static `out/` directory in place.

### One-line deploy

```bash
just deploy
```

Under the hood this runs roughly:

```bash
ssh kig@kig.re "cd /home/kig/workspace/reinvent-one && \
                mv out out.pre-deploy && ln -nfs out.pre-deploy out"
ssh kig@kig.re "cd /home/kig/workspace/reinvent-one && \
                git pull && npm install && rm -f out && npm run build"
```

The previous build is preserved as `out.pre-deploy` so you can manually roll back if a build is broken.

### IP whitelisting (important)

The EC2 instance restricts SSH (port 22) at the **AWS Security Group** level to a small allow-list of source IPs. **Your current public IP must be on that list before `just deploy` will work** — otherwise the SSH connection will hang and time out.

If you are deploying from a new location or your ISP has rotated your IP:

1. Find your current public IP (`curl ifconfig.me`).
2. Add it to the EC2 instance's Security Group inbound rule for port 22 in the AWS Console (region: check the instance's metadata).
3. Retry `just deploy`.

If you do not have AWS console access, ask Konstantin to whitelist your IP.

### Tagging a release

After a successful deploy, tag the release:

```bash
just tag           # tags v$(package.json version) and pushes tags to origin
```

## Notes

- **Path alias:** `@/*` resolves to `./src/*` (configured in `tsconfig.json`).
- **Images** are served unoptimized — required by the `output: 'export'` static build constraint.
- **GA**: gtag `G-SBSJZBV4E9` is wired up in `src/app/layout.tsx`.
- The `OpenSource` section is dynamically imported (SSR enabled) to keep the initial bundle lean.
