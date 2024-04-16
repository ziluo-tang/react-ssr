const path = require("path");
const WebpackBar = require("webpackbar");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "development",
  entry: path.join(__dirname, "../server/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist/server"),
    clean: true,
    publicPath: "/",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [new WebpackBar()],
};
