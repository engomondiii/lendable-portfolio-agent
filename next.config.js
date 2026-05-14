/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow images from Lendable domain if needed later
  images: {
    domains: ['lendable.io'],
  },
  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
  },
};

module.exports = nextConfig;