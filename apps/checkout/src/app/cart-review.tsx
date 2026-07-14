'use client';

import React, { useState } from 'react';
import { Button } from '@comet-crew/shared/ui';
import { EmptyState } from '@comet-crew/shared/ui';
import { useCart, useToast } from '@comet-crew/shared/state';

const theme = 'deep';

interface ShippingForm {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CartReview() {
  const { items, cartCount, subtotal, removeItem, updateQuantity, clearAll } = useCart();
  const { showToast } = useToast();

  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: '', email: '', address: '', city: '', zipCode: '', country: 'US',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const TAX_RATE = 0.08;
  const SHIPPING_COST = subtotal > 100 ? 0 : 9.99;
  const discountAmount = subtotal * promoDiscount;
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax + SHIPPING_COST;

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!shipping.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shipping.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!shipping.address.trim()) newErrors.address = 'Address is required';
    if (!shipping.city.trim()) newErrors.city = 'City is required';
    if (!shipping.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(shipping.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleFieldChange(field: keyof ShippingForm, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleApplyPromo() {
    const validCodes: Record<string, number> = {
      'COSMIC10': 0.10,
      'STARSHIP20': 0.20,
      'GALAXY15': 0.15,
    };

    const code = promoCode.trim().toUpperCase();
    if (validCodes[code]) {
      setPromoDiscount(validCodes[code]);
      setPromoApplied(true);
      showToast(`Promo code applied! ${validCodes[code] * 100}% off`, 'success');
    } else {
      showToast('Invalid promo code', 'error');
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  }

  function handleRemovePromo() {
    setPromoCode('');
    setPromoApplied(false);
    setPromoDiscount(0);
  }

  async function handleProceedToShipping() {
    setShowShippingForm(true);
  }

  async function handlePlaceOrder() {
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsOrdering(true);
    await new Promise((r) => setTimeout(r, 1800));

    const orderNum = `SS-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    clearAll();
    setOrderPlaced(true);
    setIsOrdering(false);
    showToast('Order placed successfully! 🎉', 'success');
  }

  function handleQuantityUpdate(id: string, newQty: number, size?: string, color?: string) {
    updateQuantity(id, newQty, size, color);
  }

  function handleRemoveItem(id: string, name: string, size?: string, color?: string) {
    removeItem(id, size, color);
    showToast(`${name} removed from cart`, 'info');
  }

  // ── Order Success State ──────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-cosmic-400 bg-nebula-700 py-20 px-8 text-center shadow-glow-lg">
        <span className="text-6xl animate-bounce">🎉</span>
        <h2 className="text-3xl font-black text-nebula-100">Order Blasted Into Space!</h2>
        <p className="text-nebula-400 max-w-sm">
          Order <strong className="text-cosmic-400">#{orderNumber}</strong> confirmed.
          Tracking details sent to {shipping.email}.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="lg" theme={theme} onClick={() => window.print()}>
            🖨️ Print Receipt
          </Button>
          <Button variant="primary" size="lg" theme={theme} onClick={() => window.location.href = '/products'}>
            ← Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // ── Empty Cart State ──────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛸"
        title="Your Cart is Empty"
        description="Explore our cosmic collection and find your perfect fit!"
        actionLabel="Shop Collections →"
        onAction={() => window.location.href = '/products'}
        theme={theme}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* ── Cart Items / Shipping Form ─────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        {!showShippingForm ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-nebula-100">Cart Items ({cartCount})</h2>
              <button
                onClick={() => { clearAll(); showToast('Cart cleared', 'info'); }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-5 rounded-2xl border-2 border-cosmic-400/20 bg-nebula-700 p-5 shadow-glow-sm"
              >
                <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-nebula-100">{item.name}</h3>
                    <p className="text-sm text-nebula-400">
                      {item.size && `Size: ${item.size}`} {item.color && `· Color: ${item.color}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-nebula-600">
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity - 1, item.size, item.color)}
                        className="px-3 py-1 text-nebula-200 hover:bg-nebula-600"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-nebula-100">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1, item.size, item.color)}
                        className="px-3 py-1 text-nebula-200 hover:bg-nebula-600"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-cosmic-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id, item.name, item.size, item.color)}
                  className="self-start text-nebula-500 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </>
        ) : (
          <ShippingFormSection
            shipping={shipping}
            errors={errors}
            onChange={handleFieldChange}
            onBack={() => setShowShippingForm(false)}
          />
        )}
      </div>

      {/* ── Order Summary ─────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-cosmic-400/30 bg-nebula-700 p-6 shadow-glow-md h-fit sticky top-20">
        <h2 className="text-lg font-bold text-nebula-100 mb-5">Order Summary</h2>

        {/* Promo code */}
        <div className="mb-4">
          {!promoApplied ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 rounded-lg border-2 border-nebula-600 bg-nebula-800 px-3 py-2 text-sm text-nebula-100 placeholder-nebula-500 focus:border-cosmic-400 focus:outline-none"
              />
              <Button variant="secondary" size="sm" theme={theme} onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg bg-green-500/10 border border-green-500/30 px-3 py-2">
              <span className="text-sm font-semibold text-green-400">
                ✓ {promoCode.toUpperCase()} applied
              </span>
              <button onClick={handleRemovePromo} className="text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            </div>
          )}
          <p className="mt-1 text-xs text-nebula-500">Try: COSMIC10, STARSHIP20, GALAXY15</p>
        </div>

        <div className="space-y-3 border-t border-nebula-600 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-nebula-400">Subtotal</span>
            <span className="text-nebula-200">${subtotal.toFixed(2)}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Discount ({promoDiscount * 100}%)</span>
              <span className="text-green-400">−${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-nebula-400">Shipping</span>
            <span className="text-nebula-200">{SHIPPING_COST === 0 ? 'FREE' : `$${SHIPPING_COST.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-nebula-400">Tax</span>
            <span className="text-nebula-200">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-nebula-600 pt-3 text-lg font-bold">
            <span className="text-nebula-100">Total</span>
            <span className="text-cosmic-400">${total.toFixed(2)}</span>
          </div>
        </div>

        {subtotal < 100 && (
          <p className="mt-3 text-xs text-amber-400">
            Add ${(100 - subtotal).toFixed(2)} more for free shipping! 🚀
          </p>
        )}

        <Button
          variant="primary"
          size="lg"
          theme={theme}
          isLoading={isOrdering}
          onClick={showShippingForm ? handlePlaceOrder : handleProceedToShipping}
          className="w-full mt-6"
        >
          {showShippingForm ? '🚀 Place Order' : 'Proceed to Shipping →'}
        </Button>
      </div>
    </div>
  );
}

// ── Shipping Form Sub-Component ─────────────────────────────────────
function ShippingFormSection({
  shipping, errors, onChange, onBack,
}: {
  shipping: ShippingForm;
  errors: FormErrors;
  onChange: (field: keyof ShippingForm, value: string) => void;
  onBack: () => void;
}) {
  const inputClass = (field: string) =>
    `w-full rounded-lg border-2 bg-nebula-800 px-4 py-2.5 text-nebula-100 placeholder-nebula-500 focus:outline-none focus:ring-2 focus:ring-cosmic-400/30 ${
      errors[field] ? 'border-red-500' : 'border-nebula-600 focus:border-cosmic-400'
    }`;

  return (
    <div className="rounded-2xl border-2 border-cosmic-400/20 bg-nebula-700 p-6">
      <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm text-cosmic-400 hover:text-cosmic-300">
        ← Back to cart
      </button>

      <h2 className="mb-5 text-lg font-bold text-nebula-100">Shipping Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-nebula-200">Full Name *</label>
          <input
            type="text"
            value={shipping.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className={inputClass('fullName')}
            placeholder="Jane Astronaut"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-nebula-200">Email *</label>
          <input
            type="email"
            value={shipping.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={inputClass('email')}
            placeholder="jane@cosmicmail.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-nebula-200">Street Address *</label>
          <input
            type="text"
            value={shipping.address}
            onChange={(e) => onChange('address', e.target.value)}
            className={inputClass('address')}
            placeholder="123 Galaxy Ave"
          />
          {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-nebula-200">City *</label>
          <input
            type="text"
            value={shipping.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={inputClass('city')}
            placeholder="Star City"
          />
          {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-nebula-200">ZIP Code *</label>
          <input
            type="text"
            value={shipping.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            className={inputClass('zipCode')}
            placeholder="90210"
          />
          {errors.zipCode && <p className="mt-1 text-xs text-red-400">{errors.zipCode}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-nebula-200">Country</label>
          <select
            value={shipping.country}
            onChange={(e) => onChange('country', e.target.value)}
            className={inputClass('country')}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>
    </div>
  );
}