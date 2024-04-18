import React from "react";
import { Layout, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import Menu from "../Menu";
import Icon from "../Logo";
import css from "./index.less";

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    Modal.confirm({
      title: "确认退出吗？",
      okText: "确认",
      cancelText: "再想想",
      onOk() {
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };
  return (
    <Layout className={css.layout}>
      <Sider className={css.sider}>
        <Icon className={css.logo} />
        <Menu />
      </Sider>
      <Layout className={css.main}>
        <Header className={css.header}>
          <h3>React SSR</h3>
          <Button
            type="link"
            className={css.logout}
            onClick={onLogout}
            icon={<LogoutOutlined />}
            name="logout"
          >
            退出
          </Button>
        </Header>
        <Content className={css.content}>
          <div className={css.container}>{children}</div>
        </Content>
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
