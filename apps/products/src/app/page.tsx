// apps/products/src/app/page.tsx
// ─────────────────────────────────────────────────────────────────
// PRODUCTS ZONE — Product Catalog Grid (basePath: /products)
//
// This is a server component for the grid layout. The interactive
// "Add to Cart" logic is delegated to <ProductGrid> (a client
// component) so we can use useCart() and onClick handlers.
// ─────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { Header } from '@comet-crew/shared/ui';
import { ProductGrid } from './product-grid';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our curated catalog of premium products.',
};

export default function ProductsPage() {
  return (
    <>
      <Header activeZone="products" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">All Products</h1>
            <p className="mt-1 text-sm text-slate-500">
              Showing our top picks — new items added every week.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort/filter placeholders */}
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              aria-label="Sort products"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Client boundary for interactive cart behaviour */}
        <ProductGrid />

      </main>
    </>
  );
}