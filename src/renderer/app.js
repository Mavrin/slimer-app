const { FFMPEGService } = require("../main/services/FFMPEGService");

const ffmpegService = new FFMPEGService({});

ffmpegService.getVersion().then(console.log, console.error);

const message = document.getElementById("message");

document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();

  e.currentTarget.setAttribute("disabled", true);
  message.innerHTML = "start converting";
  const file = e.currentTarget.querySelector("#inputFile").files[0].path;
  const outputDir = e.currentTarget.querySelector("#outputDir").files[0].path;
  ffmpegService
    .convert(file, outputDir)
    .then(() => {
      message.innerHTML = "video was converted";
    })
    .catch(e => {
      message.innerHTML = `Could not convert videos ${e}`;
    });
});
