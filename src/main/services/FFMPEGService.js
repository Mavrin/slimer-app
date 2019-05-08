const { spawn } = require("child_process");
const path = require("path");
const execPromise = require("../utils/execPromise");
class FFMPEGService {
  constructor({ pathToBin }) {
    this.pathToBin = pathToBin;
  }

  async getVersion() {
    const result = await execPromise("ffmpeg -version");
    return result;
  }
  async convert(file, outputDir = "output/") {
    const { name } = path.parse(file);
    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        file,
        "-map_metadata",
        "-1",
        "-c:a",
        "libfdk_aac",
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
      ffmpeg.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
      });

      ffmpeg.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
      });
      return ffmpeg.on("close", code => {
        if (code) {
          return reject(code);
        }
        console.log(`child process exited with code ${code}`);
        resolve();
      });
    });
  }
}
module.exports = {
  FFMPEGService
};
