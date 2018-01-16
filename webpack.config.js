const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./assets/scripts/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [new ExtractTextPlugin('[name][hash].css')],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /(\.scss|\.css)$/,
        include: path.resolve(__dirname, 'assets/styles'),
        loader: ExtractTextPlugin.extract('gradients', 'css!postcss!sass')
      }
    ]
  }
}
