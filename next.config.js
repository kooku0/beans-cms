/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.jsx', 'api.ts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  emotion: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production' && {
      properties: ['^data-test'],
    },
    removeConsole: process.env.NODE_ENV === 'production' && {
      exclude: ['error'],
    },
  },
  webpack5: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = { fs: false };

    return config;
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
