import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import { auth } from "../../../FirebaseApp/firebase-config";
import CreateCompanyProfile from "../../Components/Company/CreateCompanyProfile";
import SignIn from "../../Components/SignIn";

const SignUpEmployerPage = () => {
  const [current, setCurrent] = useState(0);
  const [credentials, setCredentials] = useState(null);
  const getCredentials = (e) => {
    setCredentials(e);
  };

  const { Step } = Steps;
  const next = (e) => {
    setCurrent(current + 1);
  };
  const steps = [
    {
      title: "First",
      content: (
        <SignIn
          role="Company"
          setCredentials={getCredentials}
          current={current}
          change_Next={next}
        ></SignIn>
      ),
    },
    {
      title: "Second",
      content: (
        <CreateCompanyProfile
          email={credentials?.email}
          credentials={credentials}
        />
      ),
    },
  ];

  const prev = () => {
    setCurrent(current - 1);
  };
  console.log(
    credentials,
    "credentialscredentialscredentialscredentialscredentialscredentialscredentials"
  );
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
