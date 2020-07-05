import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { Log } from "../../library/Log";
const ROUTE_PATH = "home";
const { SubMenu } = Menu;

function renderMenu(menu) {
  Log.print("menu");
  Log.print(menu);
  if (menu)
    return menu.map((menuItem) => (
      <SubMenu
        key={menuItem.key}
        title={
          <span>
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </span>
        }
      >
        {renderMenuItems(menuItem.menuItems)}
      </SubMenu>
    ));
}

function renderMenuItems(menuItems) {
  return menuItems.map((menuItem) => (
    <Menu.Item key={menuItem.key}>
      <Link
        href={`/${ROUTE_PATH}/${menuItem.category}/${menuItem.subcategory}`}
      >
        <a>
          <menuItem.icon />
          <span>{menuItem.title}</span>
        </a>
      </Link>
    </Menu.Item>
  ));
}

export default function LeftMenu(props) {
  const { location, locationString, homeLeftBarConfig } = props;
  const [menus, setMenus] = useState();

  // useEffect(() => {
  //   homeLeftBarConfig.getAll().then(res => {
  //     setMenus(res);
  //     Log.print(res);
  //   });
  // });

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[locationString]}
      mode="inline"
      defaultOpenKeys={[location[2]]}
    >
      {renderMenuItems(homeLeftBarConfig.getHome())}
      {renderMenu( homeLeftBarConfig.getAll())}
    </Menu>
  );
}
