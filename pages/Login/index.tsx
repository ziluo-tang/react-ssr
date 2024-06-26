import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Logo";
import Request from "../../store/request";
import css from "./index.less";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: FormData) => {
    Request.post<{ user: string; password: string }, { token: string }>(
      "/login",
      values
    ).then((res) => {
      localStorage.setItem("token", res.token);
      navigate("/");
    });
  };

  return (
    <div className={css.login}>
      <div className={css.form}>
        <Icon className={css.logo} />
        <Form onFinish={onFinish} labelCol={{ span: 4 }}>
          <Form.Item
            label="用户名"
            name="user"
            required
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            required
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="submit" type="primary" name="login">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Login.getServerSideProps = async () => {
  console.log("Login getServerSideProps");
  return {
    props: {},
  };
};

export default Login;
