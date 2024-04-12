import React from "react";
import { Image } from "antd";
import src from "./icon.png";

export default ({ className }: Partial<{ className: string }>) => {
  return <Image src={src} preview={false} className={className} />;
};
