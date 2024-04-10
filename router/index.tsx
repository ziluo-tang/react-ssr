import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";

export const routeConfig = [
  {
    title: "首页",
    path: "/",
    component: Home,
  },
  {
    title: "用户",
    path: "/user",
    component: User,
  },
];

export default () => {
  return routeConfig.map((route, index) => (
    <Route key={index} path={route.path} Component={route.component} />
  ));
};
