// apps/checkout/src/app/cart-review.tsx (excerpt showing theme integration)
'use client';

import React, { useState } from 'react';
import { Button } from '@comet-crew/shared/ui';
import { useCart } from '@comet-crew/shared/state';

const theme = 'deep';

export function CartReview() {
  const { items, cartCount, subtotal, removeItem, updateQuantity, clearAll } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const TAX_RATE = 0.08;
  const SHIPPING = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING;

  async function handlePlaceOrder() {
    setIsOrdering(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearAll();
    setOrderPlaced(true);
    setIsOrdering(false);
  }

  // Theme-specific colors
  const bgClass = theme === 'deep' 
    ? 'bg-deep-nebula-700 border-deep-cosmic-400' 
    : 'bg-other-color';
  
  const textClass = theme === 'deep' 
    ? 'text-deep-nebula-100' 
    : 'text-other-color';

  if (orderPlaced) {
    return (
      <div className={`flex flex-col items-center justify-center gap-6 rounded-2xl ${bgClass} border-2 py-20 px-8 text-center shadow-glow-lg`}>
        <span className="text-6xl animate-bounce">🎉</span>
        <h2 className={`text-3xl font-black ${textClass}`}>Order Blasted Into Space!</h2>
        <p className="text-deep-nebula-400 max-w-sm">
          Your cosmic order has been received. Tracking details sent to your email.
        </p>
        <Button variant="primary" size="lg" theme={theme} onClick={() => window.location.href = '/products'}>
          ← Back to Shopping
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center gap-6 rounded-2xl ${bgClass} border-2 py-20 px-8 text-center shadow-glow-lg`}>
        <span className="text-6xl">🛸</span>
        <h2 className={`text-2xl font-bold ${textClass}`}>Your Cart is Empty</h2>
        <p className="text-deep-nebula-400">Explore our cosmic collection!</p>
        <Button variant="primary" size="lg" theme={theme} onClick={() => window.location.href = '/products'}>
          Shop Collections →
        </Button>
      </div>
    );
  }

  // Cart with items rendering... [rest of component with theme classes applied]
  
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Line items with theme */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.id} className={`flex gap-5 rounded-2xl ${bgClass} border-2 p-5 shadow-glow-md`}>
            {/* Item content */}
          </div>
        ))}
      </div>

      {/* Order summary with theme */}
      <div className={`rounded-2xl ${bgClass} border-2 p-6 shadow-glow-md h-fit sticky top-20`}>
        <h2 className={`text-lg font-bold ${textClass} mb-5`}>Order Summary</h2>
        {/* Summary content with theme classes */}
      </div>
    </div>
  );
}