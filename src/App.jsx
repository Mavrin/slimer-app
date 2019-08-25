import React, { useEffect } from "react";
import "./renderer/app.css";
export function App() {
  useEffect(() => {
    import("./renderer/app");
  });
  return (
    <div className="app">
      <header>
        <img src="src/icon.svg" alt="" />
        <div className="step-1">
          <h1>Welcome to RubberApp</h1>
          <div className="description">
            Compress and prepare videos for the web
          </div>
        </div>
        <div className="step-2 hidden">
          <h1>Settings</h1>
        </div>
      </header>
      <main>
        <form id="form">
          <div className="step-1">
            <label className="button choose-files">
              Select file &hellip;
              <input className="input-file" id="inputFile" type="file" />
            </label>
          </div>
          <div className="step-2 hidden">
            <label className="button choose-directory">
              Output directory &hellip;
              <input id="outputDir" webkitdirectory="true" type="file" />
            </label>
            <div className="convert">
              <button className="button" type="submit">
                Convert
              </button>
            </div>
          </div>
        </form>
        <div className="step-final hidden">
          <button id="new" className="button" type="button">
            Convert more
          </button>
        </div>
        <div id="message" />
      </main>
      <footer />
    </div>
  );
}
