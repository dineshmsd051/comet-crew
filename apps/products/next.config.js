// apps/products/next.config.js
// ─────────────────────────────────────────────────────────────────
// PRODUCTS ZONE — Zone 1
// Runs on port 3001. basePath tells Next.js this app lives under
// /products, so all internal routing, Link hrefs, and static asset
// references are automatically prefixed.
// ─────────────────────────────────────────────────────────────────
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/products',

  // assetPrefix ensures CDN/proxy can distinguish this zone's assets
  assetPrefix: process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTS_ASSET_PREFIX ?? '/products'
    : undefined,

  transpilePackages: ['@comet-crew/shared/ui', '@comet-crew/shared/state'],

  nx: {
    svgr: false,
  },
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);