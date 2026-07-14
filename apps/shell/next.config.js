const { composePlugins, withNx } = require('@nx/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@comet-crew/shared-ui', '@comet-crew/shared-state'],

  async rewrites() {
    // ✅ Use 127.0.0.1 (IPv4) — NOT localhost
    // Node.js 17+ resolves "localhost" to ::1 (IPv6) first.
    // If the zone only binds to 127.0.0.1 (IPv4), the connection is
    // refused immediately even though the zone IS running.
    const PRODUCTS_URL = process.env.PRODUCTS_ZONE_URL ?? 'http://127.0.0.1:3001';
    const CHECKOUT_URL = process.env.CHECKOUT_ZONE_URL ?? 'http://127.0.0.1:3002';

    return [
      // ── Products Zone ─────────────────────────────────────────
      { source: '/products',        destination: `${PRODUCTS_URL}/products`        },
      { source: '/products/:path*', destination: `${PRODUCTS_URL}/products/:path*` },

      // ── Checkout Zone ─────────────────────────────────────────
      { source: '/checkout',        destination: `${CHECKOUT_URL}/checkout`        },
      { source: '/checkout/:path*', destination: `${CHECKOUT_URL}/checkout/:path*` },
    ];
  },
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);