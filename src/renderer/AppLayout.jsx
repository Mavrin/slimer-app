import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, Button } from "antd";
import styles from "./AppLayout.css";
import src from "./icon.svg";
const { Header, Content, Footer, Sider } = Layout;
function Empty() {
  return null;
}
export function AppLayout(
  { header, content, onChooseFiles } = { header: Empty, content: Empty }
) {
  return (
    <Layout style={{ minHeight: "100%", background: "#fff" }}>
      <Sider
        style={{ background: "#fff" }}
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          style={{ minHeight: "100%" }}
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          <Menu.Item key="0">
            <Icon type="search" />
            <span className="nav-text">Search</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <div className={styles.convert}>
            <Button onClick={onChooseFiles}>Convert video</Button>
          </div>
        </Menu>
      </Sider>
      <Layout className={styles.app} style={{ background: "#fff" }}>
        <Content>
          <div className={styles.app}>
            <header>
              <img className={styles.logo} src={src} alt="" />
              {header}
            </header>
            <main className={styles.main}>{content}</main>
            <footer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
