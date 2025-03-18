/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'food-delvo.vercel.app'],
    },
    optimisticClientCache: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: process.env.VERCEL_URL || 'food-delvo.vercel.app',
        pathname: '/uploads/**',
      },
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|jpeg|webp)$/i,
      type: 'asset/resource',
    });
    return config;
  },

  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compress: true,
};

export default nextConfig;