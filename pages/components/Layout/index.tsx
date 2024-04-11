import React from "react";
import { Layout, Button } from "antd";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";
import css from "./index.less";

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
  };
  return (
    <Layout className={css.layout}>
      <Sider className={css.sider} theme="light">
        <Menu />
      </Sider>
      <Layout className={css.main}>
        <Header className={css.header}>
          <h3>React SSR</h3>
          <Button type="link" onClick={onLogout}>
            退出
          </Button>
        </Header>
        <Content className={css.content}>{children}</Content>
        <Footer className={css.footer}>
          Copyright © 2023 tangxiaoxin. All Rights Reserved. tangxiaoxin
          版权所有
        </Footer>
      </Layout>
    </Layout>
  );
};

BasicLayout.getServerSideProps = async () => {
  console.log("Layout getServerSideProps");
  return {
    props: {},
  };
};

export default BasicLayout;
