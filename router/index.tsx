import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../pages/components/Layout";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";

export const layoutPage = [
  {
    title: "Dashboard",
    path: "/",
    component: Dashboard,
  },
  {
    title: "User",
    path: "/user",
    component: User,
  },
];

export default () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              {layoutPage.map((route) => (
                <Route
                  key={route.path}
                  Component={route.component}
                  path={route.path}
                />
              ))}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};
