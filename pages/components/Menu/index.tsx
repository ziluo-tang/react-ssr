import React from "react";
import { Menu, MenuProps } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { menu } from "../../../router";

type MenuItem = Required<MenuProps>["items"][number];
function getItem({
  title,
  key,
  path,
  icon,
}: Partial<{
  title: React.ReactNode;
  key: React.Key;
  path: string;
  icon: React.ReactNode;
}>): MenuItem {
  return {
    key: path,
    label: <NavLink to={path}>{title}</NavLink>,
    icon,
    title,
  } as MenuItem;
}

export default function () {
  const { pathname } = useLocation();
  const items = menu.map((route) => getItem(route));
  return <Menu mode="vertical" theme="dark" selectedKeys={[pathname]} items={items}></Menu>;
}
