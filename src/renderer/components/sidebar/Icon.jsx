import * as React from "react";
import * as PropTypes from "prop-types";
import styles from "./Icon.module.pcss";

export function Icon({ children }) {
  return <span className={styles.icon}>{children}</span>;
}

Icon.propTypes = {
  children: PropTypes.node,
};
