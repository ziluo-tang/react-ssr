import React, { Suspense, lazy } from "react";
import { Spin, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { insertUser, selectAllUser } from "../../store/user";
import css from "./index.less";

const UserList = lazy(() => import("./List"));

const User = () => {
  const list = useSelector(selectAllUser);
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

      <Suspense fallback={<Spin spinning={true} />}>
        <UserList list={list} />
      </Suspense>
    </div>
  );
};

// User.getServerSideProps = async (store) => {
//   console.log("User getServerSideProps");
//   store.dispatch(
//     insertUser({
//       name: "xxx",
//       email: "xxxx",
//       git: "xxxx",
//       avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
//     })
//   );
//   return {
//     props: {},
//   };
// };

export default User;
