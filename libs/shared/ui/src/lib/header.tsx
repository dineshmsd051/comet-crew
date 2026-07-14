// libs/shared/ui/src/lib/header.tsx
// ─────────────────────────────────────────────────────────────────
// Cross-zone navigation Header.
// • Uses <a> for cross-zone links (forces hard navigation / zone boot).
// • "use client" is required because it reads cart count from
//   localStorage via the useCart hook.
// ─────────────────────────────────────────────────────────────────
'use client';

import React from 'react';
import { useCart } from '@comet-crew/shared/state';

export interface HeaderProps {
  /** Active zone key, used to highlight the current nav item. */
  activeZone?: 'home' | 'products' | 'checkout';
}

export function Header({ activeZone }: HeaderProps) {
  const { cartCount } = useCart();

  const navLinks = [
    { label: 'Home',     href: '/',          zone: 'home'     as const },
    { label: 'Products', href: '/products',  zone: 'products' as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo — cross-zone, always hard-navigate to root */}
        <a
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-brand-700 tracking-tight hover:text-brand-600 transition-colors"
          aria-label="ShopZone — go to homepage"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 2a1 1 0 00-.894.553L3.382 6H2a1 1 0 000 2l1 9A2 2 0 005 19h14a2 2 0 001.995-1.851l1-9A1 1 0 0021 7h-1.382l-1.724-3.447A1 1 0 0017 3H7a1 1 0 00-1-1zm1.618 4l1-2h6.764l1 2H7.618z"/>
          </svg>
          ShopZone
        </a>

        {/* Primary navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ label, href, zone }) => (
              <li key={zone}>
                {/* ⚠️  CROSS-ZONE: must use <a> not <Link> */}
                <a
                  href={href}
                  className={[
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    activeZone === zone
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  ].join(' ')}
                  aria-current={activeZone === zone ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart button — cross-zone to /checkout */}
        <a
          href="/checkout"
          className="relative flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label={`Go to checkout, ${cartCount} item${cartCount !== 1 ? 's' : ''} in cart`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </a>

      </div>
    </header>
  );
}