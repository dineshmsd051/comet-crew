// apps/shell/src/app/page.tsx
'use client';

import type { Metadata } from 'next';
import { Header } from '@comet-crew/shared/ui';
import { Button } from '@comet-crew/shared/ui';

const theme = 'deep';

export default function HomePage() {
  return (
    <>
      <Header activeZone="home" theme={theme} />

      <main className="flex flex-col">

        {/* ── Hero Section ──────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-48 sm:pb-32 lg:pt-56">
          {/* Space background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-deep-void-900 via-deep-nebula-900 to-deep-void-900" />
            {/* Animated stars */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
            </div>
            {/* Gradient blob */}
            <div
              className="absolute -left-1/2 top-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-deep-void-500 to-deep-cosmic-500 opacity-20 blur-3xl"
              style={{ animation: 'float 8s ease-in-out infinite' }}
            />
          </div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="mb-6 inline-block rounded-full bg-deep-cosmic-500/20 px-4 py-2 text-sm font-semibold text-deep-cosmic-400 ring-1 ring-inset ring-deep-cosmic-500/50 backdrop-blur-sm">
              ✨ Cosmic Collections Now Available
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-deep-void-500 via-deep-cosmic-400 to-deep-void-500 mb-6 leading-tight">
              Comet Crew:
              <br />
              Wear the
              <br />
              Universe
            </h1>

            <p className="text-lg sm:text-xl text-deep-nebula-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium space-themed apparel designed for adventurers, dreamers, and cosmic enthusiasts.
              Each piece tells a story written in the stars.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="primary"
                size="lg"
                theme={theme}
                onClick={() => window.location.href = '/products'}
                className="w-full sm:w-auto"
              >
                🚀 Explore Collections →
              </Button>
              <Button
                variant="secondary"
                size="lg"
                theme={theme}
                onClick={() => window.location.href = '/checkout'}
                className="w-full sm:w-auto"
              >
                🛒 View Cart
              </Button>
            </div>

            {/* Featured badge */}
            <div className="flex items-center justify-center gap-4 pt-8 border-t border-deep-nebula-700">
              <div className="text-center">
                <p className="text-2xl font-black text-deep-cosmic-400">15K+</p>
                <p className="text-sm text-deep-nebula-400">Happy Starship Crew</p>
              </div>
              <div className="h-12 w-px bg-deep-nebula-700" />
              <div className="text-center">
                <p className="text-2xl font-black text-deep-cosmic-400">50+</p>
                <p className="text-sm text-deep-nebula-400">Cosmic Designs</p>
              </div>
              <div className="h-12 w-px bg-deep-nebula-700" />
              <div className="text-center">
                <p className="text-2xl font-black text-deep-cosmic-400">🌟 4.9</p>
                <p className="text-sm text-deep-nebula-400">Star Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────────────────── */}
        <section className="bg-deep-nebula-800/50 backdrop-blur py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-deep-void-500 to-deep-cosmic-400">
              Why Cosmic Explorers Choose Comet Crew
            </h2>
            <p className="text-center text-deep-nebula-300 mb-12 text-lg">
              Designed for the modern space enthusiast
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🛸',
                  title: 'Premium Cosmic Weave',
                  description: '100% organic cotton blended with futuristic comfort technology',
                },
                {
                  icon: '✨',
                  title: 'Stellar Designs',
                  description: 'Limited edition collections inspired by NASA, astronomy, and sci-fi',
                },
                {
                  icon: '🌌',
                  title: 'Galactic Quality',
                  description: 'Hand-crafted graphics that stay vibrant through 500+ washes',
                },
                {
                  icon: '🚀',
                  title: 'Lightning Fast Delivery',
                  description: 'Free intergalactic shipping on orders over $100',
                },
                {
                  icon: '🔐',
                  title: 'Secure Checkout',
                  description: 'Military-grade encryption for all transactions',
                },
                {
                  icon: '♻️',
                  title: 'Sustainable Materials',
                  description: 'Eco-friendly production with zero-waste packaging',
                },
              ].map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-deep-nebula-700 to-deep-nebula-800 border border-deep-cosmic-500/30 hover:border-deep-cosmic-400 hover:shadow-glow-lg transition-all duration-300 backdrop-blur"
                >
                  <span className="text-5xl mb-4 block">{icon}</span>
                  <h3 className="text-xl font-bold text-deep-nebula-100 mb-2">{title}</h3>
                  <p className="text-deep-nebula-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────────────── */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep-void-500/20 via-deep-cosmic-500/20 to-deep-void-500/20" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-deep-void-500 to-deep-cosmic-400">
              Ready to Join the Starship Crew?
            </h2>
            <p className="text-lg text-deep-nebula-300 mb-10 max-w-2xl mx-auto">
              Browse 50+ exclusive cosmic designs. Find your perfect space-themed fit today.
            </p>
            <Button
              variant="glow"
              size="xl"
              theme={theme}
              onClick={() => window.location.href = '/products'}
              className="w-full sm:w-auto"
            >
              🌟 Shop Collections Now →
            </Button>
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-deep-nebula-700 bg-deep-nebula-900/80 backdrop-blur py-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-deep-nebula-400">
            © 2026 Comet Crew, Inc. All rights reserved.
            &nbsp;·&nbsp;
            <a href="/products" className="hover:text-deep-cosmic-400 transition-colors">Products</a>
            &nbsp;·&nbsp;
            <a href="/checkout" className="hover:text-deep-cosmic-400 transition-colors">Cart</a>
          </p>
        </div>
      </footer>
    </>
  );
}