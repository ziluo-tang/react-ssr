import React from "react";
import Upload from "./Upload";
import css from "./index.less";

const CMS = () => {
  return (
    <div className={css.cms}>
      <div className={css.upload}>
        <Upload directory={true} />
        <Upload multiple={true} />
      </div>
    </div>
  );
};

export default CMS;
