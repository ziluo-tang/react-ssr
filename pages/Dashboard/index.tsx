import React from "react";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

Dashboard.getServerSideProps = async () => {
  console.log("Dashboard getServerSideProps");
  return {
    props: {},
  };
};

export default Dashboard;
