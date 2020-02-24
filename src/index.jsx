import React from "react";
import { render } from "react-dom";
import { FFMPEGService } from "./main/services/FFMPEGService";
import fileService from "./main/services/FileService";
import { App } from "./renderer/App";

const ffmpegService = new FFMPEGService({});
const container = document.getElementById("container");

render(
  <App ffmpegService={ffmpegService} fileService={fileService} />,
  container
);
