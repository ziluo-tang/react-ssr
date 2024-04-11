import React, { cloneElement, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import Layout from "../pages/components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import NotFound from "../pages/NotFound";

// const Login = lazy(() => import("../pages/Login"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const User = lazy(() => import("../pages/User"));

type Component = {
  (...args: any[]): React.JSX.Element;
  getServerSideProps?: () => Promise<any>;
};

export type IRoute = {
  path?: string;
  element?: React.JSX.Element;
  component?: Component;
  children?: IRoute[];
};

export const routerConfig: IRoute[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardOutlined />,
  },
  {
    title: "User",
    path: "/user",
    icon: <UserOutlined />,
  },
];

const renderRoutes = (routes = routerConfig) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const key = route.path ?? index;
        if (route.children) {
          return (
            <Route
              key={key}
              element={
                route.path
                  ? route.element
                  : cloneElement(route.element, {
                      children: renderRoutes(route.children),
                    })
              }
              path={route.path ?? "/*"}
            />
          );
        }
        return <Route key={key} element={route.element} path={route.path} />;
      })}
    </Routes>
  );
};

export default renderRoutes;
