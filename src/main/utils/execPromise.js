const { exec } = require("child_process");

module.exports = (command, options) => {
  return new Promise((resolve, reject) => {
    exec(command, options, function(err, stdout, stderr) {
      if (err || stderr) {
        reject(err || new Error(stderr));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};
