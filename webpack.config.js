const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
  ]
};
