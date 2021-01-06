const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const paths = require('./paths.js');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${paths.src._}/index.html`,
    }),
    new ProgressPlugin(),
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
};
