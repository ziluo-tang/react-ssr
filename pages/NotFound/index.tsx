import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return (
    <Result title="🤔走丢了……" status={404}>
      <div style={{ textAlign: "center" }}>
        <Button type="link" onClick={() => navigate("/")} size="large" name="goback">
          go back
        </Button>
      </div>
    </Result>
  );
};
