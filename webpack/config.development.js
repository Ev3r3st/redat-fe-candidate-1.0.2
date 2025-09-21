const webpack = require('webpack');
const { merge } = require('webpack-merge');
const configBase = require('./config.base');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VERSION = require('../package.json').version;
const PATHS = require('./constants');
const Dotenv = require('dotenv-webpack');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'whatwg-fetch',
    path.join(PATHS.SRC_DIR, 'index.tsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(VERSION)
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('index.html'),
    })
  ],

  devServer: {
    compress: true,
    historyApiFallback: true, 
    port: 8080,
    client: {
      progress: true
    }
  }
};

module.exports = merge(configBase, config);
