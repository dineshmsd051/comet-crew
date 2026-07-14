// apps/products/src/app/product-grid.tsx
// ─────────────────────────────────────────────────────────────────
// Client component — uses the useCart hook and handles Add-to-Cart.
// Separated from page.tsx to keep the server component surface lean.
// ─────────────────────────────────────────────────────────────────
'use client';

import React, { useState } from 'react';
import { Card } from '@comet-crew/shared/ui';
import type { Product } from '@comet-crew/shared/ui';
import { useCart } from '@comet-crew/shared/state';

// ── Static demo data (replace with fetch() in production) ─────────

const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium 40hr battery life, hybrid ANC, and Hi-Res Audio certified for audiophile-grade sound.',
    price: 249.99,
    originalPrice: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    rating: 4.8,
    reviewCount: 2341,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 'prod-002',
    name: 'Mechanical Gaming Keyboard',
    description: 'Tactile Cherry MX switches, per-key RGB, USB-C detachable cable, and aircraft-grade aluminium frame.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80',
    rating: 4.6,
    reviewCount: 1128,
    badge: 'Hot',
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'Ultra-Wide Curved Monitor 34"',
    description: '165Hz IPS panel, 1ms response time, AMD FreeSync Premium Pro, built-in KVM switch.',
    price: 699.99,
    originalPrice: 849.99,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    rating: 4.9,
    reviewCount: 876,
    badge: 'New',
    inStock: true,
  },
  {
    id: 'prod-004',
    name: 'Ergonomic Office Chair',
    description: 'Lumbar support system, 4D armrests, breathable mesh back, adjustable tilt tension — certified for 8hr use.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    rating: 4.5,
    reviewCount: 3092,
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Smart Home Speaker Hub',
    description: '360° room-filling sound, built-in AI assistant, Zigbee hub, and multi-room audio support.',
    price: 89.99,
    originalPrice: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80',
    rating: 4.3,
    reviewCount: 654,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 'prod-006',
    name: 'Mirrorless Camera Kit',
    description: '24MP sensor, 4K 60fps video, 5-axis IBIS, weather-sealed magnesium body + 18-55mm kit lens.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    rating: 4.7,
    reviewCount: 431,
    inStock: false,
  },
  {
    id: 'prod-007',
    name: 'Standing Desk (Electric)',
    description: 'Dual-motor lift, 4-memory presets, anti-collision safety, solid bamboo desktop — 50"×28".',
    price: 549.99,
    originalPrice: 649.99,
    imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    rating: 4.6,
    reviewCount: 218,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 'prod-008',
    name: 'Pro Fitness Smartwatch',
    description: 'Always-on AMOLED display, GPS, ECG, blood oxygen, 14-day battery, 5ATM water resistance.',
    price: 329.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    rating: 4.4,
    reviewCount: 1890,
    badge: 'New',
    inStock: true,
  },
];

// ── Component ─────────────────────────────────────────────────────

export function ProductGrid() {
  const { addItem, cartCount } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleAddToCart(product: Product) {
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    // Visual feedback — flash "Added!" on the button briefly
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  }

  return (
    <>
      {/* Cart count toast notification */}
      {cartCount > 0 && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-center justify-between rounded-xl bg-brand-50 px-5 py-3 ring-1 ring-brand-200"
        >
          <span className="text-sm font-medium text-brand-800">
            🛒 {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
          </span>
          {/* ⚠️ Cross-zone link to checkout */}
          <a
            href="/checkout"
            className="text-sm font-bold text-brand-700 hover:text-brand-900 underline underline-offset-2 transition-colors"
          >
            Proceed to Checkout →
          </a>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEMO_PRODUCTS.map((product) => (
          <div key={product.id} className="relative">
            <Card
              product={product}
              onAddToCart={handleAddToCart}
            />
            {/* "Added!" flash overlay */}
            {addedIds.has(product.id) && (
              <div
                aria-live="polite"
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-brand-600/90 text-white text-lg font-bold pointer-events-none animate-pulse"
              >
                ✓ Added!
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}