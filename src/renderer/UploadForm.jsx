import React from "react";
import cx from "classnames";
import styles from "./UploadForm.css";

function FilesList({ files }) {
  if (files.length < 1) {
    return null;
  }
  return (
    <ul>
      {files.map(({ path, name }) => {
        return <li key={path}>{name}</li>;
      })}
    </ul>
  );
}

export function UploadForm({
  step,
  onChooseFiles,
  onSubmit,
  onChooseOutputDir,
  selectedFiles = [],
  outputDir
}) {
  return (
    <form onSubmit={onSubmit} id="form">
      <div className={cx(`step-1`, { [styles.hidden]: step !== 1 })}>
        <label className={cx(styles.button, styles.label)}>
          Select files &hellip;
          <input
            onChange={onChooseFiles}
            className={cx(styles.input)}
            id="inputFile"
            type="file"
            multiple
          />
        </label>
      </div>
      <div className={cx(`step-2`, { [styles.hidden]: step !== 2 })}>
        <FilesList files={selectedFiles} />
        {outputDir}
        <label className={cx(styles.button, styles.label)}>
          Output directory &hellip;
          <input
            onChange={onChooseOutputDir}
            id="outputDir"
            className={cx(styles.input)}
            webkitdirectory="true"
            type="file"
          />
        </label>
        <div className={cx(styles.convert)}>
          <button className={cx(styles.button)} type="submit">
            Convert
          </button>
        </div>
      </div>
    </form>
  );
}
