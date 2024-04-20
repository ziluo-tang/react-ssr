import React from "react";
import Upload from "./Upload";
import css from "./index.less";

const CMS = () => {
  return (
    <div className={css.cms}>
      <div className={css.upload}>
        <Upload directory={true} action="/api/cms/upload" />
        <Upload multiple={true} action="/api/cms/upload" />
      </div>
    </div>
  );
};

export default CMS;
