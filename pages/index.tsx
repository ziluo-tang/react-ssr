import React from "react";
import renderRoute from "../router";
import { Watermark } from "antd";
import "./index.less";
const App = () => {
  return (
    <Watermark content={"tangxiaoxin"} zIndex={1}>
      {renderRoute()}
    </Watermark>
  );
};

export default App;
