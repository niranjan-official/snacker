import { default as withPWA } from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

// Apply PWA configuration
const pwaConfig = withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: 'public',
  fallbacks: {
    document: '/offline', // if you want to fallback to a custom page rather than /_offline
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default pwaConfig(nextConfig);
