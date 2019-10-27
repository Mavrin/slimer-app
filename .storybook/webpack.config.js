const appConfig = require("../webpack.config");

module.exports = ({ config }) => {
  config.plugins.push(...appConfig.plugins);
  config.module.rules = appConfig.module.rules;
  return config;
};
