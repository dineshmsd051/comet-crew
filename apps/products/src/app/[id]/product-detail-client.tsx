'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@comet-crew/shared/ui';
import { useCart, useWishlist, useToast } from '@comet-crew/shared/state';
import type { Product } from '@comet-crew/shared/ui';

interface ProductDetailClientProps {
  product: Product & {
    images: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    stockCount: number;
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors[0]?.name ?? null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const wishlisted = isInWishlist(product.id);
  const maxQty = Math.min(product.stockCount, 10);

  const canAddToCart = useMemo(() => {
    return product.stockCount > 0 && selectedSize !== null;
  }, [product.stockCount, selectedSize]);

  function handleQuantityChange(delta: number) {
    setQuantity((prev) => Math.min(Math.max(1, prev + delta), maxQty));
  }

  async function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select a size', 'warning');
      return;
    }

    setIsAdding(true);
    setSizeError(false);

    // Simulate a slight delay for UX feedback
    await new Promise((r) => setTimeout(r, 400));

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      size: selectedSize,
      color: selectedColor ?? undefined,
      maxQuantity: product.stockCount,
    });

    showToast(`${product.name} added to cart! 🚀`, 'success');
    setIsAdding(false);
  }

  function handleWishlistToggle() {
    const added = toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    showToast(
      added ? `Added to wishlist ❤️` : `Removed from wishlist`,
      added ? 'success' : 'info'
    );
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

      {/* ── Image Gallery ────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-cosmic-400/30 bg-nebula-800">
          <img
            src={product.images[selectedImage]}
            alt={`${product.name} - view ${selectedImage + 1}`}
            className="h-full w-full object-cover"
          />
          {product.stockCount === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded-full bg-red-600 px-6 py-2 text-lg font-bold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative flex-shrink-0 h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === i
                  ? 'border-cosmic-400 shadow-glow-sm'
                  : 'border-nebula-600 opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
              aria-pressed={selectedImage === i}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Info ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black text-nebula-100">{product.name}</h1>
            <button
              onClick={handleWishlistToggle}
              className="flex-shrink-0 rounded-full p-3 border-2 border-cosmic-400/30 hover:border-cosmic-400 transition-colors"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
            >
              <svg
                className={`w-6 h-6 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-nebula-300'}`}
                stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 10-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <StarRatingDisplay rating={product.rating} />
            <span className="text-sm text-nebula-400">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-void-500">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-lg text-nebula-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="text-nebula-300 leading-relaxed">{product.description}</p>

        {/* Stock indicator */}
        {product.stockCount > 0 && product.stockCount <= 10 && (
          <p className="text-sm font-bold text-amber-400">
            ⚡ Only {product.stockCount} left in cosmic inventory!
          </p>
        )}

        {/* Color selector */}
        {product.colors.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-bold text-nebula-200">
              Color: <span className="text-cosmic-400">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'ring-2 ring-cosmic-400 ring-offset-2 ring-offset-nebula-900 scale-110'
                      : 'border-nebula-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select color ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-nebula-200">
              Size {sizeError && <span className="text-red-400">— required</span>}
            </p>
            <button className="text-xs text-cosmic-400 underline hover:text-cosmic-300">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`min-w-[3rem] rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all ${
                  selectedSize === size
                    ? 'border-void-500 bg-void-500 text-white shadow-glow-sm'
                    : sizeError
                    ? 'border-red-500/50 text-nebula-200 hover:border-red-400'
                    : 'border-nebula-600 text-nebula-200 hover:border-cosmic-400'
                }`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity selector */}
        <div>
          <p className="mb-2 text-sm font-bold text-nebula-200">Quantity</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border-2 border-nebula-600">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="px-4 py-2 text-lg font-bold text-nebula-200 hover:bg-nebula-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-l-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-nebula-100" aria-live="polite">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= maxQty}
                className="px-4 py-2 text-lg font-bold text-nebula-200 hover:bg-nebula-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-r-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-nebula-500">Max {maxQty} per order</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            theme="deep"
            isLoading={isAdding}
            disabled={product.stockCount === 0}
            onClick={handleAddToCart}
            className="flex-1"
          >
            {product.stockCount === 0 ? 'Out of Stock' : '🚀 Add to Cart'}
          </Button>
          <Button variant="ghost" size="lg" theme="deep" onClick={handleShare} aria-label="Share product">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </Button>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 border-t border-nebula-700 pt-6 text-center">
          <div>
            <span className="text-2xl">🚀</span>
            <p className="mt-1 text-xs text-nebula-400">Free shipping over $100</p>
          </div>
          <div>
            <span className="text-2xl">↩️</span>
            <p className="mt-1 text-xs text-nebula-400">30-day returns</p>
          </div>
          <div>
            <span className="text-2xl">🔒</span>
            <p className="mt-1 text-xs text-nebula-400">Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-cosmic-400' : 'text-nebula-600'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}