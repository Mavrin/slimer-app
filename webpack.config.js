const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "electron-renderer",
  entry: {
    app: "./src/renderer/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/assets")
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new CopyPlugin([
      {
        from: "./src/icon.svg",
        to: "../src/"
      },
      {
        from: "./index.html",
        to: "../"
      },
      {
        from: "./main.js",
        to: "../"
      }
    ])
  ]
};
