'use client';

import React from 'react';

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  resultCount: number;
}

export function ProductFilters({ filters, onChange, categories, resultCount }: ProductFiltersProps) {
  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  function clearFilters() {
    onChange({
      search: '',
      category: 'all',
      priceRange: [0, 200],
      sortBy: 'featured',
      inStockOnly: false,
    });
  }

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.inStockOnly ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 200;

  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nebula-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          placeholder="Search cosmic collections..."
          className="w-full rounded-xl border-2 border-cosmic-500/30 bg-nebula-700 py-3 pl-12 pr-4 text-nebula-100 placeholder-nebula-400 focus:border-cosmic-400 focus:outline-none focus:ring-2 focus:ring-cosmic-400/30"
          aria-label="Search products"
        />
        {filters.search && (
          <button
            onClick={() => update('search', '')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-nebula-400 hover:text-nebula-200"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
          className="rounded-lg border-2 border-cosmic-500/30 bg-nebula-700 px-4 py-2 text-sm font-semibold text-nebula-100 focus:border-cosmic-400 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => update('sortBy', e.target.value as FilterState['sortBy'])}
          className="rounded-lg border-2 border-cosmic-500/30 bg-nebula-700 px-4 py-2 text-sm font-semibold text-nebula-100 focus:border-cosmic-400 focus:outline-none"
        >
          <option value="featured">✨ Featured</option>
          <option value="price-asc">💰 Price: Low → High</option>
          <option value="price-desc">💰 Price: High → Low</option>
          <option value="rating">⭐ Top Rated</option>
          <option value="newest">🆕 Newest</option>
        </select>

        {/* In stock toggle */}
        <label className="flex items-center gap-2 rounded-lg border-2 border-nebula-600 px-4 py-2 text-sm font-semibold text-nebula-200 cursor-pointer hover:border-cosmic-400 transition-colors">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => update('inStockOnly', e.target.checked)}
            className="rounded accent-cosmic-500"
          />
          In Stock Only
        </label>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Clear Filters ✕
          </button>
        )}

        <span className="ml-auto text-sm text-nebula-400">
          {resultCount} product{resultCount !== 1 ? 's' : ''} found
        </span>
      </div>
    </div>
  );
}