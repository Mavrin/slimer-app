import React from "react";
import cx from "classnames";

export function UploadForm({
  step,
  onChooseFiles,
  onSubmit,
  onChooseOutputDir
}) {
  return (
    <form onSubmit={onSubmit} id="form">
      <div className={cx(`step-1`, { hidden: step !== 1 })}>
        <label className="button choose-files">
          Select file &hellip;
          <input
            onChange={onChooseFiles}
            className="input-file"
            id="inputFile"
            type="file"
            multiple
          />
        </label>
      </div>
      <div className={cx(`step-2`, { hidden: step !== 2 })}>
        <label className="button choose-directory">
          Output directory &hellip;
          <input
            onChange={onChooseOutputDir}
            id="outputDir"
            webkitdirectory="true"
            type="file"
          />
        </label>
        <div className="convert">
          <button className="button" type="submit">
            Convert
          </button>
        </div>
      </div>
    </form>
  );
}
