const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../client/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist/client"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../client/public/index.html"),
      filename: "index.html",
      inject: 'body',
    }),
  ],
};
