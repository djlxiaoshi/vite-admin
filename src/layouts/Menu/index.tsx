import React, { createElement } from "react";
import { Menu as AntMenu } from "antd";
import { Link } from "react-router-dom";
import { MenuProps as AntMenuProps } from "antd/lib/menu";

type MenuProps = {
  menu: RouteItem[];
} & AntMenuProps;

const renderMenuItem = (item: RouteItem) => (
  <AntMenu.Item key={item.path}>
    <Link to={item.path}>
      {item.icon && createElement(item.icon)}
      <span className="nav-text">{item.title}</span>
    </Link>
  </AntMenu.Item>
);

const renderMenu = (menus: RouteItem[]) => {
  return menus.map((menu) => {
    if (menu.subMenu) {
      return (
        <AntMenu.SubMenu
          key={menu.path}
          title={
            <>
              {menu.icon && createElement(menu.icon)}
              <span className="nav-text">{menu.title}</span>
            </>
          }
        >
          {renderMenu(menu.subMenu)}
        </AntMenu.SubMenu>
      );
    }
    return renderMenuItem(menu);
  });
};

export const BaseMenu = ({ menu, ...props }: MenuProps) => {
  const { defaultOpenKeys } = props;
  return (
    <AntMenu {...props} defaultOpenKeys={defaultOpenKeys}>
      {renderMenu(menu)}
    </AntMenu>
  );
};
