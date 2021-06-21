import * as React from "react";
import * as PropTypes from "prop-types";
import cx from "classnames";
import styles from "./UploadForm.module.css";

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

FilesList.propTypes = {
  files: PropTypes.array,
};

export function UploadForm({
  step,
  onChooseFiles,
  onSubmit,
  onChooseOutputDir,
  selectedFiles = [],
  outputDir,
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
        <button
          onClick={onChooseOutputDir}
          className={cx(styles.button)}
          type="button"
        >
          Output directory &hellip;
        </button>
        <div className={cx(styles.convert)}>
          <button className={cx(styles.button)} type="submit">
            Convert
          </button>
        </div>
      </div>
    </form>
  );
}

UploadForm.propTypes = {
  step: PropTypes.number.isRequired,
  onChooseFiles: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChooseOutputDir: PropTypes.func.isRequired,
  selectedFiles: PropTypes.array,
  outputDir: PropTypes.string,
};
