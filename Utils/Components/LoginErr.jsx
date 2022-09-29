import { Button } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const LoginErr = () => {
  const [loadingFlag, setLoadingFlag] = useState(false);
  return (
    <div className="mt-28">
      <Link href={"/Login"}>
        <div className="text-center">
          <p> Kindly Login To View This Page</p>
          <hr />{" "}
          <Button
            className="my-1"
            loading={loadingFlag}
            onClick={() => setLoadingFlag((prev) => !prev)}
          >
            Click Me To Login!{" "}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default LoginErr;
