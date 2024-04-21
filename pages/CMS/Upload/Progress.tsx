import React from "react";
import { Progress } from "antd";

export type ProgressBarProps = {
  title: string;
  percent: number;
};

const ProgressBar = ({ title, percent }: ProgressBarProps) => {
  return (
    <div>
      <span style={{ color: "#888" }}>{title}</span>
      <Progress size={"small"} percent={percent} />
    </div>
  );
};

export default ProgressBar;
