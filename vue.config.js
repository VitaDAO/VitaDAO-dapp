const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    resolve: {
      fallback: {
        os: require.resolve('os-browserify/browser'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
      },
    },
  },
})
