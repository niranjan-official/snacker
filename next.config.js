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

async function getPwaConfig() {
  const withPWA = (await import('./pwaConfig.cjs')).default;
  return withPWA(nextConfig);
}

export default getPwaConfig();
