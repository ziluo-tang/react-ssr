import React from "react";
import { Card, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { insertUser } from "../../store/user";
import css from "./index.less";
import useStyles from 'isomorphic-style-loader/useStyles'

const User = () => {
  useStyles(css);
  const { list } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      insertUser({
        name: "xxx",
        email: "xxxx",
        git: "xxxx",
        avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      })
    );
  };
  return (
    <div className={css.user}>
      <Space
        align="end"
        style={{ width: "100%", marginBottom: 20 }}
        direction="horizontal"
      >
        <Button type="primary" onClick={onClick} name="add">
          新增用户
        </Button>
      </Space>

      <div className={css.list}>
        {list.map((userInfo, index) => {
          const { name, email, git, avatar } = userInfo;
          return (
            <Card
              className={css.card}
              key={index}
              cover={<img src={avatar} />}
              hoverable
            >
              <Card.Meta title={name} description={email} />
              <Card.Meta description={git} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

User.getServerSideProps = async (store) => {
  console.log("User getServerSideProps");
  store.dispatch(
    insertUser({
      name: "xxx",
      email: "xxxx",
      git: "xxxx",
      avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    })
  );
  return {
    props: {},
  };
};

export default User;
