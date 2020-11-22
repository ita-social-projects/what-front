const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.dist,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      fix: false,
      formatter: 'table',
    }),
  ],
});