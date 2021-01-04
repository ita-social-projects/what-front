const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const paths = require('./paths');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

// eslint-disable-next-line no-console
console.log(chalk.black.bgGreen.bold(`Environment set to ${mode} mode`));

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${paths.src._}/index.html`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src.assets,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
        {
          from: paths.public,
          to: '.',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': paths.src._,
      '@utils': paths.src.utils,
      '@assets': paths.src.assets,
      '@styles': paths.src.styles,
      '@shared': paths.src.shared,
      '@models': paths.src.models,
      '@screens': paths.src.screens,
      '@features': paths.src.features,
      '@components': paths.src.components,
    },
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: isDev ? {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              isDev && require.resolve('react-refresh/babel'),
            ],
          },
        } : 'babel-loader',
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: isDev,
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
                sourceMap: isDev,
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
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                sourceMap: isDev,
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
};
