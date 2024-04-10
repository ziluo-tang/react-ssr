import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import css from "./index.less";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: FormData) => {
    navigate("/");
  };
  return (
    <div className={css.login}>
      <Form onFinish={onFinish}>
        <Form.Item label="用户名" name="user">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
