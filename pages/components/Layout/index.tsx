import React from "react";
import { Layout } from "antd";
import Menu from "../Menu";

const { Header, Content, Footer, Sider } = Layout;

export default function ({ children }: { children?: React.ReactNode }) {
  return (
    <Layout>
      <Sider>
        <Menu />
      </Sider>
      <Layout>
        <Header>React SSR</Header>
        <Content>{children}</Content>
        <Footer>
          Copyright © 2023 tangxiaoxin. All Rights Reserved. tangxiaoxin
          版权所有
        </Footer>
      </Layout>
    </Layout>
  );
}
