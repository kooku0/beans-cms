// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')(['chart.js', 'recoil', 'axios-retry', 'nextjs-progressbar', 'is-retry-allowed']);

/** @type {import('next').NextConfig} */
const moduleExports = withTM({
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
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'media.staging.kr.kasa.exchange', 'media.kr.kasa.exchange'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
