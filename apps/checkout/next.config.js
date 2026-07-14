// apps/checkout/next.config.js
// ─────────────────────────────────────────────────────────────────
// CHECKOUT ZONE — Zone 2
// Runs on port 3002. basePath = /checkout.
// ─────────────────────────────────────────────────────────────────
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/checkout',

  assetPrefix: process.env.NODE_ENV === 'production'
    ? process.env.CHECKOUT_ASSET_PREFIX ?? '/checkout'
    : undefined,

  transpilePackages: ['@comet-crew/shared/ui', '@comet-crew/shared/state'],

  nx: {
    svgr: false,
  },
};

const plugins = [withNx];
module.exports = composePlugins(...plugins)(nextConfig);