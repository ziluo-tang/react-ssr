import React, { useMemo, useState } from "react";
import Progress, { type ProgressBarProps } from "./Progress";
import axios from "axios";
import css from "./index.less";
import { Form } from "react-router-dom";
import { message } from "antd";

type UploadProps = Partial<{
  title: string;
  directory: boolean;
  accept: string;
  multiple: boolean;
  action: string;
  className: string;
  children: React.ReactNode;
  onChange: (files: File[]) => void;
}>;

const Upload = ({
  title,
  directory = false,
  accept,
  multiple,
  children,
  action,
  className,
  onChange,
}: UploadProps) => {
  const [progressList, setProgressList] = useState<Array<ProgressBarProps>>([]);
  const _onChange = (e) => {
    const files = e.target.files;
    setProgressList([]);
    onChange && onChange([...files]);
    uploadFiles(action, [...files], (data) => {
      const { fileName, percent } = data;
      setProgressList((list) => {
        const newList = [...list];
        const index = newList.findIndex((item) => item.title === fileName);
        if (index !== -1) {
          newList[index] = {
            title: fileName,
            percent,
          };
        } else {
          newList.push({
            title: fileName,
            percent,
          });
        }
        return newList;
      });
    })
      .then(() => {
        message.success("上传成功");
      })
      .catch((err) => {
        console.log(err);
        message.error("上传失败");
      });
  };
  const _title = useMemo(() => {
    if (title) return title;
    if (directory) return "点击选择文件夹或者拖拽文件夹上传";
    return "点击选择文件或者拖拽文件上传";
  }, [directory, title]);

  const webkitdirectory = useMemo(() => {
    return directory ? { webkitdirectory: "true" } : {};
  }, [directory]);

  return (
    <div className={css.wrap}>
      <div className={`${css.upload} ${className ?? ""}`}>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className={css.input}
          {...webkitdirectory}
          onChange={_onChange}
          title=""
        />
        <span className={css.placeholder}>{_title}</span>
        {children}
      </div>
      <div className={css.progress}>
        {progressList.map(({ title, percent }, index) => (
          <Progress key={index} title={title} percent={percent} />
        ))}
      </div>
    </div>
  );
};

const uploadFiles = (
  action: string,
  files: File[],
  onProgress: ({
    fileName,
    percent,
  }: {
    fileName: string;
    percent: number;
  }) => void
) => {
  return Promise.all(
    files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return axios.post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
        onUploadProgress(progressEvent) {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded / total) * 100);
          onProgress({
            fileName: file.name,
            percent,
          });
        },
      });
    })
  );
};

export default Upload;
