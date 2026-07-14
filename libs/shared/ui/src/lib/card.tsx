// libs/shared/ui/src/lib/card.tsx
// ─────────────────────────────────────────────────────────────────
// ProductCard — richly styled Tailwind card with image, badge,
// price, rating stars, and an Add-to-Cart CTA.
// ─────────────────────────────────────────────────────────────────
import React from 'react';
import { Button } from './button';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;       // 0–5
  reviewCount: number;
  badge?: string;       // e.g. "New", "Sale", "Hot"
  inStock?: boolean;
}

export interface CardProps {
  product: Product;
  /** Called when the user clicks "Add to Cart". Client zones must wrap
   *  this card in a client boundary to wire up the handler. */
  onAddToCart?: (product: Product) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < rating;
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${
              filled ? 'text-amber-400' : half ? 'text-amber-300' : 'text-slate-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

export function Card({ product, onAddToCart }: CardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">

      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wide shadow">
          {product.badge}
        </span>
      )}

      {/* Discount chip */}
      {discount && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
          -{discount}%
        </span>
      )}

      {/* Product image — cross-zone navigation uses <a>, not <Link> */}
      <a
        href={`/products/${product.id}`}
        className="block overflow-hidden bg-slate-50 aspect-square"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </a>

      {/* Card Body */}
      <div className="flex flex-col flex-1 gap-3 p-5">

        {/* Name + Rating row */}
        <div className="flex flex-col gap-1">
          <a
            href={`/products/${product.id}`}
            className="text-base font-semibold text-slate-800 hover:text-brand-600 transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </a>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-slate-500">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price row */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-2xl font-extrabold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock status */}
        {product.inStock === false && (
          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
            Out of stock
          </p>
        )}

        {/* CTA */}
        <Button
          variant="primary"
          size="md"
          disabled={product.inStock === false}
          onClick={() => onAddToCart?.(product)}
          className="w-full mt-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}