// libs/shared/state/src/lib/use-cart.ts
// ─────────────────────────────────────────────────────────────────
// Cross-Zone Cart State
// ─────────────────────────────────────────────────────────────────
// WHY localStorage (not React context)?
//   Next.js Multi-Zones are *independent Next.js processes*. React
//   context, Zustand stores, and any in-memory state are completely
//   reset on every cross-zone navigation (hard navigation).
//   localStorage persists across zone boundaries because it is scoped
//   to the browser origin (e.g. http://localhost:3000), not the JS
//   bundle. All three zones share the same origin, so they all read
//   and write the same localStorage keys.
//
// STORAGE SCHEMA:
//   Key:   "shop_cart"
//   Value: JSON-serialised CartState
//
// SYNC MECHANISM:
//   The hook subscribes to the native "storage" event, which fires in
//   all other tabs/windows (and in the same tab when using the helper
//   functions directly, via a synthetic dispatch).
// ─────────────────────────────────────────────────────────────────
'use client';

import { useCallback, useEffect, useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
  updatedAt: number; // Unix ms timestamp — helps detect stale data
}

// ── Constants ─────────────────────────────────────────────────────

const CART_KEY = 'shop_cart' as const;

const EMPTY_CART: CartState = { items: [], updatedAt: 0 };

// ── Storage helpers (framework-agnostic, importable without React) ─

/** Read the raw cart state from localStorage. Safe in SSR (returns empty). */
export function readCart(): CartState {
  if (typeof window === 'undefined') return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartState) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

/** Persist cart and dispatch a synthetic storage event so same-tab
 *  listeners (e.g. the Header's cart badge) update immediately.    */
export function writeCart(state: CartState): void {
  if (typeof window === 'undefined') return;
  const serialised = JSON.stringify(state);
  window.localStorage.setItem(CART_KEY, serialised);

  // Synthetic event — native "storage" only fires in *other* tabs.
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: CART_KEY,
      newValue: serialised,
      storageArea: window.localStorage,
    })
  );
}

/** Clear all cart items from storage. */
export function clearCart(): void {
  writeCart({ items: [], updatedAt: Date.now() });
}

// ── React Hook ────────────────────────────────────────────────────

export interface UseCartReturn {
  /** All items currently in the cart. */
  items: CartItem[];
  /** Total number of individual units across all items. */
  cartCount: number;
  /** Computed subtotal (price × quantity). */
  subtotal: number;
  /** Add a product to the cart (increments qty if already present). */
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  /** Remove a product completely from the cart by ID. */
  removeItem: (id: string) => void;
  /** Update the quantity of a specific item. Pass 0 to remove. */
  updateQuantity: (id: string, quantity: number) => void;
  /** Wipe the cart entirely. */
  clearAll: () => void;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartState>(EMPTY_CART);

  // ── Hydrate from localStorage after mount ─────────────────────
  useEffect(() => {
    setCart(readCart());
  }, []);

  // ── Listen for cross-tab / cross-zone updates ─────────────────
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key !== CART_KEY) return;
      const updated = event.newValue
        ? (JSON.parse(event.newValue) as CartState)
        : EMPTY_CART;
      setCart(updated);
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ── Mutators ──────────────────────────────────────────────────

  const addItem = useCallback(
    (incoming: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      setCart((prev) => {
        const qty = incoming.quantity ?? 1;
        const existingIndex = prev.items.findIndex((i) => i.id === incoming.id);
        let nextItems: CartItem[];

        if (existingIndex >= 0) {
          nextItems = prev.items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        } else {
          nextItems = [...prev.items, { ...incoming, quantity: qty }];
        }

        const next: CartState = { items: nextItems, updatedAt: Date.now() };
        writeCart(next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next: CartState = {
        items: prev.items.filter((i) => i.id !== id),
        updatedAt: Date.now(),
      };
      writeCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prev) => {
      const next: CartState = {
        items: prev.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
        updatedAt: Date.now(),
      };
      writeCart(next);
      return next;
    });
  }, [removeItem]);

  const clearAll = useCallback(() => {
    const next: CartState = { items: [], updatedAt: Date.now() };
    setCart(next);
    writeCart(next);
  }, []);

  // ── Derived values ─────────────────────────────────────────────

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal  = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items: cart.items, cartCount, subtotal, addItem, removeItem, updateQuantity, clearAll };
}