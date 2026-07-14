'use client';

import React, { useState, useMemo } from 'react';
import { Card, EmptyState } from '@comet-crew/shared/ui';
import type { Product } from '@comet-crew/shared/ui';
import { useCart, useToast } from '@comet-crew/shared/state';
import { ProductFilters, type FilterState } from './product-filter';

const theme = 'deep';

const DEMO_PRODUCTS: (Product & { category: string })[] = [
  { id: 'prod-001', name: 'Cosmic Explorer Tee', category: 'T-Shirts', description: 'Navigate the universe in style', price: 34.99, originalPrice: 49.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', rating: 4.9, reviewCount: 2341, badge: 'Best Seller', inStock: true },
  { id: 'prod-002', name: 'Nebula Drift Hoodie', category: 'Hoodies', description: 'Premium heavyweight hoodie', price: 59.99, originalPrice: 79.99, imageUrl: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&q=80', rating: 4.8, reviewCount: 1843, badge: 'New', inStock: true },
  { id: 'prod-003', name: 'Starlight Vintage Tee', category: 'T-Shirts', description: 'Retro 80s space aesthetic', price: 32.99, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd43?w=600&q=80', rating: 4.7, reviewCount: 912, inStock: true },
  { id: 'prod-004', name: 'Void Oversized Crewneck', category: 'Sweatshirts', description: 'Luxury oversized fit', price: 54.99, originalPrice: 69.99, imageUrl: 'https://images.unsplash.com/photo-1552508744-18e2b18049ff?w=600&q=80', rating: 4.6, reviewCount: 654, badge: 'Sale', inStock: true },
  { id: 'prod-005', name: 'Aurora Long Sleeve', category: 'Long Sleeve', description: 'Ethereal northern lights design', price: 42.99, originalPrice: 59.99, imageUrl: 'https://images.unsplash.com/photo-1455088733894-e80bd3d86b47?w=600&q=80', rating: 4.8, reviewCount: 1203, badge: 'Hot', inStock: true },
  { id: 'prod-006', name: 'Galactic Mesh Tank', category: 'Tanks', description: 'Breathable mesh with holographic print', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1515898369411-8a378ca1311f?w=600&q=80', rating: 4.5, reviewCount: 431, inStock: false },
  { id: 'prod-007', name: 'Constellation Sweatshirt', category: 'Sweatshirts', description: 'Embroidered zodiac map', price: 64.99, originalPrice: 84.99, imageUrl: 'https://images.unsplash.com/photo-1556821552-12073c92ec8f?w=600&q=80', rating: 4.9, reviewCount: 876, badge: 'Premium', inStock: true },
  { id: 'prod-008', name: 'Supernova Limited Edition', category: 'T-Shirts', description: 'One-of-a-kind holographic print', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80', rating: 5.0, reviewCount: 342, badge: 'Limited', inStock: true },
];

export function ProductGrid() {
const { addItem, cartCount } = useCart();
  const { showToast } = useToast();

  const [filters, setFilters] = useState<FilterState>({
    search: '', category: 'all', priceRange: [0, 200], sortBy: 'featured', inStockOnly: false,
  });

  const categories = useMemo(
    () => Array.from(new Set(DEMO_PRODUCTS.map((p) => p.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    let result = DEMO_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || p.category === filters.category;
      const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const matchesStock = !filters.inStockOnly || p.inStock;
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [filters]);

  function handleAddToCart(product: typeof DEMO_PRODUCTS[0]) {
    addItem({
      id: product.id, name: product.name, price: product.price,
      imageUrl: product.imageUrl, quantity: 1,
    });
    showToast(`${product.name} added to cart! 🚀`, 'success');
  }

  return (
    <>
      {cartCount > 0 && (
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cosmic-500/20 to-void-500/20 border border-cosmic-400/50 px-6 py-4 backdrop-blur shadow-glow-md">
          <span className="text-sm font-bold text-nebula-100">
            🚀 {cartCount} item{cartCount !== 1 ? 's' : ''} in your cosmic cart
          </span>
          <a href="/checkout" className="text-sm font-bold text-cosmic-400 hover:text-cosmic-300 underline">
            Checkout →
          </a>
        </div>
      )}

      <h1 className="mb-6 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-void-500 to-cosmic-400">
        Cosmic Collections
      </h1>

      <ProductFilters
        filters={filters}
        onChange={setFilters}
        categories={categories}
        resultCount={filteredProducts.length}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState
          icon="🔭"
          title="No products found"
          description="Try adjusting your filters or search terms"
          actionLabel="Clear Filters"
          onAction={() => setFilters({ search: '', category: 'all', priceRange: [0, 200], sortBy: 'featured', inStockOnly: false })}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} onAddToCart={handleAddToCart} theme={theme} />
          ))}
        </div>
      )}
    </>
  );
}