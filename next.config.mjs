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
  // Configure webpack to handle undici module parsing error
  webpack: (config, { dev, isServer }) => {
    // Disable caching in development to prevent ENOENT errors
    if (dev) {
      config.cache = false;
    }
    
    // Add specific rule for undici package
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]undici[\\/].*\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
      }
    });

    return config;
  },
  // Add transpilePackages to handle undici module parsing error
  transpilePackages: ['undici'],
}

export default nextConfig