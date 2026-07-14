// apps/products/src/app/[id]/product-detail-client.tsx
'use client';

import React from 'react';
import { Button } from '@comet-crew/shared/ui';
import { useCart } from '@comet-crew/shared/state';

interface Props { productId: string }

// In a real app, fetch from an API. Here we use static data.
const PRODUCT_MAP: Record<string, {
  name: string; price: number; description: string;
  imageUrl: string; longDescription: string;
}> = {
  'prod-001': {
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Premium 40hr battery life, hybrid ANC, Hi-Res Audio certified.',
    longDescription: `Experience music the way it was meant to be heard. Our flagship wireless headphones 
      feature a 40-hour battery, state-of-the-art hybrid active noise cancellation that blocks up to 98% 
      of ambient sound, and Hi-Res Audio certification. The plush memory foam ear cushions ensure all-day 
      comfort, while the foldable design makes them perfect for travel.`,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
};

export function ProductDetailClient({ productId }: Props) {
  const { addItem, cartCount } = useCart();
  const product = PRODUCT_MAP[productId];

  if (!product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
        <p className="text-lg font-semibold text-red-700">Product not found.</p>
        {/* ✅ Within-zone: back to /products */}
        <a href="/products" className="mt-4 inline-block text-brand-600 underline hover:text-brand-800">
          ← Back to Products
        </a>
      </div>
    );
  }

  const handleAdd = () => {
    addItem({ id: productId, name: product.name, price: product.price, imageUrl: product.imageUrl });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Image */}
      <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-square shadow-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>
        <p className="text-4xl font-black text-brand-700">${product.price.toFixed(2)}</p>
        <p className="text-slate-600 leading-relaxed">{product.longDescription}</p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={handleAdd} className="flex-1">
            🛒 Add to Cart {cartCount > 0 && `(${cartCount} in cart)`}
          </Button>
          {/* ⚠️ Cross-zone: /checkout is in the checkout zone */}
          <a
            href="/checkout"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-slate-100 px-7 py-3 text-base font-semibold text-slate-800 hover:bg-slate-200 transition-colors"
          >
            View Cart →
          </a>
        </div>
      </div>
    </div>
  );
}