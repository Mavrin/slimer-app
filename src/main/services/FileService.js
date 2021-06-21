const { basename, extname } = require("path");
const { shell } = require("electron");

function getName(path) {
  return basename(path, extname(path));
}

module.exports = {
  getFilesInfo({ paths }) {
    return paths.map((path) => ({
      name: getName(path),
      path,
    }));
  },
  openFile(path) {
    return shell.openItem(path);
  },
};
