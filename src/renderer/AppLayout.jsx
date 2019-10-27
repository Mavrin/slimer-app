import React from "react";
import styles from "./AppLayout.css";
import src from "./icon.svg";
export function AppLayout({ header, content }) {
  return (
    <div className={styles.app}>
      <header>
        <img className={styles.logo} src={src} alt="" />
        {header}
      </header>
      <main className={styles.main}>{content}</main>
      <footer />
    </div>
  );
}
