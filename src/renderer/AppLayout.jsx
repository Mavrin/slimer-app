import * as React from "react";
import * as PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Layout, Button } from "antd";
import styles from "./AppLayout.css";
import { Sidebar } from "./components/sidebar/Sidebar";
const { Content } = Layout;

function Empty() {
  return null;
}

export function AppLayout(
  { header, content, onChooseFiles } = { header: Empty, content: Empty }
) {
  return (
    <Layout style={{ minHeight: "100%", background: "#fff" }}>
      <Sidebar />
      <Layout className={styles.app} style={{ background: "#fafafb" }}>
        <header className={styles.header}>
          <div className={styles.title}>{header}</div>
          <div className={styles.headerControls}>
            <Button className={styles.convertButton} onClick={onChooseFiles}>
              Convert video
            </Button>
          </div>
        </header>
        <Content>
          <main className={styles.main}>{content}</main>
        </Content>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
  onChooseFiles: PropTypes.func
};
