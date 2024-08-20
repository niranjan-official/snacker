import withPWAInit from "@ducanh2912/next-pwa";

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

const withPWA = withPWAInit({
  dest: "public",
  fallbacks: {
    document: "/offline",
  },
  disable: true
});

export default withPWA(nextConfig);
