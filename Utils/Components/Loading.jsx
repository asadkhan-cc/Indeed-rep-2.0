import { Button } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="text-center">
      <Button loading={true}>Loading</Button>
    </div>
  );
};

export default Loading;
