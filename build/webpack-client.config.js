const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack-common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  entry: path.join(__dirname, "../client/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist/client"),
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../client/public/index.html"),
      filename: "index.html",
      inject: true
    }),
  ],
});
