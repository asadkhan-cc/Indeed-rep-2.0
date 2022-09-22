import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import CreateCompaneyProfile from "../Components/CreateCompaneyProfile";
import SignIn from "../Components/SignIn";

const SignUpEmployerPage = () => {
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const steps = [
    {
      title: "First",
      content: <SignIn></SignIn>,
    },
    {
      title: "Second",
      content: <CreateCompaneyProfile />,
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

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
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button className="mx-2" onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default SignUpEmployerPage;
