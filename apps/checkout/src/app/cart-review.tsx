// apps/checkout/src/app/cart-review.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@comet-crew/shared/ui';
import { useCart } from '@comet-crew/shared/state';

export function CartReview() {
  const { items, cartCount, subtotal, removeItem, updateQuantity, clearAll } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const TAX_RATE   = 0.08;
  const SHIPPING   = subtotal > 100 ? 0 : 9.99;
  const tax        = subtotal * TAX_RATE;
  const total      = subtotal + tax + SHIPPING;

  async function handlePlaceOrder() {
    setIsOrdering(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    clearAll();
    setOrderPlaced(true);
    setIsOrdering(false);
  }

  // ── Order success state ────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-white py-20 px-8 text-center shadow-sm ring-1 ring-slate-100">
        <span className="text-6xl" role="img" aria-label="Party popper">🎉</span>
        <h2 className="text-2xl font-extrabold text-slate-900">Order Placed!</h2>
        <p className="text-slate-500 max-w-sm">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        {/* ⚠️ Cross-zone back to products */}
        <a
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
        >
          ← Continue Shopping
        </a>
      </div>
    );
  }

  // ── Empty cart state ───────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-white py-20 px-8 text-center shadow-sm ring-1 ring-slate-100">
        <span className="text-6xl" role="img" aria-label="Empty cart">🛒</span>
        <h2 className="text-xl font-bold text-slate-700">Your cart is empty</h2>
        <p className="text-slate-500">Add some products to get started!</p>
        {/* ⚠️ Cross-zone */}
        <a
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
        >
          Browse Products →
        </a>
      </div>
    );
  }

  // ── Cart with items ────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* Line items */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-20 w-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
            />
            <div className="flex flex-1 flex-col gap-2">
              {/* ⚠️ Cross-zone link to product detail */}
              <a
                href={`/products/${item.id}`}
                className="text-sm font-semibold text-slate-800 hover:text-brand-600 transition-colors leading-tight"
              >
                {item.name}
              </a>
              <p className="text-base font-bold text-brand-700">${item.price.toFixed(2)}</p>

              {/* Quantity control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-label={`Quantity: ${item.quantity}`}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-auto text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 h-fit sticky top-20">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Order Summary</h2>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <dt>Subtotal ({cartCount} item{cartCount !== 1 ? 's' : ''})</dt>
            <dd className="font-medium">${subtotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between text-slate-600">
            <dt>Shipping</dt>
            <dd className="font-medium">
              {SHIPPING === 0
                ? <span className="text-green-600 font-semibold">FREE</span>
                : `$${SHIPPING.toFixed(2)}`}
            </dd>
          </div>
          <div className="flex justify-between text-slate-600">
            <dt>Tax (8%)</dt>
            <dd className="font-medium">${tax.toFixed(2)}</dd>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between">
            <dt className="text-base font-extrabold text-slate-900">Total</dt>
            <dd className="text-base font-extrabold text-brand-700">${total.toFixed(2)}</dd>
          </div>
        </dl>

        {SHIPPING > 0 && (
          <p className="mt-3 text-xs text-slate-400 text-center">
            Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </p>
        )}

        <Button
          variant="primary"
          size="lg"
          isLoading={isOrdering}
          onClick={handlePlaceOrder}
          className="mt-6 w-full"
        >
          🔒 Place Order
        </Button>

        <button
          onClick={clearAll}
          className="mt-3 w-full text-center text-xs text-slate-400 hover:text-red-500 transition-colors py-1"
        >
          Clear cart
        </button>
      </div>

    </div>
  );
}