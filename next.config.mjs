/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add transpilePackages to handle undici module parsing error
  transpilePackages: ['undici'],
  // Configure webpack to handle caching issues
  webpack: (config, { dev, isServer }) => {
    // Disable caching in development to prevent ENOENT errors
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

export default nextConfig