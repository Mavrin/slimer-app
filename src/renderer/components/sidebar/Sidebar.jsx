import * as React from "react";
import { Menu, Layout } from "antd";
import cx from "classnames";
import { AllIcon } from "./AllIcon";
import { QueueIcon } from "./QueueIcon";
import { About } from "./About";
import styles from "./Sidebar.module.pcss";

const { Sider } = Layout;
const menuItemLabel = cx("nav-text", styles.menuItemLabel);

export function Sidebar() {
  return (
    <Sider
      className={styles.sidebar}
      theme="light"
      width={266}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Menu
        mode="inline"
        style={{ borderRight: "none" }}
        defaultSelectedKeys={["4"]}
      >
        <Menu.Item className={styles.menuItem} key="1">
          <AllIcon />
          <span className={menuItemLabel}>All</span>
        </Menu.Item>
        <Menu.Item className={styles.menuItem} key="2">
          <QueueIcon />
          <span className={menuItemLabel}>AllQueue</span>
        </Menu.Item>
      </Menu>
      <About />
    </Sider>
  );
}
