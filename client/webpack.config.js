const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    noInfo: true,
    port: 3001,
    proxy: {
      '/api/graphql': {
        target: 'http://localhost:3000/graphql',
      },
    },
  },
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    resolve(__dirname, 'src', 'main.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules',
        ],
      },
      {
        test: /.(png|woff2?|eot|ttf|svg)$/,
        use: 'url-loader',
      },
      {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
    }),
    new HotModuleReplacementPlugin(),
  ],
}
