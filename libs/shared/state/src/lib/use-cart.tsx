'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
  maxQuantity?: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CART_KEY = 'shop_cart';
const WISHLIST_KEY = 'shop_wishlist';

// ── Cached Snapshots (module-level, stable references) ─────────────
// CRITICAL: These must be stable references. We only create a NEW
// array when the underlying data actually changes — never on every
// getSnapshot() call. This prevents the "getServerSnapshot should be
// cached" infinite-loop warning/error.

let cartSnapshotCache: CartItem[] = [];
let wishlistSnapshotCache: WishlistItem[] = [];

// Empty, permanently-stable references for SSR (server has no localStorage)
const EMPTY_CART: CartItem[] = [];
const EMPTY_WISHLIST: WishlistItem[] = [];

const listeners = new Set<() => void>();

// ── Read from localStorage and update the cache ONLY if changed ────
function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return EMPTY_CART;
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed: CartItem[] = raw ? JSON.parse(raw) : [];
    // Only replace the cached reference if content actually differs
    if (JSON.stringify(parsed) !== JSON.stringify(cartSnapshotCache)) {
      cartSnapshotCache = parsed;
    }
    return cartSnapshotCache;
  } catch {
    return cartSnapshotCache;
  }
}

function readWishlistFromStorage(): WishlistItem[] {
  if (typeof window === 'undefined') return EMPTY_WISHLIST;
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    const parsed: WishlistItem[] = raw ? JSON.parse(raw) : [];
    if (JSON.stringify(parsed) !== JSON.stringify(wishlistSnapshotCache)) {
      wishlistSnapshotCache = parsed;
    }
    return wishlistSnapshotCache;
  } catch {
    return wishlistSnapshotCache;
  }
}

// ── getSnapshot functions passed to useSyncExternalStore ───────────
// These ALWAYS return the cached reference — never construct a new
// array inline. This is what useSyncExternalStore requires.
function getCartSnapshot(): CartItem[] {
  return readCartFromStorage();
}

function getWishlistSnapshot(): WishlistItem[] {
  return readWishlistFromStorage();
}

// ── getServerSnapshot functions (SSR-safe, stable references) ──────
// Must return the SAME reference every time — never `() => []` inline,
// which allocates a new array on every call.
function getCartServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function getWishlistServerSnapshot(): WishlistItem[] {
  return EMPTY_WISHLIST;
}

// ── Write helpers ────────────────────────────────────────────────────
function setCartData(items: CartItem[]) {
  cartSnapshotCache = items; // update cache immediately (stable ref for this update)
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
  window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
}

function setWishlistData(items: WishlistItem[]) {
  wishlistSnapshotCache = items;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
  window.dispatchEvent(new StorageEvent('storage', { key: WISHLIST_KEY }));
}

// ── Subscribe (shared for both cart & wishlist) ─────────────────────
function subscribe(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === CART_KEY || e.key === WISHLIST_KEY || e.key === null) {
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

// ── useCart Hook ────────────────────────────────────────────────────
export function useCart() {
  const items = useSyncExternalStore(
    subscribe,
    getCartSnapshot,
    getCartServerSnapshot // ✅ stable reference, not an inline arrow fn
  );

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const current = getCartSnapshot();
    const existingIndex = current.findIndex(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...current];
      const newQty = updated[existingIndex].quantity + (item.quantity ?? 1);
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: Math.min(newQty, item.maxQuantity ?? 99),
      };
    } else {
      updated = [...current, { ...item, quantity: item.quantity ?? 1 }];
    }
    setCartData(updated);
  }, []);

  const removeItem = useCallback((id: string, size?: string, color?: string) => {
    const current = getCartSnapshot();
    const updated = current.filter(
      (i) => !(i.id === id && i.size === size && i.color === color)
    );
    setCartData(updated);
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number, size?: string, color?: string) => {
      const current = getCartSnapshot();
      if (quantity <= 0) {
        setCartData(current.filter((i) => !(i.id === id && i.size === size && i.color === color)));
        return;
      }
      const updated = current.map((i) =>
        i.id === id && i.size === size && i.color === color
          ? { ...i, quantity: Math.min(quantity, i.maxQuantity ?? 99) }
          : i
      );
      setCartData(updated);
    },
    []
  );

  const clearAll = useCallback(() => {
    setCartData([]);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    items: isHydrated ? items : EMPTY_CART,
    cartCount: isHydrated ? cartCount : 0,
    subtotal: isHydrated ? subtotal : 0,
    addItem,
    removeItem,
    updateQuantity,
    clearAll,
    isHydrated,
  };
}

// ── useWishlist Hook ─────────────────────────────────────────────────
export function useWishlist() {
  const items = useSyncExternalStore(
    subscribe,
    getWishlistSnapshot,
    getWishlistServerSnapshot // ✅ stable reference
  );

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    const current = getWishlistSnapshot();
    const exists = current.some((i) => i.id === item.id);
    const updated = exists
      ? current.filter((i) => i.id !== item.id)
      : [...current, item];
    setWishlistData(updated);
    return !exists;
  }, []);

  const isInWishlist = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return {
    items: isHydrated ? items : EMPTY_WISHLIST,
    count: isHydrated ? items.length : 0,
    toggleWishlist,
    isInWishlist,
    isHydrated,
  };
}