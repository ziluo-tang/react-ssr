const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack-common.config");
module.exports = merge(common, {
  target: "node",
  mode: "development",
  entry: path.join(__dirname, "../server/index.tsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist/server"),
    clean: true,
  },
});
