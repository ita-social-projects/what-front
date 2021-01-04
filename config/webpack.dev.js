const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
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
    historyApiFallback: true,
    disableHostCheck: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
});
