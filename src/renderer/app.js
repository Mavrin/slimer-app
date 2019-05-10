const { FFMPEGService } = require("../main/services/FFMPEGService");

// const ffmpegService = new FFMPEGService({pathToBin: 'ffmpeg'});
const ffmpegService = new FFMPEGService({});

ffmpegService.getVersion().then(console.log, console.error);

const message = document.getElementById("message");

document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();

  e.currentTarget.setAttribute("disabled", true);
  message.innerHTML = "start converting";
  const file = e.currentTarget.querySelector("#inputFile").files[0].path;
  if (!e.currentTarget.querySelector("#outputDir").files[0]) {
    message.innerHTML = "Please set output dir";
    return;
  }
  const outputDir = e.currentTarget.querySelector("#outputDir").files[0].path;
  ffmpegService
    .convert(file, outputDir)
    .then(ffmpeg => {
      return new Promise((resolve, reject) => {
        ffmpeg.stdout.on("data", data => {
          console.log(`stdout: ${data}`);
          message.innerHTML = data;
        });

        ffmpeg.stderr.on("data", data => {
          console.log(`stderr: ${data}`);
          message.innerHTML = data;
        });
        return ffmpeg.on("close", code => {
          if (code) {
            return reject(code);
          }
          console.log(`child process exited with code ${code}`);
          resolve();
        });
      });
    })
    .then(() => (message.innerHTML = "video was converted"))
    .catch(e => {
      message.innerHTML = `Could not convert videos ${e}`;
    });
});
