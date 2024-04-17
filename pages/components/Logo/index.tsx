import React from "react";
import { Image } from "antd";
import src from "./logo.png";

export default ({ className }: Partial<{ className: string }>) => {
  return <Image alt="icon" src={src} preview={false} className={className} />;
};
