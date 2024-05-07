import React, { useEffect } from "react";
import { Table } from "antd";
import Request from "../../../store/request";

const FileList = () => {
  useEffect(() => {
    Request.get("/cms/getAsset", { params: { path: "images" } }).then((res) => {
      console.log(res);
    });
  }, []);
  return <div></div>;
};

export default FileList;
