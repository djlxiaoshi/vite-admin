import React from "react";
import { withRouter } from "react-router";
import { Breadcrumb } from "antd";
import { urlToList, urlToJson } from "@/utils";
import { Routes } from "@/router";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

/**
 * @description: 获取路径和路径对应title的一个映射
 * @param {type}
 * @return:
 */
const getPathTitleMap = (routes: RouteItem[]) => {
  const titlePathMap: { [any: string]: string } = {};
  const loop = (routes: RouteItem[]) => {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      titlePathMap[route.path] = route.title;
      if (route.subMenu && route.subMenu.length) {
        loop(route.subMenu);
      }
    }
  };

  loop(routes);
  return titlePathMap;
};

const pathTitleMap = getPathTitleMap(Routes);

export const BreadcrumbView = withRouter((props) => {
  const {
    location: { pathname },
  } = props;

  const pathList = urlToList(pathname);
  const urlParams = urlToJson();

  return (
    <div className={styles["breadcrumb-wrap"]}>
      <HomeOutlined style={{ marginRight: 5 }} />

      <Breadcrumb className={styles["ant-breadcrumb"]}>
        {/* 如果Breadcrumb为空 */}
        {pathList.length === 0 && (
          <Breadcrumb.Item>
            <span>Dashboard</span>
          </Breadcrumb.Item>
        )}
        {pathList.map((path) => {
          return (
            <Breadcrumb.Item key={path}>
              {/* <Icon type="home" style={{marginRight: 5}} /> */}
              <span>{pathTitleMap[path]}</span>
            </Breadcrumb.Item>
          );
        })}
        {/* 通过URL设置动态的Breadcrumb */}
        {urlParams._customBreadcrumb && (
          <Breadcrumb.Item>
            {/* <Icon type="home" style={{marginRight: 5}} /> */}
            <span>{urlParams._customBreadcrumb}</span>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
});
