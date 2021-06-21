const path = require("path");
// const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let antCss = require.resolve("antd/dist/antd.css");
module.exports = {
  target: "electron-renderer",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/assets"),
    publicPath: "assets/",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  // externals: [nodeExternals({ allowlist: ["antd/dist/antd.css"] })],
  resolve: {
    extensions: [`.js`, `.jsx`, `.css`],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: `babel-loader`,
                options: {
                  babelrc: false,
                  presets: [
                    [
                      require.resolve(`@babel/preset-env`),
                      {
                        targets: {
                          chrome: "58",
                        },
                        modules: false,
                        useBuiltIns: false,
                        loose: true,
                      },
                    ],
                    require.resolve(`@babel/preset-react`),
                  ],
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            include: [antCss],
            use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
          },
          {
            test: /\.module\.(css|pcss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: "css-loader", options: { modules: true } },
            ],
          },
          {
            test: /\.(svg|png)$/,
            use: ["file-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new CopyPlugin({
      patterns: [
        {
          from: "./index.html",
          to: "../",
        },
        {
          from: "./main.js",
          to: "../",
        },
      ],
    }),
  ],
};
