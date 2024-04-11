import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../pages/components/Layout";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";

type Component = {
  (...args: any[]): React.JSX.Element;
  getServerSideProps?: () => Promise<any>;
};

export type RouteProps = {
  path: string;
  component: Component;
  children?: RouteProps[];
};

export const routerConfig: RouteProps[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/*",
    component: Layout,
    children: [
      {
        path: "",
        component: Dashboard,
      },
      {
        path: "user",
        component: User,
      },
    ],
  },
];

export const menu = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "User",
    path: "/user",
  },
];

const renderRoute = (routes = routerConfig) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} Component={route.component} path={route.path}>
          {renderRoute(route.children)}
        </Route>
      );
    }
    return (
      <Route key={route.path} Component={route.component} path={route.path} />
    );
  });
};

export default () => <Routes>{renderRoute()}</Routes>;
