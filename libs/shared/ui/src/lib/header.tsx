// libs/shared/ui/src/lib/header.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@comet-crew/shared/state';

export interface HeaderProps {
  activeZone?: 'home' | 'products' | 'checkout';
  theme?: 'deep' | 'burst' | 'star';
}

export function Header({ activeZone, theme = 'deep' }: HeaderProps) {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme-specific classes
  const bgClass = theme === 'burst' ? 'bg-burst-void-900/80 border-burst-aurora-500'
                : theme === 'star' ? 'bg-star-silver-900/80 border-star-aurora-500'
                : 'bg-deep-nebula-900/80 border-deep-cosmic-400';

  const textClass = theme === 'burst' ? 'text-burst-void-50'
                  : theme === 'star' ? 'text-star-silver-50'
                  : 'text-deep-nebula-100';

  const activeNavClass = theme === 'burst' ? 'bg-burst-plasma-500/20 text-burst-plasma-400'
                       : theme === 'star' ? 'bg-star-midnight-500/20 text-star-aurora-400'
                       : 'bg-deep-void-500/20 text-deep-cosmic-400';

  const navLinks = [
    { label: 'Home', href: '/', zone: 'home' as const },
    { label: 'Products', href: '/products', zone: 'products' as const },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b-2 ${bgClass} backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href="/"
          className={`flex items-center gap-3 text-2xl font-black tracking-tighter ${
            theme === 'burst' ? 'text-burst-plasma-500 hover:text-burst-aurora-400'
            : theme === 'star' ? 'text-star-midnight-500 hover:text-star-aurora-400'
            : 'text-deep-void-500 hover:text-deep-cosmic-400'
          } transition-colors`}
          aria-label="StarShirt - go to homepage"
        >
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
            <path d="M20 2L25 15H38L28 22L32 35L20 28L8 35L12 22L2 15H15L20 2Z" />
          </svg>
          <span className="hidden sm:inline">StarShirt</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ label, href, zone }) => (
              <li key={zone}>
                <a
                  href={href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    activeZone === zone
                      ? activeNavClass
                      : `${textClass} hover:opacity-80`
                  }`}
                  aria-current={activeZone === zone ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <a
            href="/checkout"
            className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all shadow-glow-md hover:shadow-glow-lg ${
              theme === 'burst' 
                ? 'bg-burst-aurora-500 text-white hover:bg-burst-aurora-600'
                : theme === 'star'
                ? 'bg-star-aurora-500 text-white hover:bg-star-aurora-600'
                : 'bg-deep-cosmic-500 text-white hover:bg-deep-cosmic-600'
            }`}
            aria-label={`Go to checkout, ${cartCount} item${cartCount !== 1 ? 's' : ''} in cart`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {/* Badge */}
            {cartCount > 0 && (
              <span className={`absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white ${
                theme === 'burst' ? 'bg-burst-plasma-500'
                : theme === 'star' ? 'bg-star-midnight-500'
                : 'bg-deep-void-500'
              }`}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`sm:hidden p-2 rounded-lg transition-colors ${textClass} hover:opacity-70`}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className={`sm:hidden border-t-2 ${
          theme === 'burst' ? 'border-burst-aurora-500 bg-burst-void-800'
          : theme === 'star' ? 'border-star-aurora-500 bg-star-silver-800'
          : 'border-deep-cosmic-400 bg-deep-nebula-700'
        }`}>
          <ul className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map(({ label, href, zone }) => (
              <li key={zone}>
                <a
                  href={href}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeZone === zone
                      ? activeNavClass
                      : `${textClass} hover:opacity-70`
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}