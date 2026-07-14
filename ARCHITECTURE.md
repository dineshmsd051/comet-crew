


Here is the complete, production-ready project structure document in the recommended Markdown format — ready to paste directly into your `README.md`.

---

````md
# 🛍️ shop-monorepo

> **Nx v21+ · Next.js 15 App Router · Multi-Zone Microfrontends · Tailwind CSS v4 · TypeScript**

A production-ready shopping application built as a multi-zone microfrontend system.  
Each zone is an independent Next.js process, orchestrated through a single shell gateway.

---

## 🏗️ Architecture Overview

```
Browser → shell (:3000) ──rewrites──► products (:3001)  /products/*
                         ──rewrites──► checkout (:3002)  /checkout/*

State shared via localStorage["shop_cart"] (same browser origin)
Cross-zone navigation  → <a href="...">   (hard navigation)
Within-zone navigation → <Link href="..."> (soft SPA navigation)
```

---

## 📂 Project Structure

```text
shop-monorepo/
│
│── 📁 apps/                              # Deployable Next.js zone applications
│   │
│   ├── 📁 shell/                         # Zone 0 · Host Gateway · Port 3000
│   │   ├── 📁 src/
│   │   │   └── 📁 app/                   # Next.js App Router root
│   │   │       ├── layout.tsx            # Root HTML shell + font imports
│   │   │       ├── page.tsx              # Marketing landing page (Server Component)
│   │   │       └── globals.css           # Tailwind v4 @import + @theme tokens
│   │   ├── .env.local                    # PORT=3000, HOSTNAME=127.0.0.1
│   │   ├── next.config.js                # ⭐ Rewrite proxy → products & checkout
│   │   ├── postcss.config.js             # @tailwindcss/postcss plugin
│   │   ├── project.json                  # Nx target overrides (port: 3000)
│   │   ├── tsconfig.json                 # Extends root tsconfig.base.json
│   │   └── package.json                  # next dev --port 3000
│   │
│   ├── 📁 products/                      # Zone 1 · Product Catalog · Port 3001
│   │   ├── 📁 src/
│   │   │   └── 📁 app/                   # basePath: /products
│   │   │       ├── layout.tsx            # Products zone root layout
│   │   │       ├── page.tsx              # Product grid (Server Component)
│   │   │       ├── product-grid.tsx      # Interactive grid (Client Component)
│   │   │       ├── globals.css           # Tailwind v4 @import + @source paths
│   │   │       └── 📁 [id]/
│   │   │           ├── page.tsx          # Product detail page (Server Component)
│   │   │           └── product-detail-client.tsx  # Add-to-cart (Client Component)
│   │   ├── .env.local                    # PORT=3001, HOSTNAME=127.0.0.1
│   │   ├── next.config.js                # ⭐ basePath: '/products'
│   │   ├── postcss.config.js             # @tailwindcss/postcss plugin
│   │   ├── project.json                  # Nx target overrides (port: 3001)
│   │   ├── tsconfig.json                 # Extends root tsconfig.base.json
│   │   └── package.json                  # next dev --port 3001
│   │
│   └── 📁 checkout/                      # Zone 2 · Cart & Checkout · Port 3002
│       ├── 📁 src/
│       │   └── 📁 app/                   # basePath: /checkout
│       │       ├── layout.tsx            # Checkout zone root layout
│       │       ├── page.tsx              # Checkout page (Server Component)
│       │       ├── cart-review.tsx       # Cart UI + order flow (Client Component)
│       │       └── globals.css           # Tailwind v4 @import + @source paths
│       ├── .env.local                    # PORT=3002, HOSTNAME=127.0.0.1
│       ├── next.config.js                # ⭐ basePath: '/checkout'
│       ├── postcss.config.js             # @tailwindcss/postcss plugin
│       ├── project.json                  # Nx target overrides (port: 3002)
│       ├── tsconfig.json                 # Extends root tsconfig.base.json
│       └── package.json                  # next dev --port 3002
│
│── 📁 libs/                              # Shared libraries (no standalone servers)
│   │
│   └── 📁 shared/                        # Cross-zone shared domain
│       │
│       ├── 📁 ui/                        # @shop-monorepo/shared-ui
│       │   ├── 📁 src/
│       │   │   ├── 📁 lib/
│       │   │   │   ├── button.tsx        # <Button> — variants, sizes, loading state
│       │   │   │   ├── card.tsx          # <Card> — product card with rating & CTA
│       │   │   │   └── header.tsx        # <Header> — cross-zone nav + cart badge
│       │   │   └── index.ts              # Barrel export for all UI components
│       │   ├── tsconfig.json             # jsx: react-jsx, strict: true
│       │   └── package.json              # name: @shop-monorepo/shared-ui
│       │
│       └── 📁 state/                     # @shop-monorepo/shared-state
│           ├── 📁 src/
│           │   ├── 📁 lib/
│           │   │   └── use-cart.ts       # useCart() hook — localStorage cart sync
│           │   └── index.ts              # Barrel export (useCart, CartItem, CartState)
│           ├── tsconfig.json             # strict: true
│           └── package.json              # name: @shop-monorepo/shared-state
│
│── 📁 .github/
│   └── 📁 workflows/
│       └── ci.yml                        # Nx affected CI pipeline
│
├── nx.json                               # ⭐ Nx plugins, targetDefaults, continuous tasks
├── tsconfig.base.json                    # ⭐ Root TS config + path aliases
├── project.json                          # Workspace-level dev-all orchestration target
├── package.json                          # ⭐ Root scripts: dev, build, lint, typecheck
└── .env                                  # Shared env defaults (committed, non-secret)
```

---

## 🔑 Key File Responsibilities

| File | Purpose |
|------|---------|
| `apps/shell/next.config.js` | Rewrite proxy — routes `/products*` → `:3001`, `/checkout*` → `:3002` |
| `apps/products/next.config.js` | Sets `basePath: '/products'` so all assets self-prefix |
| `apps/checkout/next.config.js` | Sets `basePath: '/checkout'` so all assets self-prefix |
| `libs/shared/ui/src/lib/header.tsx` | Global nav — uses `<a>` for cross-zone, `<Link>` within zone |
| `libs/shared/state/src/lib/use-cart.ts` | `localStorage` cart sync across all zones + `StorageEvent` listener |
| `nx.json` | Marks `dev` as `continuous: true`; registers `@nx/next/plugin` for task inference |
| `tsconfig.base.json` | Defines `@shop-monorepo/shared-ui` and `@shop-monorepo/shared-state` path aliases |
| `project.json` (root) | `dev-all` target using `nx:run-commands` + `wait-on` to enforce boot order |

---

## 🧩 Library Dependency Graph

```
apps/shell
  └── @shop-monorepo/shared-ui     (Header, Button)
  └── @shop-monorepo/shared-state  (useCart)

apps/products
  └── @shop-monorepo/shared-ui     (Header, Card, Button)
  └── @shop-monorepo/shared-state  (useCart)

apps/checkout
  └── @shop-monorepo/shared-ui     (Header, Button)
  └── @shop-monorepo/shared-state  (useCart)

libs/shared/ui
  └── @shop-monorepo/shared-state  (useCart — for Header cart badge)

libs/shared/state
  └── (no internal dependencies)
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20.x |
| npm | ≥ 10.x |
| Nx CLI | v21+ (via `npx nx`) |

### Installation

```bash
# Clone and install
git clone https://github.com/your-org/shop-monorepo.git
cd shop-monorepo
npm install
```

### Development

```bash
# Start all 3 zones in parallel (recommended)
# zones boot in order: products → checkout → shell (wait-on enforced)
npm run dev

# Start individual zones
npm run dev:shell       # http://127.0.0.1:3000
npm run dev:products    # http://127.0.0.1:3001  (direct access)
npm run dev:checkout    # http://127.0.0.1:3002  (direct access)
```

> **Access the full app via the shell gateway only:**  
> `http://localhost:3000` → Landing page  
> `http://localhost:3000/products` → Product catalog (proxied to :3001)  
> `http://localhost:3000/checkout` → Cart & checkout (proxied to :3002)

### Production Build

```bash
# Build all zones
npm run build

# Build only changed zones (CI-optimised)
npm run build:affected
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all 3 zones in parallel with enforced boot order |
| `npm run dev:shell` | Start shell zone only (port 3000) |
| `npm run dev:products` | Start products zone only (port 3001) |
| `npm run dev:checkout` | Start checkout zone only (port 3002) |
| `npm run build` | Production build all zones |
| `npm run build:affected` | Build only Nx-affected projects (CI) |
| `npm run typecheck` | Full monorepo TypeScript check |
| `npm run lint` | Lint all projects |
| `npm run lint:affected` | Lint only changed projects |
| `npm run graph` | Open Nx dependency graph in browser |
| `npm run reset` | Clear Nx cache + reset daemon |

---

## 🌐 Port Reference

| Zone | Port | Base Path | Direct URL | Via Shell |
|------|------|-----------|------------|-----------|
| shell | 3000 | `/` | `http://localhost:3000` | — |
| products | 3001 | `/products` | `http://localhost:3001/products` | `http://localhost:3000/products` |
| checkout | 3002 | `/checkout` | `http://localhost:3002/checkout` | `http://localhost:3000/checkout` |

---

## 🧭 Navigation Rules

```
┌─────────────────────────────────────────────────────────┐
│  Cross-zone  →  <a href="/products">                    │
│               Use plain HTML anchor tag                  │
│               Forces full page reload (new zone bundle)  │
│                                                         │
│  Within-zone →  <Link href="/products/123">             │
│               Use Next.js Link component                 │
│               Soft client-side navigation (no reload)   │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | [Nx v21+](https://nx.dev) |
| Framework | [Next.js 15](https://nextjs.org) — App Router |
| Language | [TypeScript 5.5](https://www.typescriptlang.org) — strict mode |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config |
| State | `localStorage` + native `StorageEvent` API |
| Architecture | [Next.js Multi-Zones](https://nextjs.org/docs/advanced-features/multi-zones) |

---

## ⚠️ Common Issues

<details>
<summary><strong>ECONNREFUSED when navigating to /products or /checkout</strong></summary>

Three potential causes:

1. **Zone not running** — Make sure all 3 zones are started with `npm run dev`
2. **IPv6 trap** — Ensure `next.config.js` rewrites use `127.0.0.1` not `localhost`
3. **Boot race** — The `wait-on` in `project.json` handles this automatically

```bash
# Verify zones are live
curl -I http://127.0.0.1:3001/products
curl -I http://127.0.0.1:3002/checkout
```

</details>

<details>
<summary><strong>Tailwind classes not applying</strong></summary>

Ensure each app's `globals.css` has correct `@source` paths pointing to both  
the app's own `src/` folder and `libs/shared/ui/src`:

```css
@import "tailwindcss";
@source "../../../apps/shell/src";
@source "../../../libs/shared/ui/src";
```

</details>

<details>
<summary><strong>Cart count not updating across zones</strong></summary>

The `useCart` hook is a `"use client"` component. Ensure any component using it  
is inside a Client Component boundary. The `Header` component already handles this.

</details>

---

## 📄 License

MIT © 2026 ShopZone, Inc.
````

---

### 💡 Tips for Using This in Your Repository

| Action | Command |
|--------|---------|
| Save as `README.md` at workspace root | `shop-monorepo/README.md` |
| Preview locally in VS Code | `Ctrl+Shift+V` / `Cmd+Shift+V` |
| Auto-generate fresh tree | `tree -I "node_modules\|.next\|dist\|.git" -L 4` |
| Render on GitHub | Push to repo — GitHub renders it automatically |

The `<details>` collapsible sections keep the README clean for new readers while preserving full debugging information for experienced contributors.