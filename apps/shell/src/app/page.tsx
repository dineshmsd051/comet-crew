// apps/shell/src/app/page.tsx
// ─────────────────────────────────────────────────────────────────
// SHELL ZONE — Marketing Landing Page (Server Component)
// Cross-zone CTAs use <a> to force hard navigation to the Products
// and Checkout zones.
// ─────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { Header } from '@comet-crew/shared/ui';

export const metadata: Metadata = {
  title: 'Home',
};

const features = [
  {
    icon: '🚀',
    title: 'Lightning Fast Delivery',
    body: 'Same-day shipping on thousands of items — straight to your door.',
  },
  {
    icon: '🔒',
    title: 'Secure Checkout',
    body: 'Bank-grade encryption and multiple payment methods for your peace of mind.',
  },
  {
    icon: '↩️',
    title: '30-Day Easy Returns',
    body: 'Not happy? Return anything within 30 days, no questions asked.',
  },
  {
    icon: '🎁',
    title: 'Exclusive Member Deals',
    body: 'Sign up for free to unlock member-only discounts and early-access sales.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Header lives in the shell and is rendered on every shell page */}
      <Header activeZone="home" />

      <main className="flex flex-col">

        {/* ── Hero Section ──────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 px-6 py-24 sm:py-36 lg:px-8">
          {/* Decorative blob */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white/20 to-brand-100/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20">
              🛍️ New arrivals every week
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              Shop Smarter.<br />Live Better.
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-100 max-w-xl mx-auto">
              Discover thousands of products at unbeatable prices. From everyday
              essentials to premium finds — we've got it all.
            </p>

            {/* ⚠️ Cross-zone CTA: <a> forces hard navigation to Products zone */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/products"
                className="rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-700 shadow-lg hover:bg-brand-50 hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
              >
                Browse Products →
              </a>
              <a
                href="/checkout"
                className="rounded-xl bg-transparent px-8 py-3.5 text-base font-semibold text-white ring-2 ring-inset ring-white/70 hover:bg-white/10 transition-all duration-200"
              >
                View Cart
              </a>
            </div>
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Why Shop With Us?
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Built for modern shoppers who demand quality, speed, and simplicity.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-100 hover:ring-brand-200 hover:shadow-md transition-all"
              >
                <span className="text-4xl mb-4" role="img" aria-label={title}>{icon}</span>
                <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA Banner ──────────────────────────────────── */}
        <section className="bg-brand-600 px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-brand-100 text-lg mb-8 max-w-lg mx-auto">
            Join over 1 million happy customers already saving with ShopZone.
          </p>
          {/* ⚠️ Cross-zone: must use <a> */}
          <a
            href="/products"
            className="inline-block rounded-xl bg-white px-10 py-4 text-base font-extrabold text-brand-700 shadow-lg hover:bg-brand-50 transition-all"
          >
            Shop Now →
          </a>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} ShopZone, Inc. All rights reserved.
          &nbsp;·&nbsp;
          <a href="/products" className="hover:text-brand-600 transition-colors">Products</a>
          &nbsp;·&nbsp;
          <a href="/checkout" className="hover:text-brand-600 transition-colors">Cart</a>
        </p>
      </footer>
    </>
  );
}