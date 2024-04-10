const { merge } = require("webpack-merge");
const path = require("path");
const client = require("./webpack-client.config");

module.exports = merge(client, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist/client"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    open: true,
    hot: true,
    client: {
      logging: "warn",
    },
  },
  devtool: "cheap-source-map",
});
