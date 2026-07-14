// apps/checkout/src/app/page.tsx
// ─────────────────────────────────────────────────────────────────
// CHECKOUT ZONE — Cart Review & Checkout (basePath: /checkout)
// ─────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { Header } from '@comet-crew/shared/ui';
import { CartReview } from './cart-review';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Review your cart and complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header activeZone="checkout" />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-900">Your Cart</h1>
        <p className="mb-10 text-sm text-slate-500">
          Review your items, then proceed to secure payment.
        </p>
        <CartReview />
      </main>
    </>
  );
}