const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');

const PORT = 8080;

module.exports = merge(common, {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    `${paths.src._}/index.js`,
  ],
  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: paths.dist,
    open: true,
    compress: true,
    hot: true,
    port: PORT,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
});
