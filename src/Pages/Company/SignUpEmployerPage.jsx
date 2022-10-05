import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import { auth } from "../../../FirebaseApp/firebase-config";
import CreateCompanyProfile from "../../Components/Company/CreateCompanyProfile";
import SignIn from "../../Components/SignIn";

const SignUpEmployerPage = () => {
  const [current, setCurrent] = useState(0);
  const [credentials, setCredentials] = useState(null);
  const [formConfirmation, setFormConfirmation] = useState(true);
  const getCredentials = (e) => {
    setCredentials(e);
  };
  const getProfileConfirmation = (e) => {
    setFormConfirmation((prev) => !prev);
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
          getProfileConfirmation={getProfileConfirmation}
          email={credentials.email}
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
