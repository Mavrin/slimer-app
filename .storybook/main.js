const appConfig = require("../webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(jsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.module.rules[7] = {
      oneOf: [
        {
          test: /\.module\.(css|pcss)$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: { modules: true, importLoaders: 1 },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: { importLoaders: 1 },
            },
          ],
        },
      ],
    };
    // config.plugins.push(new MiniCssExtractPlugin());
    return config;
  },
};
