

```markdown
# ☄️ Comet Club — T-Shirt Shop

> **Premium streetwear, delivered at the speed of light.**

Comet Club is a modern e-commerce frontend for a premium T-shirt brand built as a **Next.js Multi-Zone Microfrontend** inside an **Nx Monorepo**. The application is split into three independent zones — a marketing shell, a product catalog, and a checkout flow — all unified under a single URL and powered by shared UI components and cross-zone cart state.

---

## 🌌 What is Comet Club?

Comet Club is a streetwear brand born from the idea that bold design should feel effortless. Every drop is crafted for those who move fast, think bold, and wear their identity on their sleeve — literally.

This repository contains the **complete frontend codebase** powering the Comet Club shopping experience, serving as a production-grade reference for scalable, independently deployable microfrontend systems.

---

## 🏗️ Architecture

The application is split into three independent Next.js apps (zones), each owning a specific domain:

```
http://localhost:3000          →  Shell     (landing page, gateway)
http://localhost:3000/products →  Products  (catalog, product detail)
http://localhost:3000/checkout →  Checkout  (cart, order placement)
```

All traffic enters through the **Shell** on port `3000`. It transparently proxies `/products*` and `/checkout*` requests to their respective zone processes using Next.js `rewrites`. The browser always sees a single unified URL.

```
Browser → Shell (3000) → rewrites → Products Zone (3001)
                                 → Checkout Zone  (3002)
```

Shared UI components (Button, Card, Header) and cart state (via `localStorage`) live in `libs/` and are consumed by all three zones.

---

## 📁 Project Structure

```
shop-monorepo/
├── apps/
│   ├── shell/         # Zone 0 · Landing page & gateway proxy  → port 3000
│   ├── products/      # Zone 1 · Product catalog & detail       → port 3001
│   └── checkout/      # Zone 2 · Cart review & order placement  → port 3002
│
├── libs/
│   └── shared/
│       ├── ui/        # Shared Tailwind components (Button, Card, Header)
│       └── state/     # Cross-zone localStorage cart (useCart hook)
│
├── package.json       # Root scripts
├── nx.json            # Nx workspace config
└── tsconfig.base.json # Shared TypeScript path aliases
```

---

## ⚡ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Nx](https://nx.dev) | `^21` | Monorepo orchestration & task caching |
| [Next.js](https://nextjs.org) | `^15` | App Router, SSR, Multi-Zone rewrites |
| [React](https://react.dev) | `^18.3` | UI component model |
| [TypeScript](https://www.typescriptlang.org) | `~5.5` | Strict typing across all zones |
| [Tailwind CSS](https://tailwindcss.com) | `^4` | Utility-first CSS styling |

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 10.x`

---

### 1. Clone the repository

```bash
git clone https://github.com/your-org/comet-club-shop.git
cd comet-club-shop
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create environment files

Each zone requires a `.env.local` file to bind to the correct port and avoid IPv6 connection errors.

**`apps/shell/.env.local`**
```bash
PORT=3000
HOSTNAME=127.0.0.1
PRODUCTS_ZONE_URL=http://127.0.0.1:3001
CHECKOUT_ZONE_URL=http://127.0.0.1:3002
```

**`apps/products/.env.local`**
```bash
PORT=3001
HOSTNAME=127.0.0.1
```

**`apps/checkout/.env.local`**
```bash
PORT=3002
HOSTNAME=127.0.0.1
```

---

### 4. Start the development server

```bash
npm run dev
```

This starts all three zones concurrently. The `products` and `checkout` zones boot first, and the `shell` starts only after both ports are confirmed ready (using `wait-on`), preventing proxy connection errors.

Once running, open **http://localhost:3000** in your browser.

---

## 🖥️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start all 3 zones in parallel |
| `npm run dev:shell` | Start shell zone only |
| `npm run dev:products` | Start products zone only |
| `npm run dev:checkout` | Start checkout zone only |
| `npm run build` | Build all zones for production |
| `npm run typecheck` | TypeScript check across the monorepo |
| `npm run lint` | Lint all projects |
| `npm run graph` | Open Nx project dependency graph |
| `npm run reset` | Clear Nx cache |

---

## 🌐 Routes

| URL | Description |
|---|---|
| `/` | Marketing landing page with hero section and CTAs |
| `/products` | Full product grid — browse all Comet Club T-shirts |
| `/products/:id` | Individual product detail page |
| `/checkout` | Cart review, quantity controls, and order placement |

---

## 🛒 How Cart State Works Across Zones

Each zone is an independent Next.js process with no shared memory. Cart state is persisted in **`localStorage`** under the key `shop_cart` so it survives navigation between zones.

```
User adds item in /products
        ↓
useCart() writes to localStorage["shop_cart"]
        ↓
User navigates to /checkout  ← hard navigation (<a> tag)
        ↓
Checkout zone boots, reads localStorage["shop_cart"]
        ↓
Cart items appear instantly ✅
```

The `useCart` hook also subscribes to the browser's `storage` event so the cart badge in the header updates in real time without a page refresh.

---

## 🔗 Navigation Rules

This is the most important rule in a Multi-Zone app:

```tsx
// ✅ Cross-zone → always use a plain <a> tag (forces hard navigation)
<a href="/checkout">Go to Checkout</a>

// ✅ Within the same zone → use Next.js <Link> (soft client-side navigation)
import Link from 'next/link';
<Link href="/products/comet-tee-001">View Product</Link>
```

Using `<Link>` across zones causes broken navigation because each zone has its own independent React and Next.js runtime.

---

## 🐛 Troubleshooting

### `ECONNREFUSED` proxy error

**Cause:** The shell tried to proxy to a zone that is not yet running or bound to a different address.

**Fix:**
1. Ensure all three zones are running (`npm run dev` starts all three)
2. Confirm `.env.local` files exist in each app with `HOSTNAME=127.0.0.1`
3. Use `127.0.0.1` instead of `localhost` in `apps/shell/next.config.js` rewrites — Node.js 17+ resolves `localhost` to IPv6 (`::1`) which may not match the zone's binding

---

### Zone not found / 404 on `/products` or `/checkout`

**Cause:** The `basePath` in the zone's `next.config.js` does not match the rewrite destination in the shell.

**Fix:** Ensure:
- `apps/products/next.config.js` has `basePath: '/products'`
- `apps/checkout/next.config.js` has `basePath: '/checkout'`
- Shell rewrites destination paths include the basePath prefix (e.g., `http://127.0.0.1:3001/products`)

---

## 📄 License

MIT © 2026 Comet Club. All rights reserved.
```