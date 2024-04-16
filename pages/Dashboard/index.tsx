import React, { Suspense, lazy, useEffect } from "react";
import { getDashboardData, selectDashboard } from "../../store/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const Panel = lazy(() => import("./Panel"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectDashboard);
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
      <Suspense fallback={<Spin spinning={loading} />}>
        <Panel list={data} />
      </Suspense>
    </div>
  );
};

Dashboard.getServerSideProps = async () => {
  console.log("Dashboard getServerSideProps");
  return {
    props: {},
  };
};

export default Dashboard;
