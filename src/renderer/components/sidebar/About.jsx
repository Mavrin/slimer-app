import * as React from "react";
import logoSrc from "../../logo.png";
import styles from "./About.module.pcss";

export function About() {
  return (
    <div className={styles.about}>
      <div className={styles.logo}>
        <img height={48} src={logoSrc} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>SlimerApp</div>
        <div className={styles.version}>v0.0.1</div>
      </div>
    </div>
  );
}
