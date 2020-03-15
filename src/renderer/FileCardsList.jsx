import * as React from "react";
import * as PropTypes from "prop-types";
import { FileCard } from "./FileCard";
import styles from "./FileCardsList.pcss";

export function FileCardsList({
  files,
  convertFile = () => {},
  openFile = () => {}
}) {
  if (files.length === 0) {
    return null;
  }
  return (
    <div className={styles.list}>
      {files.map(({ path, name, status }) => {
        return (
          <FileCard
            key={path}
            name={name}
            status={status}
            convertFile={convertFile}
            openFile={openFile}
          />
        );
      })}
    </div>
  );
}

FileCardsList.propTypes = {
  files: PropTypes.arrayOf({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["pending", "ready", "processing"]).isRequired
  }).isRequired,
  convertFile: PropTypes.func,
  openFile: PropTypes.func
};
