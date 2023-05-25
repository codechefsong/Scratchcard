// @ts-check
const optimizedImages = require('next-optimized-images')

/** @type {import('next').NextConfig} */
const nextConfig = optimizedImages({
  reactStrictMode: true,
  handleImages: ['svg', 'png'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // https://github.com/vercel/next.js/issues/7755#issuecomment-937721514
      config.resolve.fallback.fs = false
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
});

module.exports = nextConfig;
