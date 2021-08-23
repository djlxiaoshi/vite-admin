import React, { Suspense, ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "@/pages/404";
import { PageLoading } from "@/components/PageLoading";
import IDConfig from "./id.config";
import { APP_REGION } from "../config/index";

/**
 * @description: 返回路由列表，需要有权限才注册这个路由配置
 * @param {type}
 * @return: RouteItem[]
 */
let Config: RouteItem[];
switch (APP_REGION) {
  case "id":
    Config = IDConfig;
    break;
  default:
    Config = IDConfig;
    break;
}
const getRoutes = (menus: RouteItem[]) => {
  const routes: RouteItem[] = [];
  const loop = (menus: RouteItem[]) => {
    menus.forEach((menu) => {
      if (menu.permission) {
        const _route = { ...menu };
        delete _route.subMenu;
        routes.push(_route);
        if (menu.subMenu) {
          loop(menu.subMenu);
        }
      }
    });
  };

  loop(menus);
  return routes;
};

export const Routes = getRoutes(Config);

/**
 * @description: 返回左侧菜单，noMenu:true且permission为true
 * @param {type}
 * @return: RouteItem[]
 */
const getMenus = (config: RouteItem[]) => {
  const menus: RouteItem[] = [];
  const loop = (routeConfig: RouteItem[], menus: RouteItem[]) => {
    routeConfig.forEach((route) => {
      if (!route.noMenu && route.permission) {
        if (route.subMenu) {
          const _menus = {
            ...route,
            subMenu: [],
          };
          menus.push(_menus);
          loop(route.subMenu, _menus.subMenu);
        } else {
          menus.push(route);
        }
      }
    });
  };
  loop(config, menus);
  return menus;
};

export const Menus = getMenus(Config);

export const BaseRouters = (): ReactElement => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      {Routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);
