import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import { CreateUserProfile } from "../../Components/User/CreateUserProfile";
import SignIn from "../../Components/SignIn";

const SignUpUserPage = () => {
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const next = (e) => {
    setCurrent(current + 1);
  };
  const steps = [
    {
      title: "First",
      content: <SignIn current={current} change_Next={next} />,
    },
    {
      title: "Second",
      content: <CreateUserProfile current={current} />,
    },
  ];

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <div className="flex flex-col">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="steps-content h-5/6">{steps[current].content}</div>
      <div className="steps-action">
        {/* {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )} */}
        {current > 0 && (
          <Button className="mx-2" onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default SignUpUserPage;
