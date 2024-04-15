import React, { useEffect } from "react";
import { getDashboardData } from "../../store/dashboard";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.getServerSideProps = async () => {
  console.log("Dashboard getServerSideProps");
  return {
    props: {},
  };
};

export default Dashboard;
