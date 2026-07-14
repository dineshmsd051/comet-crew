// apps/products/src/app/product-grid.tsx
'use client';

import React, { useState } from 'react';
import { Card } from '@comet-crew/shared/ui';
import type { Product } from '@comet-crew/shared/ui';
import { useCart } from '@comet-crew/shared/state';

const theme = 'deep';

// Demo products with space theme
const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Cosmic Explorer Tee',
    description: 'Navigate the universe in style with our flagship explorer design',
    price: 34.99,
    originalPrice: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    rating: 4.9,
    reviewCount: 2341,
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 'prod-002',
    name: 'Nebula Drift Hoodie',
    description: 'Premium heavyweight hoodie with embroidered nebula artwork',
    price: 59.99,
    originalPrice: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&q=80',
    rating: 4.8,
    reviewCount: 1843,
    badge: 'New',
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'Starlight Vintage Tee',
    description: 'Retro 80s space aesthetic meets modern comfort',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd43?w=600&q=80',
    rating: 4.7,
    reviewCount: 912,
    inStock: true,
  },
  {
    id: 'prod-004',
    name: 'Void Oversized Crewneck',
    description: 'Luxury oversized fit with minimalist cosmic print',
    price: 54.99,
    originalPrice: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1552508744-18e2b18049ff?w=600&q=80',
    rating: 4.6,
    reviewCount: 654,
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Aurora Borealis Long Sleeve',
    description: 'Ethereal northern lights design with glow-in-the-dark accents',
    price: 42.99,
    originalPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1455088733894-e80bd3d86b47?w=600&q=80',
    rating: 4.8,
    reviewCount: 1203,
    badge: 'Hot',
    inStock: true,
  },
  {
    id: 'prod-006',
    name: 'Galactic Mesh Tank',
    description: 'Breathable mesh with holographic cosmic print',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1515898369411-8a378ca1311f?w=600&q=80',
    rating: 4.5,
    reviewCount: 431,
    inStock: false,
  },
  {
    id: 'prod-007',
    name: 'Constellation Sweatshirt',
    description: 'Embroidered zodiac constellation map on premium fleece',
    price: 64.99,
    originalPrice: 84.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821552-12073c92ec8f?w=600&q=80',
    rating: 4.9,
    reviewCount: 876,
    badge: 'Premium',
    inStock: true,
  },
  {
    id: 'prod-008',
    name: 'Supernova Limited Edition',
    description: 'One-of-a-kind holographic print with metallic threading',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
    rating: 5.0,
    reviewCount: 342,
    badge: 'Limited',
    inStock: true,
  },
];

export function ProductGrid() {
  const { addItem, cartCount } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  function handleAddToCart(product: Product) {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  }

  const sortedProducts = [...DEMO_PRODUCTS].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      {/* Cart notification */}
      {cartCount > 0 && (
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-deep-cosmic-500/20 to-deep-void-500/20 border border-deep-cosmic-400/50 px-6 py-4 backdrop-blur shadow-glow-md">
          <span className="text-sm font-bold text-deep-nebula-100">
            🚀 {cartCount} item{cartCount !== 1 ? 's' : ''} in your cosmic cart
          </span>
          <a
            href="/checkout"
            className="text-sm font-bold text-deep-cosmic-400 hover:text-deep-cosmic-300 underline underline-offset-2 transition-colors"
          >
            Checkout →
          </a>
        </div>
      )}

      {/* Sorting */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-deep-void-500 to-deep-cosmic-400">
          Cosmic Collections
        </h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-lg border-2 border-deep-cosmic-500/50 bg-deep-nebula-700 px-4 py-2 text-sm font-semibold text-deep-nebula-100 shadow-glow-sm focus:border-deep-cosmic-400 focus:outline-none focus:ring-2 focus:ring-deep-cosmic-400"
          aria-label="Sort products"
        >
          <option value="featured">✨ Featured</option>
          <option value="price-asc">💰 Price: Low → High</option>
          <option value="price-desc">💰 Price: High → Low</option>
          <option value="rating">⭐ Top Rated</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="relative">
            <Card product={product} onAddToCart={handleAddToCart} theme={theme} />
            {addedIds.has(product.id) && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-deep-void-600/90 backdrop-blur text-white text-lg font-bold pointer-events-none animate-pulse">
                ✓ Added to Cart!
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}