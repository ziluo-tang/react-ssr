import React from "react";
import { Avatar } from "antd";

const User = () => {
  return <div>User</div>;
};

User.getServerSideProps = async () => {
  console.log("User getServerSideProps");
  return {
    props: {},
  };
};

export default User;
