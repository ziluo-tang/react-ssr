import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, Button, Breadcrumb, message } from "antd";
import Request from "../../../store/request";
import axios from "axios";
import styles from "./index.less";

const FileList = () => {
  const [paths, setPath] = useState([{ title: "/" }]);
  const [dataSource, setData] = useState([]);

  useEffect(() => {
    getAsset();
  }, []);

  const getAsset = useCallback((path?: string) => {
    return Request.get<any, []>("/cms/getAsset", {
      params: { path },
    }).then((data) => {
      setData(data);
    });
  }, []);

  const onDownload = useCallback(
    (path?: string) => {
      path = paths
        .map((item) => item.title)
        .concat([path])
        .join("/");
      axios
        .get("/api/cms/download", {
          params: { file: path },
          responseType: "blob",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const { data, headers } = res;
          const fileName = headers["content-disposition"].replace(
            /\w+;filename=(.*)/,
            "$1"
          );
          const blob = new Blob([data], { type: headers["content-type"] });
          const a = document.createElement("a");
          const url = URL.createObjectURL(blob);
          a.href = url;
          a.download = decodeURI(fileName);
          a.click();
          URL.revokeObjectURL(url);
        });
    },
    [paths]
  );

  const onDelete = useCallback(
    (path?: string) => {
      const dir = paths.map((item) => item.title);
      path = dir.concat([path]).join("/");
      Request.delete("/cms/delete", { params: { path } }).then((res) => {
        message.success("删除成功");
        getAsset(dir.join("/"));
      });
    },
    [paths]
  );

  const columns = [
    {
      title: "文件",
      dataIndex: "name",
      key: "name",
      render(value: string, row) {
        if (row.type === "dir") {
          return (
            <a
              onClick={() => {
                const path = paths
                  .map((route) => route.title)
                  .concat([value])
                  .join("/");
                getAsset(path).then(() => {
                  setPath((pre) => [...pre, { title: value }]);
                });
              }}
            >
              {value}
            </a>
          );
        }
        return value;
      },
    },
    {
      title: "文件大小",
      dataIndex: "size",
      key: "size",
      width: 200,
      align: "center",
      render(value: number, row) {
        if (row.type === "dir") return "-";
        const size = value / 1024;
        if (size < 1) {
          return `${value}B`;
        } else if (size < 1024) {
          return `${size.toFixed(2)}KB`;
        } else {
          return `${(size / 1024).toFixed(2)}MB`;
        }
      },
    },
    {
      title: "更新时间",
      dataIndex: "modifiedTime",
      key: "modifiedTime",
      width: 200,
      align: "center",
      render(value: number) {
        const date = new Date(value);
        return date.toLocaleString();
      },
    },
    {
      title: "操作",
      width: 120,
      key: "action",
      align: "center",
      render(_, row) {
        return (
          <Space>
            <Button type="link" onClick={() => onDownload(row.name)}>
              下载
            </Button>
            <Button type="link" onClick={() => onDelete(row.name)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumb
        items={paths}
        separator={">"}
        itemRender={(route, params, routes) => {
          const index = routes.indexOf(route);
          const isLast = index === routes.length - 1;
          if (isLast) {
            return <span>{route.title}</span>;
          }
          return (
            <a
              onClick={() => {
                const path = routes
                  .slice(0, index + 1)
                  .map((route) => route.title)
                  .join("/");
                getAsset(path).then(() => {
                  setPath((pre) => [...pre.slice(0, index + 1)]);
                });
              }}
            >
              {route.title}
            </a>
          );
        }}
        className={styles.breadcrumb}
      />
      <Table
        rowKey={(row) => row.name}
        dataSource={dataSource}
        //@ts-ignore
        columns={columns}
      />
    </div>
  );
};

export default FileList;
