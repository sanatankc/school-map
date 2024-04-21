/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { dev, isServer }) => {
    // Exclude *.spec.ts(x) files from being compiled by Next.js
    config.module.rules.push({
      test: /schoolData\.csv?$/,
      use: 'ignore-loader',
    });

    return config;
  },
}

module.exports = nextConfig
