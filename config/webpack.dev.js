const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const os = require('os');
const common = require('./webpack.common.js');
const paths = require('./paths.js');

const PORT = 8080;
const PlatformCores = os.cpus().length;
const JSCompilationThreads = PlatformCores / 2 - 1;
const SCSSCompilationThreads = PlatformCores - JSCompilationThreads - 1;

// eslint-disable-next-line no-console
console.table({
  'Environment mode': process.env.NODE_ENV,
  'Platform cores': PlatformCores,
  'JS|X Compilation Threads': JSCompilationThreads,
  'SCSS Compilation Threads': SCSSCompilationThreads,
  'Webpack Development Server Thread': 1,
});

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
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: JSCompilationThreads,
              poolTimeout: Infinity,
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('react-refresh/babel'),
              ],
            },
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: SCSSCompilationThreads,
              poolTimeout: Infinity,
            },
          },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
                sourceMap: true,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
                sourceMap: true,
              },
            },
          },
        ],
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.ttf$/,
        type: 'asset/inline',
      },

    ],
  },
});
