const path = require('path');

module.exports = {
  entry: "./assets/scripts/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: 'babel-loader'
      }
    ]
  }
}
