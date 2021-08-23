import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import styles from "./index.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { APP_ENV, APP_REGION } from "../../config";

interface HeaderProps {
  onMenuClick: (param: any) => void;
  user: {
    [key: string]: string;
  };
}

export default function HeaderRightContent(props: HeaderProps) {
  const { onMenuClick, user } = props;
  const { name, picture } = user;
  const HeaderMenu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={HeaderMenu} className={styles.right}>
      <span>
        <span className={styles.envItem}>
          Region: {APP_REGION.toUpperCase()}
        </span>
        <span className={styles.envItem}>
          Environment:{" "}
          <span
            style={{
              color: ["live", "uat"].includes(APP_ENV) ? "red" : "unset",
            }}
          >
            {APP_ENV.toUpperCase()}
          </span>
        </span>

        <Avatar size="small" src={picture} alt="avatar" />
        <span className={styles.name}>{name}</span>
      </span>
    </Dropdown>
  );
}
