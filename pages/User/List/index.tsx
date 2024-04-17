import React from "react";
import { Card } from "antd";
import css from "./index.less";
const UserList = ({ list }) => {
  return (
    <div className={css.list}>
      {(list ?? []).map((userInfo, index) => {
        const { name, email, git, avatar } = userInfo;
        return (
          <Card
            className={css.card}
            key={index}
            cover={<img src={avatar} width={"100%"} />}
            hoverable
          >
            <Card.Meta title={name} description={email} />
            <Card.Meta description={git} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserList;
