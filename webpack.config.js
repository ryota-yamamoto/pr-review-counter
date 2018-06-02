const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: './bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              failOnError: true,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
    new Dotenv({ path: './src/.env' }),
  ],
}
