const { FFMPEGService } = require("../main/services/FFMPEGService");
const { initProgress } = require("./progress");
// const ffmpegService = new FFMPEGService({pathToBin: 'ffmpeg'});
const ffmpegService = new FFMPEGService({});
const step1 = document.querySelectorAll(`.step-1`);
const step2 = document.querySelectorAll(`.step-2`);
const stepFinal = document.querySelectorAll(`.step-final`);
const fileInput = document.querySelector("#inputFile");

fileInput.addEventListener("change", () => {
  step1.forEach(el => el.classList.add("hidden"));
  step2.forEach(el => el.classList.remove("hidden"));
});

ffmpegService.getVersion().then(console.log, console.error);

const message = document.getElementById("message");

document.querySelector(`#new`).addEventListener("click", () => {
  message.innerHTML = ``;
  step1.forEach(el => el.classList.remove("hidden"));
  step2.forEach(el => el.classList.add("hidden"));
  stepFinal.forEach(el => el.classList.add("hidden"));
});

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
  step2.forEach(el => el.classList.add("hidden"));
  const progress = initProgress();
  ffmpegService
    .convert(file, outputDir)
    .then(ffmpeg => {
      return new Promise((resolve, reject) => {
        /* ffmpeg.stdout.on("data", data => {
          console.log(`stdout: ${data}`);
          message.innerHTML = data;
        });*/

        ffmpeg.stderr.on("data", data => {
          progress.update(data);
          message.innerHTML = progress.getCurrentProgress() + "%";
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
    })
    .finally(() => {
      stepFinal.forEach(el => el.classList.remove("hidden"));
    });
});
