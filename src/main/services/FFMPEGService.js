const { spawn } = require("child_process");
const path = require("path");
const execPromise = require("../utils/execPromise");

function getWithExt(name) {
  return process.platform === "win32" ? `${name}.exe` : name;
}

function getFfmpegPath() {
  const pathTo = process.env.PATH_TO_FFMPEG;
  return pathTo
    ? pathTo
    : path.join(
        __dirname,
        "../../../../",
        "app.asar.unpacked/ffmpeg/bin",
        getWithExt("ffmpeg")
      );
}

class FFMPEGService {
  constructor({ pathToBin = getFfmpegPath() }) {
    this.pathToBin = pathToBin;
  }

  async getVersion() {
    return await execPromise(`${this.pathToBin} -version`);
  }
  async convert(file, outputDir = "output/") {
    const { name } = path.parse(file);
    return new Promise(resolve => {
      const ffmpeg = spawn(this.pathToBin, [
        "-y",
        "-i",
        file,
        "-map_metadata",
        "-1",
        "-c:a",
        "aac",
        "-c:v",
        "libx264",
        "-crf",
        "24",
        "-preset",
        "veryslow",
        "-profile:v",
        "main",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        `${outputDir}/${name}.mp4`
      ]);

      return resolve(ffmpeg);
    });
  }
}
module.exports = {
  FFMPEGService
};
