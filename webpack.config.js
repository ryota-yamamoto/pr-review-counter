const webpack = require('webpack')

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
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [new webpack.IgnorePlugin(/^encoding$/, /node-fetch/)],
}
