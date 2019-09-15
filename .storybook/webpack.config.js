const appConfig = require("../webpack.config");

module.exports = ({ config }) => {
  config.plugins.push(...appConfig.plugins);
  config.module.rules.push(...appConfig.module.rules);
  return config;
};
