// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const os = require('os');
const glob = require('glob');
const paths = require('./paths.js');
const common = require('./webpack.common.js');

// eslint-disable-next-line no-console
console.table({
  'Environment mode': process.env.NODE_ENV,
  'Webpack Threads': os.cpus().length,
});

module.exports = merge(common, {
  mode: 'production',
  entry: `${paths.src._}/index.js`,
  devtool: false,
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new PurgecssPlugin({
      paths: [
        paths.src.html,
        ...glob.sync(`${paths.src._}/**/*`, { nodir: true }),
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length,
            },
          },
          'babel-loader',
        ],
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
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
                  ['autoprefixer'],
                ],
                sourceMap: false,
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                ],
                sourceMap: false,
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
