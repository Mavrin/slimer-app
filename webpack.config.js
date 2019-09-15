const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "electron-renderer",
  entry: {
    app: "./src/index.jsx"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/assets"),
    publicPath: "assets/"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [`.js`, `.jsx`]
  },
  module: {
    rules: [
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
                      chrome: "58"
                    },
                    modules: false,
                    useBuiltIns: false,
                    loose: true
                  }
                ],
                require.resolve(`@babel/preset-react`)
              ],
              plugins: [
                require.resolve(`@babel/plugin-proposal-dynamic-import`),
                require.resolve(`@babel/plugin-transform-modules-commonjs`)
              ],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.svg$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new CopyPlugin([
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
