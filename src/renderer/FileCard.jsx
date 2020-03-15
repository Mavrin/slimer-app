import * as React from "react";
import * as PropTypes from "prop-types";
import styles from "./FileCard.pcss";

export function FileCard({ name, path, status }) {
  return (
    <div className={styles.card}>
      {name} {path} {status}
    </div>
  );
}

FileCard.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["pending", "ready", "processing"]).isRequired
};
