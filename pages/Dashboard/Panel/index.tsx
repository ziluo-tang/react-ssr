import React from "react";
import { Descriptions } from "antd";
import css from "./index.less";

export default ({ list }) => {
  const items = (list ?? []).map((item) => ({
    key: item.label,
    label: item.label,
    children: item.children,
  }));
  return (
    <div className={css.panel}>
      <Descriptions title="Panel" items={items}></Descriptions>
    </div>
  );
};
