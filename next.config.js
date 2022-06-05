/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.jsx', 'api.ts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  experimental: {
    emotion: true,
  },
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production' && {
      properties: ['^data-test'],
    },
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error'],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
