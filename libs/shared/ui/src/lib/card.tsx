// libs/shared/ui/src/lib/card.tsx
'use client';

import React from 'react';
import { Button } from './button';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock?: boolean;
}

export interface CardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  theme?: 'deep' | 'burst' | 'star';
}

function StarRating({ rating, theme }: { rating: number; theme?: string }) {
  const starColor = theme === 'burst' ? 'text-burst-aurora-400' 
                  : theme === 'star' ? 'text-star-aurora-400'
                  : 'text-deep-cosmic-400';

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${
              filled ? starColor : 'text-gray-600'
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

export function Card({ product, onAddToCart, theme = 'deep' }: CardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const bgClass = theme === 'burst' ? 'bg-burst-void-700 border-burst-aurora-400'
                : theme === 'star' ? 'bg-star-silver-800 border-star-aurora-400'
                : 'bg-deep-nebula-600 border-deep-cosmic-400';

  const textClass = theme === 'burst' ? 'text-burst-void-50 hover:text-burst-aurora-400'
                  : theme === 'star' ? 'text-star-silver-50 hover:text-star-aurora-400'
                  : 'text-deep-nebula-100 hover:text-deep-cosmic-400';

  return (
    <article className={`group relative flex flex-col rounded-2xl border-2 ${bgClass} shadow-glow-md hover:shadow-glow-lg transition-all duration-300 overflow-hidden`}>

      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
          {product.badge}
        </span>
      )}

      {/* Discount chip */}
      {discount && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
          -{discount}%
        </span>
      )}

      {/* Product image */}
      <a
        href={`/products/${product.id}`}
        className="block overflow-hidden aspect-square group-hover:scale-110 transition-transform duration-500 relative"
        aria-label={`View ${product.name}`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </a>

      {/* Card Body */}
      <div className="flex flex-col flex-1 gap-3 p-5">

        {/* Name + Rating */}
        <div className="flex flex-col gap-2">
          <a
            href={`/products/${product.id}`}
            className={`text-base font-bold ${textClass} transition-colors line-clamp-2 leading-snug`}
          >
            {product.name}
          </a>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} theme={theme} />
            <span className={theme === 'burst' ? 'text-burst-void-300 text-xs' 
                          : theme === 'star' ? 'text-star-silver-300 text-xs'
                          : 'text-deep-nebula-400 text-xs'}>
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm line-clamp-2 leading-relaxed ${
          theme === 'burst' ? 'text-burst-void-300'
          : theme === 'star' ? 'text-star-silver-300'
          : 'text-deep-nebula-400'
        }`}>
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          <span className={`text-2xl font-black ${
            theme === 'burst' ? 'text-burst-plasma-500'
            : theme === 'star' ? 'text-star-midnight-500'
            : 'text-deep-void-500'
          }`}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className={`text-sm line-through ${
              theme === 'burst' ? 'text-burst-void-400'
              : theme === 'star' ? 'text-star-silver-400'
              : 'text-deep-nebula-500'
            }`}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock status */}
        {product.inStock === false && (
          <p className="text-xs font-bold uppercase tracking-wider text-red-400">
            Out of stock
          </p>
        )}

        {/* CTA */}
        <Button
          variant="primary"
          size="md"
          theme={theme}
          disabled={product.inStock === false}
          onClick={() => onAddToCart?.(product)}
          className="w-full mt-2"
        >
          🚀 Add to Cart
        </Button>
      </div>
    </article>
  );
}