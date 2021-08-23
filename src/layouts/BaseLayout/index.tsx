import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Header } from "../Header";
import { BaseMenu } from "../Menu";
import { BaseRouters } from "@/router";
import { Menus } from "@/router";
import styles from "./index.module.scss";
import { withRouter, RouteComponentProps } from "react-router";
import logo from "@/assets/images/vn-logo.png";

// import { urlToList } from "@/utils";
// import { useStoreActions, useStoreState } from "@/store/hooks";
const { Sider, Content } = Layout;

type BaseLayoutProps = RouteComponentProps;

function PageLayout(props: BaseLayoutProps) {
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([] as string[]);
  // const getUserMsg = useStoreActions((actions) => actions.getUserMsg);
  // const logout = useStoreActions((actions) => actions.logout);
  // const user = useStoreState((state) => state.user);
  const setDefaultSelectedKey = () => {
    const {
      location: { pathname },
    } = props;

    return [pathname];
  };

  /**
   * @description: 根据导航栏路径自动打开相应的子菜单
   * @param {type}
   * @return:
   */
  const setDefaultOpenMenu = () => {
    const {
      location: { pathname },
    } = props;
    // const pathList = urlToList(pathname);
    // setDefaultOpenKeys(pathList.slice(0, -1));
  };

  useEffect(() => {
    // getUserMsg();
    setDefaultOpenMenu();
  }, []);

  const onMenuClick = ({ key }: any) => {
    if (key === "logout") {
      // todo 登出
      // logout();
    }
  };

  return (
    <Layout>
      <Sider
        collapsible={false}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        width="280"
      >
        <div className={styles.logo}>
          <div className={styles.text}>
            <img src={logo} alt="ss" style={{ width: 50, margin: "10px 0" }} />
          </div>
        </div>
        <BaseMenu
          menu={Menus}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={setDefaultSelectedKey()}
          openKeys={defaultOpenKeys}
          onOpenChange={(openKeys: (string | number)[]) => {
            setDefaultOpenKeys(openKeys as string[]);
          }}
        />
      </Sider>
      <Layout>
        <Header user={{}} onMenuClick={onMenuClick} />
        <Content className={styles.content}>
          <BaseRouters />
        </Content>
      </Layout>
    </Layout>
  );
}

export const MicroLayout = withRouter(() => {
  return (
    <Layout>
      <Content className={styles.content}>
        <BaseRouters />
      </Content>
    </Layout>
  );
});

export const NormalLayout = withRouter(PageLayout);
