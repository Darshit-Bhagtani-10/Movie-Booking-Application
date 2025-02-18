// craco.config.js
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Optimize bundle splitting
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 50000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|movie-design-hv)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      };

      // Add service worker configuration
      webpackConfig.output.globalObject = 'this';

      if (env === 'production') {
        // Remove default service worker plugin
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => plugin.constructor.name !== 'GenerateSW'
        );

        // Add custom service worker plugin
        webpackConfig.plugins.push(
          new InjectManifest({
            swSrc: path.resolve(__dirname, 'src/service-worker.js'),
            swDest: 'service-worker.js',
            exclude: [/\.map$/, /asset-manifest\.json$/],
          })
        );
      }

      // Copy offline.html to build directory
      webpackConfig.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'public/offline.html'),
              to: path.resolve(__dirname, 'build/offline.html'),
            },
          ],
        })
      );

      // Add bundle analyzer in development
      if (env === 'development') {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
          })
        );
      }

      return webpackConfig;
    },
  },
};